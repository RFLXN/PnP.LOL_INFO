import { promises as fs } from "fs";

const loadJson = async (path) => {
  const raw = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(raw.toString());
};

export { loadJson };
