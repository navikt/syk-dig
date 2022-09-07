import { IncomingHttpHeaders, RequestOptions } from 'http';
import { Readable, Stream } from 'stream';
import https from 'http';

import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuth';
import { getServerEnv, isLocalOrDemo } from '../../utils/env';
import { getOboAccessToken } from '../../auth/azure/azureTokens';
import logger from '../../utils/logger';

const env = getServerEnv();

const handler = withAuthenticatedApi(async (req, res, accessToken) => {
    logger.info('Proxying request to syk-dig GraphQL API');

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not supported' });
        return;
    }

    if (isLocalOrDemo) {
        // TODO return some data
        return;
    }

    const bearerToken = await getOboAccessToken(accessToken, env.SYK_DIG_BACKEND_SCOPE);
    // TODO remove:
    logger.info(`Debug pls remove: OBO token for ${env.SYK_DIG_BACKEND_SCOPE}: ${bearerToken}`);

    try {
        await proxyRequest(req, res, bearerToken);
    } catch (error: unknown) {
        logger.error(error);
        res.status(500).json({ message: 'Unable to proxy request' });
    }
});

async function proxyRequest(req: NextApiRequest, res: NextApiResponse, bearerToken: string): Promise<void> {
    const requestOptions: RequestOptions = {
        hostname: env.SYK_DIG_BACKEND_HOST,
        port: 80,
        path: '/graphql',
        method: 'POST',
        headers: {
            ...copyHeaders(req.headers),
            Authorization: `Bearer ${bearerToken}`,
        },
    };

    const stream = Readable.from(req);
    const bodyResponse = await stream2buffer(stream);
    const backendReq = https.request(requestOptions, (proxyRequestResponse) => {
        if (proxyRequestResponse.statusCode != null) {
            res.status(proxyRequestResponse.statusCode);
        }
        for (const headersKey in proxyRequestResponse.headers) {
            const header = proxyRequestResponse.headers[headersKey];
            if (header) {
                res.setHeader(headersKey, header);
            }
        }

        proxyRequestResponse.on('data', (data: unknown) => {
            res.write(data);
        });
        proxyRequestResponse.on('error', (err) => {
            logger.error(`Proxy error: ${err.message}, ${err.stack}`);
        });
        proxyRequestResponse.on('end', () => {
            res.end();
        });
    });

    backendReq.write(bodyResponse);
    backendReq.end();
}

const headersToSkip = ['host', 'cookie', 'authorization'];
function copyHeaders(reqHeaders: IncomingHttpHeaders): IncomingHttpHeaders {
    const headers: IncomingHttpHeaders = {};
    for (const headersKey in reqHeaders) {
        if (!headersToSkip.includes(headersKey.toLowerCase())) {
            headers[headersKey] = reqHeaders[headersKey];
        }
    }
    return headers;
}

async function stream2buffer(stream: Stream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const buffer = Array<Uint8Array>();
        stream.on('data', (chunk) => buffer.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(buffer)));
        stream.on('error', (err) => reject(`error converting stream - ${err}`));
    });
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export default withAuthenticatedApi(handler);
