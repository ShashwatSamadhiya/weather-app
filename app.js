const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname+"/index.html")

});
app.post("/",function(req,res)
{

  const query = req.body.cityname;
  const apikey = "95d16b0c0a7a58f9c58549d48646dac9"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&q=" + query + "&appid=" + apikey;
  https.get(url, function(response) {
  //  console.log(response.status);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description
      res.write("<h1>The Temperature in "+ query+" is "+ temp + "degree celcius</h1>");
      res.write("<h3>the weather is currently" + weatherDescription + "</h3>")
      res.write("<img src=" + imageURL + ">");
      res.send()
    })
  });


});



app.listen(3000, function() {
  console.log("server is running on port 3000");
})
