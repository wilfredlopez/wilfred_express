const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();


//express middleware
app.use((req, res, next) =>{
    var now = new Date().toString()

    var log = (`${now} | ${req.method} | ${req.url}`)

    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('There was an error');
        }
        
    });
    next(); //allows the app to continue
});


//PAGINA DE MANTENIMIENTO
/*
app.use((req, res, next) =>{
    res.render('mantenimiento.hbs');
});
*/

app.get("/", (req, res) =>{
   // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: 'Welcome to my page!'
    });
});



app.get('/about', (req, res)=> {
   // res.send('About Page');



   res.render('about.hbs',{
       pageTitle: 'About Page',
   }); //using hbs package
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage:'Unable to handle request'
    });
});

app.listen(3000);
console.log('Listening on port 3000');

//CREATING PUBLIC/STATIC FOLDER AND PARTIAL FOLDERS
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //dirname is just the address to the current directory

//CREATING HELPERS
//THIS IS TO PASS INFORMATION TO ALL PAGES AND 
//YOU CAN CALL IT ON THE HTML OR HBS PAGE BY
//SAYING FOR EXAMPLE {{currentYear}} 
hbs.registerHelper('currentYear',() =>{
    return new Date().getFullYear()
});// i can create many variables like this
   
hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
});// in this case i return a function.
// call it from hbs or html file for example:
// {{ screamIt welcomeMessage }}
