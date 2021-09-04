const express = require("express");
const { isMobilePhone } = require("validator");
const servePage = require("./util/servePage");
const morgan = require("morgan");

const app = express();

app.use(express.static("static"));
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  const domain = req.get("host").match(/\w+/);
  if (domain[0] !== "localhost") {
    const subdomain = domain[0];
    if (isMobilePhone(subdomain)) {
      res.redirect(`http://wa.me/+91${subdomain}`);
    } else {
      res.json({
        subdomain,
        error: isMobilePhone(subdomain),
      });
    }
  } else {
    servePage(res, next, "landing.html");
  }
});

app.use((err, req, res, next) => {
  console.log(err.message);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Connected to PORT ", PORT);
});
