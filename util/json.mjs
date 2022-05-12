import { promises as fs } from "fs";

/**
 * load json file to js object
 * @param {string} path - file path
 * @returns {Promise<Object>}
 * @async
 */
const loadJson = async (path) => {
  const raw = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(raw.toString());
};

export { loadJson };
