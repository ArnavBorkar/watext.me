const express = require("express");
const { isMobilePhone } = require("validator");
const { servePage, serveFavicon } = require("./util/servePage");
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
      console.log(domain);
      servePage(res, next, "error.html");
    }
  } else {
    servePage(res, next, "landing.html");
  }
});

app.get("/favicon.ico", (req, res, next) => {
  serveFavicon(res, next, "favicon.ico");
});

// app.get('/<ROUTE_NAME>', (req, res) => {
//   servePage(res, next, "<FILE_NAME>.html");
// })

app.use((err, req, res, next) => {
  console.log(err.message);
  res.json({ error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Connected to PORT ", PORT);
});
