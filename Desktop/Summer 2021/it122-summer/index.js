// import * as southamerica from "./lib/southamerica.js";
import express from 'express';
import handlebars from 'express-handlebars';
import { Country } from "./models/southamerica.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json());

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


app.get('/delete', (req,res,next) => {
    // db query can use request parameters
    Country.deleteOne({ country:req.query.country }).lean()
        .then((country) => {
            res.render('delete', {result: country} );
        })
        .catch(err => next(err));
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