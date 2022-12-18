const express = require("express");
const ejs = require("ejs");
const biolink = require(__dirname + "/biolink.js");
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 300 requests per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.get("/", function(req, res) {
  const captions = biolink.getBio(function(captions){
    biolinkCaptions = captions;
    res.render("index", {captions: biolinkCaptions})
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
