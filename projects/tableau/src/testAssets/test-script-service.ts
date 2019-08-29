import { MOCK_RESPONSE } from './testing-resources';

export class MockScriptService {
  load() {
    return new Promise((resolve, reject) => MOCK_RESPONSE);
  }
}
