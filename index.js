const express = require('express');
const app = express();
const exphbr = require('express-handlebars');
const bodyParser = require('body-parser');
const roomsModel = require("./models/rooms");

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
        heading: "Featured Rooms Just For You",
        rooms: roomsModel.getallProducts()
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

/*******LOGIN VALIDATIONS **********/

app.post("/validation", (req,res) =>{

    const errors = [];

    if(req.body.email == "")
    {
        errors.push("Sorry, You must enter an email");
    }

    if(req.body.pass == ""){
        errors.push("Sorry, You must create a password to continue");
    }

    if(req.body.pass.length > 9)
    {
        errors.push("Please enter a password less than 9 words");
    }

    if(errors.length > 0){
        res.render("login",
        {
            messages : errors
        })
    }

})

/*******HOME PAGE VALIDATIONS **********/

app.post("/validate-home", (req,res)=>{

    const errors=[];

    if(req.body.check_in.value == undefined){
        errors.push("Please Enter a date for check in");
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

/*******SIGN-UP PAGE VALIDATIONS **********/


app.post("/sign_up", (req,res)=>{

    const errors=[];

    if(req.body.frst_nme == ""){
        errors.push("Please enter your first name in order to continue");
        
    }

     if(req.body.lst_nme == ""){
         errors.push("Please enter your last name in order to continue");
     }

    
    if(req.body.psswrd == undefined){
        errors.push("Please enter your password name in order to continue");
    }

    if(req.body.psswrd.length > 9){
        errors.push("Please create a password less than 9 words");
    }

    if(req.body.usr_rg_eml==""){
        errors.push("Please Enter you email address in order to continue");
        
    }

    if(req.body.brthdy==undefined){
        errors.push("Please Enter your date of birth to continue");
    }

    if(errors.length > 0 )
    {
    console.log(errors);
    res.render("sign_up",{
        messages:errors
    })
    }
    else{
    const accountSid = 'ACe317b394cdcceeb8df5c4247b4159d0d';
    const authToken = 'c94d96e9b9c115ac96cf81d8dbee84fe';
    const client = require('twilio')(accountSid, authToken);

   client.messages
     .create({
        body: `${req.body.frst_name} ${req.body.lst_name} Message: ${req.body.usr_rg_eml}`,
        from: '+14805088327',
        to: `${req.body.ph_No}`
      })
     .then(message =>{ 
        console.log(message.sid);
        res.render("sign_up");
     })

     .catch((err) =>{
         console.log(`Error ${err}`);
     })
  
     }

    });

app.listen(4000, () => {
    console.log("The server is up and running");
})
