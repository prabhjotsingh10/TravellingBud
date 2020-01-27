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

app.listen(4000, () => {
    console.log("The server is up and running");
})


