var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('Home.html');
  }).listen(3000);
  
  
  console.log("Listening on PORT 3000");

mongoose.connect('mongodb://0.0.0.0:27017/GameSite',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// Sign Up
app.post("/sign_up",(req,res)=>{
    var username =req.body.username;
    var name = req.body.fullname;
    var email = req.body.email;
    var phonoNo = req.body.phone;
    var password = req.body.password;

    var data = {
        "username": username,
        "name": name,
        "email" : email,
        "phno": phonoNo,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('login.html')
})

// Login
app.post("/login", async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;

        const usermail = db.collection('users').findOne({ email: username }, (err, res) => {
            if (res == null) {
                response.send("Invalid information!❌❌❌! Please create account first");
            }
            else if (err) throw err;


            if (res.password === password) {
                return response.redirect('Homeafter.html');
            }
            else {
                response.send("Invalid Password!❌❌❌");
            }
        });
    }
    catch (error) {
        response.send("Invalid information❌");
    }
})