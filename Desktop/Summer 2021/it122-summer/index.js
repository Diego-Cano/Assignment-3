// import * as southamerica from "./lib/southamerica.js";
import express from 'express';
import handlebars from 'express-handlebars';
import { Country } from "./models/southamerica.js";
import cors from 'cors';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json()); //Used to parse JSON bodies
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req, res, next) => {
    Country.find({}).lean()
      .then((countries) => {
        // respond to browser only after db query completes
            res.render('home', { countries });
      })
      .catch(err => next(err));
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page: Hello! My name is Diego Cano, and Im from Venezuela. Ive lived in Seattle for two years. I am a college student at Seattle Central College in the IT department. I have experience working with people because Ive worked as a waiter, barista, and banquet server. Id like to obtain my ASS-T in programming and try to transfer to a four-year college or university. My goal is to work for a company in the It team or as a freelancer.');
});

app.get('/detail', (req,res,next) => {
    // db query can use request parameters
    Country.findOne({ country:req.query.country }).lean()
        .then((country) => {
            res.render('details', {result: country} );
        })
        .catch(err => next(err));
});


// API ROUTES

app.get('/api/countries', (req, res, next) => {
    Country.find({}).lean()
      .then((countries) => {
        if(countries){
            res.json(countries)
        }
        else{
            res.status(500).send('Database Error occurred');
        }   
      })
      .catch(err => next(err));
});

app.get('/api/countries/detail/:country', (req,res,next) => {
    // db query can use request parameters
    Country.findOne({ country:req.params.country }).lean()
        .then((country) => {
            if(country){
                res.json(country)
            }
            else{
                res.status(500).send('Database Error occurred');
            } 
        })
        .catch(err => next(err));
});


app.post('/api/countries/add', (req, res, next) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
        let model = new Country(req.body) 
        model.save()
        res.json({"message":"all good"})
        console.log(req.body)
});

app.post('/api/countries/delete', (req,res,next) => {
    // db query can use request parameters
        Country.deleteOne({ country: req.body.country }).lean()
        .then((country) => {
            console.log(req.body)
            let model = new Country(req.body)
            res.json({"message":"all good"})
        })
        .catch(err => {
            res.status(500).send('Request body is missing')
        });
});

// app.post('/api/countries/add', (req,res,next) => {
//     Country.insertOne({ country: req.body.country }).lean()
//     .then((country) => {
//         console.log(req.body)
//         res.json({"message":"all good"})
//     })
//     .catch(err => {
//         res.status(500).send('Request body is missing')
//     });
// });


// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
})

app.listen(app.get('port'), () => {
    console.log('Express started');
})