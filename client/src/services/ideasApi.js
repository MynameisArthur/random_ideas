import axios from 'axios';
class IdeasApi {
  constructor() {
    this._apiUrl = 'http://localhost:5000/api/ideas';
  }
  getIdeas() {
    axios.get(this._apiUrl);
  }
}
export default new IdeasApi();
