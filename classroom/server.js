const express= require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path= require("path");
const ejsMate = require("ejs-mate");

const sessionOptions = {
    secret: "Mysupersecretstring",
    resave: false, 
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// app.get("/reqcount", (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
    
//     res.send(`you sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("test successfull");
// });

app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success", "user reqistered successfully");
    res.redirect("/hello");

});

app.get("/hello", (req, res) => {
      res.locals.msg = req.flash("success");
       res.render("page.ejs", {name: req.session.name });
});

app.listen(3000, () => {
    console.log("server is listening");
});