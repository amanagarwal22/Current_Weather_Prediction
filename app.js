const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const request = require("request")
const app = express();
const moment=require("moment");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
let weatherdata = "";
app.use(express.static("public"))
app.get("/", function (req, res) {

 

    res.render('weather', {data: '',error: ''});
});


app.post("/", function (req, res) {
    const cityName = req.body.cityName ? req.body.cityName : "Northampton, GB";
    const apikey = "5657b488bc3819a2f5b3f37d79f809e6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
            res.render('weather', {data: '', error: 'Query error'})
        }
        response.on("data", function (data) {
            weatherdata = JSON.parse(data);
            res.render('weather', {data: weatherdata, error: ''});
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running in port 3000");
})
