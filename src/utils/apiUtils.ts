export function api(url: string): string {
    const base = process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : '';
    return `${base}${url}`;
}
