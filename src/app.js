const path=require('path');
const express=require('express');  // express library returns a function called express()
const { application } = require('express');
const hbs=require('hbs');
const request=require('request');
const geoCode=require('./utils/geoCode');
const foreCast=require('./utils/forcast');

const app=express();

//Define Paths for Express config
const publicDirectory= path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templetes/views');
const partialsPath=path.join(__dirname,'../templetes/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);

// Register Partials
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectory));



app.get('',(req,res)=>{
    res.render('index.hbs',{
        name:'Jibran Hussain Mir',
        age:22,
        title:"Weather Page"
    })
})



app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Jibran Hussain Mir',
        title:"About Page"
    })
})



app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:'HELP Page',
        name:'Jibran Hussain Mir'
    })
})

app.get('/weather',(req,res)=>{
    // res.render('index.hbs',{
    //     title:'Weather',
    //     name:"Jibran Hussain Mir"
    // })
    if(!req.query.address){
        return res.send({
            error:'Address should be present'
        })
    }
 geoCode(req.query.address,(error,{latitude,longitude,location})=>{
    if(error){
        return res.send({error});
    }
   
   foreCast(latitude,longitude,(error,forecastData)=>{
    if(error){ return res.send({error})};
    
        res.send({
            Forecast:forecastData,
            location,
            Address:req.query.address
        })
    
   })
 })
})

app.get('/help/*',(req,res)=>{
    res.render('errorDisplay.hbs',{
        errorMessage:"Help Page not found"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Enter the search query string"
        })
    }
    console.log(req.search);
    res.send({
        products:['watches,video games']
    })
})

app.get('/Documentation',(req,res)=>{
    res.render('index.hbs',{
        title:'Documentation',
        name:'Jibran Hussain Mir'
    })
})

app.get('*',(req,res)=>{
       res.render('errorDisplay',{
        errorMessage:'Page not found'
       }) 
})

''

app.listen(3000,()=>{
    console.log("Server is Running");
})