const express = require("express");
const ejs = require("ejs");
const biolink = require(__dirname + "/biolink.js");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res) {
  const captions = biolink.getBio(function(captions){
    biolinkCaptions = captions;
    res.render("index", {captions: biolinkCaptions})
  });
});

app.listen(3001, function() {
  console.log("Server started on port 3000");
});
