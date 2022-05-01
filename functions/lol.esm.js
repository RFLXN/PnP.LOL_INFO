import { LolApiData, LolApiUrlBuilder } from "../util/lol.esm";
import axios from "axios";

class LolApiExecutor {
  /**
   * get user data by summoner name
   * @async
   * @param {string} summonerName - summoner name
   * @param {string} host - key of host (host must be platform)
   * @return {Promise<Object>} response of "{SUMMONER-V4}/summoners/by-name/{summonerName}"
   */
  static async getUserDataByName(summonerName, host) {
    const endpoint = LolApiData.getApiEndpoints().summoner.byName;
    const urlBuilder = new LolApiUrlBuilder();

    urlBuilder.setEndpoint(endpoint).setHost(host).setParam("{summonerName}", summonerName);

    const url = urlBuilder.build();

    const response = await this.#sendRequest(url, endpoint.method);

    return response.data;
  }

  /**
   * get user match ids by puuid
   * @param {string} puuid - summoner puuid
   * @param {string} host - key of host (host must be regional)
   * @param {{startTime?: number, endTime?: number, queue?: number, type?: string, start?: number, count?: number}} qs - query strings
   * @returns {Promise<Object>} response of "{MATCH-V5}/matches/by-puuid/{puuid}/ids"
   */
  static async getMatchIds(puuid, host, qs) {
    const endpoint = LolApiData.getApiEndpoints().match.byPuuid;
    const urlBuilder = new LolApiUrlBuilder();

    urlBuilder.setEndpoint(endpoint).setHost(host).setParam("{puuid}", puuid);
    const qsKeys = endpoint.qs;

    if (typeof qs !== "undefined") {
      qsKeys.map((key) => {
        let qsVal = qs[key];

        // if type of value is number, casting to string
        if (typeof qsVal === "number") {
          qsVal = `${qsVal}`;
        }

        // set query string value to url builder
        if (typeof qsVal !== "undefined" && qsVal !== "") {
          urlBuilder.setQs(key, qsVal);
        }
      });
    }

    const url = urlBuilder.build();

    const response = await this.#sendRequest(url, endpoint.method);

    return response.data;
  }

  /**
   * send HTTP requests with Riot API key header
   * @param {string} url - API URL
   * @param {string} method - HTTP method
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async #sendRequest(url, method) {
    return await axios.request({
      url,
      method,
      headers: {
        "X-Riot-Token": LolApiData.getApiKey(),
      },
    });
  }
}

export { LolApiExecutor };
