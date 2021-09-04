const { createReadStream } = require("fs");
const path = require("path");

async function servePage(res, next, file) {
  try {
    const readStream = createReadStream(
      path.join(__dirname, "../", "static", file)
    );
    readStream.pipe(res);
    readStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    next(error);
  }
}

async function serveFavicon(res, next, file) {
  try {
    const readStream = createReadStream(path.join(__dirname, "../", file));
    readStream.pipe(res);
    readStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { servePage, serveFavicon };
