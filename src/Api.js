import axios from 'axios';

const API_URL = process.env.VUE_APP_API;

class Api {
  static async fetch(method = 'GET', url = '/', payload = {}) { // eslint-disable-line no-unused-vars
    let response;
    try {
      switch (method) {
        case 'POST':
          response = await axios.post(API_URL + url, payload);
          break;
        default:
          response = await axios.get(API_URL + url);
          break;
      }
    } catch (error) {
      ({ response } = error);
      console.log(`Error fetching ${url} - ${error}`);
    }

    const code = response.status;
    const { isSuccessful, data } = response.data;

    return {
      code, isSuccessful, data,
    };
  }
}

export default Api;
