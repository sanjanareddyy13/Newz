require("dotenv").config(); // Load .env file content into process.env
// console.log('API Key:', API_KEY);

const express = require("express");
const axios = require("axios"); // HTTP requests to external APIs
const cors = require("cors"); // Cross-Origin Resource Sharing

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('API_KEY is not set. Please check your .env file.');
  process.exit(1); // Terminate the server if API key is missing
}

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "Successfully fetched the data",
          data: response.data,
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "No more results to show",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: 500,
        success: false,
        message: "Failed to fetch data from the API",
        error: error.message,
      });
    });
}

// All news (route)
app.get("/all-news", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40; // Default pageSize = 40
  let page = parseInt(req.query.page) || 1; // Default page = 1
  let query = req.query.q || 'technology'; // Default query = 'technology'

  // Dynamically construct the API URL
  let url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  
  fetchNews(url, res);
});

//top-headlines
app.options("/top-headlines",cors());
app.get("/top-headlines",(req,res)=>{
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1; 
    let category=req.query.category || "business";
    let url=`https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url,res);

});
//country
app.options("/country/:iso",cors());
app.get("/country/:iso",(req,res)=>{
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    const country=req.params.iso;
    let url=`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
    fetchNews(url,res);
});
// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
