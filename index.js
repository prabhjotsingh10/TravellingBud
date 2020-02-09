const express = require('express');
const app = express();
const exphbr = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(express.static('CSS and Images'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbr());
app.set('view engine','handlebars');

app.get('/',(req,res) =>{
    res.render("home", {
        title:"Welcome to TravellingBud ",

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

app.get("/login", (req,res) => {

    res.render("login", {
        title:"Log In",
       
    });

})

app.get("/sign_up", (req,res) => {

    res.render("sign_up", {
        title:"Sign Up Here",
       
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

    if(errors.length > 0){
        res.render("login",
        {
            messages : errors
        })
    }

})

app.post("/validate-home", (req,res)=>{

    const errors=[];

    if(req.body.check_in.value == undefined){
        errors.push("Please Enter a date for check in");
        console.log(errors);
    }

    if(req.body.check_out.value == undefined){
        errors.push("Please Enter a date for check out");
    }

    if(errors.length > 0 )
    res.render("home",{
        messages:errors
    }
    )
})

app.post("/validate_sign_up", (req,res)=>{

    const errors=[];

    if(req.body.frst_name == ""){
        errors.push("Please enter your first name in order to continue");
        
    }

    if(req.body.lst_name == ""){
        errors.push("Please enter your last name in order to continue");
    }

    
    if(req.body.psswrd.value == undefined){
        errors.push("Please enter your last name in order to continue");
        console.log(errors);
    }

    if(req.body.usr_rg_eml==""){
        errors.push("Please Enter you email address in order to continue");
        
    }

    if(req.body.brthdy.value==undefined){
        errors.push("Please Enter your date of birth to continue");
    }

    if(errors.length > 0 )
    {
    res.render("sign_up",{
        messages:errors
    })
}
})



app.listen(4000, () => {
    console.log("The server is up and running");
})


