export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
