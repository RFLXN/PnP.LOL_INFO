import decompress from "decompress";
import decompressTarGz from "decompress-targz";

/**
 * unpack tar.gz file
 * @param {string | Buffer} input - file to unpack
 * @param {string} output - output directory
 */
const unpackTarGz = async (input, output) => {
  return decompress(input, output, {
    plugins: [
      decompressTarGz()
    ]
  });
};

export { unpackTarGz };
