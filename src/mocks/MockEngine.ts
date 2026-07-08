import { NasjonalMock } from './nasjonal/nasjonal-mock'
import { UtenlanskMock } from './utenlendsk/utenlandsk-mock'

export class MockEngine {
    public utenlandsk: UtenlanskMock = new UtenlanskMock()
    public nasjonal: NasjonalMock = new NasjonalMock()
}
