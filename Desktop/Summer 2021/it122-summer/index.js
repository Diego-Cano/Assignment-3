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
            res.render('home', { countries });
            // res.render('home', {countries: JSON.stringify(countries)}); 
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
    Country.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});


app.get('/api/countries/detail/:country', (req,res,next) => {
    let country = req.params.country;
    Country.findOne({country: country}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});


app.post('/api/countries/add/', (req, res, next) => {
    if (!req.body._id) { // insert new document
        let country = new Country(req.body);
        country.save((err,newCountry) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newCountry._id});
        });
    } else { // update existing document
        Country.updateOne({ _id: req.body._id}, {country:req.body.country, capital: req.body.capital, population: req.body.population, currency: req.body.currency }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.post('/api/countries/delete/:id', (req,res,next) => {
        Country.deleteOne({"_id":req.params.id }, (err, result) => {
            if (err) return next(err);
            // return # of items deleted
            res.json({"deleted": result});
        });
});


// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
})

app.listen(app.get('port'), () => {
    console.log('Express started');
})