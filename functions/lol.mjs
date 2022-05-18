import { LolApiData, LolApiUrlBuilder } from "../util/lol.mjs";
import axios from "axios";
import { dirname, resolve } from "path";
import * as fs from "fs";
import { promisify } from "util";
import { finished as sf } from "stream";
import { fileURLToPath } from "url";
import { unpackTarGz } from "../util/unpack.mjs";
import { loadJson } from "../util/json.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const finished = promisify(sf);

/**
 * class for execute business logic with LOL API
 */
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
   * @async
   * @param {string} puuid - summoner puuid
   * @param {string} host - key of host (host must be regional)
   * @param {{ startTime?: number, endTime?: number, queue?: number, type?: string, start?: number, count?: number }} qs - query strings
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
   * get match data by match id
   * @async
   * @param {string} matchId - match id
   * @param {string} host - key of host (host must be regional)
   * @returns {Promise<Object>} response of "{MATCH-V5}/matches/{matchId}"
   */
  static async getMatchData(matchId, host) {
    const endpoint = LolApiData.getApiEndpoints().match.matches;
    const url = new LolApiUrlBuilder()
      .setEndpoint(endpoint).setHost(host).setParam("{matchId}", matchId).build();

    const response = await this.#sendRequest(url, endpoint.method);
    return response.data;
  }

  /**
   * get match timeline by match id
   * @async
   * @param {string} matchId - match id
   * @param {string} host - key of host (host must be regional)
   * @returns {Promise<Object>} response of "{MATCH-V5}/matches/{matchId}/timeline}"
   */
  static async getMatchTimeline(matchId, host) {
    const endpoint = LolApiData.getApiEndpoints().match.timeline;
    const url = new LolApiUrlBuilder()
      .setEndpoint(endpoint).setHost(host).setParam("{matchId}", matchId).build();

    const response = await this.#sendRequest(url, endpoint.method);
    return response.data;
  }

  /**
   * get weekly champion rotations
   * @async
   * @param {string} host - key of host (host must be platform)
   * @returns {Promise<Object>} response of "{CHAMPION-V3}/champion-rotations"
   */
  static async getChampionRotations(host) {
    const endpoint = LolApiData.getApiEndpoints().champion.championRotations;
    const url = new LolApiUrlBuilder().setEndpoint(endpoint).setHost(host).build();

    const response = await this.#sendRequest(url, endpoint.method);
    return response.data;
  }

  /**
   * get champion mastery by summoner id
   * @async
   * @param {string} summonerId - summoner id
   * @param {string} host - key of host (host must be platform)
   * @returns {Promise<Object>} response of "{CHAMPION-MASTERY-V4}/champion-masteries/by-summoner/{encryptedSummonerId}"
   */
  static async getChampionMastery(summonerId, host) {
    const endpoint = LolApiData.getApiEndpoints().championMastery.bySummoner;
    const url = new LolApiUrlBuilder()
      .setEndpoint(endpoint).setHost(host).setParam("{encryptedSummonerId}", summonerId).build();

    const response = await this.#sendRequest(url, endpoint.method);
    return response.data;
  }

  /**
   * send HTTP requests with Riot API key header
   * @async
   * @param {string} url - API URL
   * @param {string} method - HTTP method
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async #sendRequest(url, method) {
    return await axios.request({
      url,
      method,
      headers: {
        "X-Riot-Token": LolApiData.getApiKey()
      }
    });
  }
}

/**
 * class for download and unpack LOL assets
 */
class LolAssetDownloader {
  static PACKAGE_FILE_PATH = resolve(__dirname, "../", LolApiData.getAssetInfo().downloadPath);
  static ASSETS_DIR_PATH = resolve(__dirname, "../", LolApiData.getAssetInfo().unpackPath);

  /**
   * download constant assets package file
   * @async
   */
  static async downloadPackage() {
    const writer = fs.createWriteStream(this.PACKAGE_FILE_PATH);
    const response = await axios.request({
      url: LolApiData.getAssetInfo().url,
      method: "GET",
      responseType: "stream"
    });
    response.data.pipe(writer);
    return finished(writer);
  }

  /**
   * unpack downloaded asset package file
   * @async
   */
  static async unpack() {
    await unpackTarGz(this.PACKAGE_FILE_PATH, this.ASSETS_DIR_PATH);
  }

}

/**
 * class for manage and get LOL assets
 */
class LolAssetDataManager {
  static ASSET_PATH = resolve(__dirname, "../", LolApiData.getAssetInfo().assetPath);
  #language;

  constructor(languageCode) {
    this.#language = languageCode;
  }

  /**
   * get partial data of all champions
   * @async
   * @returns {Promise<Object>}
   */
  async getChampions() {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "champion.json"));
  }

  /**
   * get full data of all champions
   * @async
   * @returns {Promise<Object>}
   */
  async getFullChampions() {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "championFull.json"));
  }

  /**
   * get full champion data by champion name
   * @async
   * @param {string} championName - champion name
   * @returns {Promise<Object>}
   */
  async getChampion(championName) {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "champion", `${championName}.json`));
  }

  /**
   * get items data
   * @async
   * @returns {Promise<Object>}
   */
  async getItems() {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "item.json"));
  }

  /**
   * get maps data
   * @async
   * @returns {Promise<Object>}
   */
  async getMaps() {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "map.json"));
  }

  /**
   * get runes data
   * @async
   * @returns {Promise<Object>}
   */
  async getRunes() {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "runesReforged.json"));
  }

  /**
   * get summoner spells data
   * @async
   * @returns {Promise<Object>}
   */
  async getSummonerSpells() {
    return await loadJson(resolve(LolAssetDataManager.ASSET_PATH, this.#language, "summoner.json"));
  }
}


export { LolApiExecutor, LolAssetDownloader, LolAssetDataManager };
