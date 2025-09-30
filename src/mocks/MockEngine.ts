import { UtenlanskMock } from './utenlendsk/utenlandsk-mock'
import { NasjonalMock } from './nasjonal/nasjonal-mock'

export class MockEngine {
    public utenlandsk: UtenlanskMock = new UtenlanskMock()
    public nasjonal: NasjonalMock = new NasjonalMock()
}
