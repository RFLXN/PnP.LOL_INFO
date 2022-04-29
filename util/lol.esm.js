import { resolve } from "path";
import { loadJson } from "./json.esm";

const API_RESOURCE_FILE_PATH = resolve(__dirname, "../resources/lol-api.json");

let lolApi;

(async () => {
  lolApi = await loadJson(API_RESOURCE_FILE_PATH);
})();

class LolApi {
  static getRegionalHostKeys() {
    return Object.keys(lolApi.host.regional);
  }

  static getPlatformHostKeys() {
    return Object.keys(lolApi.host.platform);
  }

  static getRegionalHost(region) {
    if (!region in this.getRegionalHostKeys()) {
      throw new InvalidHostKeyError(`${region} is invalid regional host key`);
    }
    return lolApi.host.regional[region];
  }

  static getPlatformHost(platform) {
    if (!platform in this.getPlatformHostKeys()) {
      throw new InvalidHostKeyError(`${platform} is invalid platform host key`);
    }
    return lolApi.host.platform[platform];
  }

  static getApiEndpoints() {
    return lolApi.endpoint;
  }
}

class LolApiUrlBuilder {
  #host;
  #endpoint;
  #params = new Map();
  #qs = new Map();

  setHost(host) {
    if (host in LolApi.getPlatformHostKeys()) {
      this.#host = LolApi.getPlatformHost(host);
    } else if (host in LolApi.getRegionalHostKeys()) {
      this.#host = LolApi.getRegionalHost(host);
    } else {
      throw new InvalidHostKeyError(`${host} is invalid host key`);
    }
    return this;
  }

  setEndpoint(endpoint) {
    this.#endpoint = endpoint;
    return this;
  }

  setParam(key, value) {
    this.#params.set(key, value);
    return this;
  }

  setQs(key, value) {
    this.#qs.set(key, value);
    return this;
  }

  build() {
    if (!this.#host) throw new EmptyAttributeError("host is empty");
    if (!this.#endpoint) throw new EmptyAttributeError("endpoint is empty");

    let url = this.#host + this.#endpoint.path;

    if (typeof this.#endpoint.param !== "undefined" && this.#endpoint.param.length > 0) {
      this.#endpoint.param.map((key) => {
        const val = this.#params.get(key);
        if (val === undefined) {
          throw new EmptyAttributeError(`path parameter ${key} is empty`);
        }
        url = url.replace(key, val);
      });
    }

    if (typeof this.#endpoint.qs !== "undefined" && this.#endpoint.qs.length > 0) {
      this.#endpoint.qs.map((key) => {
        const val = this.#qs.get(key);
        if (typeof val !== "undefined") {
          if (!url.endsWith("?")) url = url + "?";
          url = url + `${key}=${val}&`;
        }
      });
    }

    if (url.endsWith("?")) url = url.slice(0, -1);
    if (url.endsWith("&")) url = url.slice(0, -1);

    return url;
  }
}

class InvalidHostKeyError extends Error {
  constructor(props) {
    super(props);
  }
}

class EmptyAttributeError extends Error {
  constructor(props) {
    super(props);
  }
}

export { LolApi, LolApiUrlBuilder, InvalidHostKeyError, EmptyAttributeError };
