// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const isValidDate = (date) => date instanceof Date && !isNaN(date);

const hasMillisecondsFormat = (date) => date.split("-").length === 1;

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const incomingDate = req.params.date;
  let date;
  if(!incomingDate){
    date = new Date();
  } 
  else if(hasMillisecondsFormat(incomingDate)){
    date = new Date(parseInt(incomingDate));
  }
  else {
    date = new Date(incomingDate);
  }

  if(isValidDate(date)){
    const utc = date.toUTCString();
    const unix = Date.parse(utc);

    return res.json({ unix , utc });
  }
  return res.json({ error : "Invalid Date" });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
