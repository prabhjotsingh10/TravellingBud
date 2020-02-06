const express = require('express');

const app = express();

const exphbr = require('express-handlebars');

app.use(express.static('CSS and Images'));

app.engine('handlebars', exphbr());
app.set('view engine','handlebars');

app.get('/',(req,res) =>{
    res.render("home", {
        title:"Welcome to TravellingBud "
    })
})

app.get('/home',(req,res) =>{
    res.render("home", {
        title:"Welcome to TravellingBud "
    })
})


app.get("/registration", (req,res) => {

    res.render("registration", {
        title:"Featured Room Listings",
        heading: "Featured Rooms Just For You"
    });

})

app.post("/validation", (req,res) =>{

    const errors = [];

    if(req.body.email == "")
    {
        errors.push("Sorry, You must enter an email");
    }

    if(req.body.pass == ""){
        errors.push("Sorry, You must create a password to continue");
    }
})



app.listen(4000, () => {
    console.log("The server is up and running");
})


