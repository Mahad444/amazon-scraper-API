const express = require('express');
const request = require('request-promise');

const app = express();

const PORT = process.env.PORT || 5000;

// const apiKey = 'aa85caa5512894ab2d3750888099def8';
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/' ,(req,res)=>{
    res.send('Welcome To Amazon Scraper API ')
});

// Get Product Detatils

app.get('/products/:productId',async(req,res)=>{
    const {productId }= req.params;
    const {api_key} = req.params
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response))
    }catch(error){
        res.json(error);
    }
})

// GET PRODUCT REVIEWS
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId }= req.params;
    const {api_key} = req.params

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response))
    }catch(error){
        res.json(error);
    }
});

// OFFERS
app.get('/products/:productId/offers',async(req,res)=>{
    const {productId }= req.params;
    const {api_key} = req.params

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response))
    }catch(error){
        res.json(error);
    }
});

// Search a Product
app.get('/search/:searchQuery',async(req,res)=>{
    const {searchQuery}= req.params;
    const {api_key} = req.params

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response))
    }catch(error){
        res.json(error);
    }
});

app.listen(PORT, ()=> {
    console.log(`now listening to http://localhost:${PORT}`);
});
