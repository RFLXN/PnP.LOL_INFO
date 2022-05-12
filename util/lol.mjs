import lolApi from "../resources/lol-api.json" assert { type: "json" };
import lolApiKey from "../resources/lol-api-key.json" assert { type: "json" };

/**
 * League of Legends data store class. load data from /resources/lol-api.json.
 */
class LolApiData {
  /**
   * get array of regional host keys
   * @returns {string[]}
   */
  static getRegionalHostKeys() {
    return Object.keys(lolApi.host.regional);
  }

  /**
   * get array of platform host keys
   * @returns {string[]}
   */
  static getPlatformHostKeys() {
    return Object.keys(lolApi.host.platform);
  }

  /**
   * get regional host url by host key
   * @param {string} region - regional host key
   * @returns {string} regional host url
   * @throws {InvalidHostKeyError} throws when host key is invalid
   */
  static getRegionalHost(region) {
    if (!this.getRegionalHostKeys().includes(region)) {
      throw new InvalidHostKeyError(`${region} is invalid regional host key`);
    }
    return lolApi.host.regional[region];
  }

  /**
   * get platform host url by host key
   * @param {string} platform - platform host key
   * @returns {string} platform host url
   * @throws {InvalidHostKeyError} throws when platform key is invalid
   */
  static getPlatformHost(platform) {
    if (!this.getPlatformHostKeys().includes(platform)) {
      throw new InvalidHostKeyError(`${platform} is invalid platform host key`);
    }
    return lolApi.host.platform[platform];
  }

  /**
   * get endpoint objects
   * @return {Object} endpoint objects
   */
  static getApiEndpoints() {
    return lolApi.endpoint;
  }

  /**
   * get saved api key from /resources/lol-api.json
   * @returns {string} api key
   */
  static getApiKey() {
    return lolApiKey.apiKey;
  }

  /**
   * get URL of constants assets
   * @returns {string} - CDN URL (file packaged to ".tgz")
   */
  static getConstantAssets() {
    return lolApi.constantAssets;
  }
}

/**
 * League of Legends API URL builder class
 */
class LolApiUrlBuilder {
  #host;
  #endpoint;
  #params = new Map();
  #qs = new Map();

  /**
   * set host
   * @param {string} host - key of host
   * @throws {InvalidHostKeyError} throws when host key is invalid
   */
  setHost(host) {
    if (LolApiData.getPlatformHostKeys().includes(host)) {
      this.#host = LolApiData.getPlatformHost(host);
    } else if (LolApiData.getRegionalHostKeys().includes(host)) {
      this.#host = LolApiData.getRegionalHost(host);
    } else {
      throw new InvalidHostKeyError(`${host} is invalid host key`);
    }
    return this;
  }

  /**
   * set endpoint object
   * @param {Object} endpoint - endpoint object
   */
  setEndpoint(endpoint) {
    this.#endpoint = endpoint;
    return this;
  }

  /**
   * set path parameter
   * @param {string} key - key of path parameter
   * @param {string} value - value of path parameter
   */
  setParam(key, value) {
    this.#params.set(key, value);
    return this;
  }

  /**
   * set query string
   * @param {string} key - key of query string
   * @param {string} value - value of query string
   */
  setQs(key, value) {
    this.#qs.set(key, value);
    return this;
  }

  /**
   * build url to string.
   * @returns {string} built url
   * @throws {EmptyAttributeError} throws when API attributes are empty
   */
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

    return "https://" + url;
  }

  /**
   * alias of build(). build url to string.
   * @returns {string} built url
   * @throws {EmptyAttributeError} throws when API attributes are empty
   */
  toString() {
    return this.build();
  }
}

/**
 * class for convert host key
 */
class LolApiHostResolver {
  /**
   * get regional host key from platform key
   * @param {string} platform - platform host key
   * @returns {string} regional host key
   * @throws {InvalidHostKeyError} throws when argument is not a platform key
   */
  static getRegionalHostFromPlatform(platform) {
    switch (platform.toLowerCase()) {
      case "eun1":
      case "euw1":
      case "tr1":
      case "ru":
        return "europe";
      case "jp1":
      case "kr":
        return "asia";
      case "br1":
      case "la1":
      case "la2":
      case "na1":
      case "oc1":
        return "americas";
    }
    throw new InvalidHostKeyError(`${platform} is not a platform host key`);
  }
}

/**
 * when host key is invalid, throw this error class
 */
class InvalidHostKeyError extends Error {
  constructor(props) {
    super(props);
  }
}

/**
 * when try to build API URL and if API attributes are empty, throw this error class
 */
class EmptyAttributeError extends Error {
  constructor(props) {
    super(props);
  }
}

export { LolApiData, LolApiUrlBuilder, LolApiHostResolver, InvalidHostKeyError, EmptyAttributeError };
