const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

//this ONLY prints to console when connected, not necessarily vital for the functionality
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Language = require("./models/language.js");


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new


app.get("/", async (req, res) => {
  res.render("home.ejs");
});

app.get("/languages", async (req, res) => {
  // the .find method displays all documents
  const allLanguages = await Language.find();

  //the render method has a local parameter that allows local variables to be passed
  // to the view (index.ejs)

  res.render("index.ejs", { languages: allLanguages });
});

app.post("/languages", async (req, res) => {
    if (req.body.isOOP === "on") {
        req.body.isOOP = true;
      } else {
        req.body.isOOP = false;
      }
  await Language.create(req.body);
console.log(req.body)
  res.redirect("/languages");
});

app.get("/languages/new", async (req, res) => {
  res.render("new.ejs");
});

app.get("/languages/:languageId", async (req, res) => {

const languageName =  await Language.findById(req.params.languageId)


  res.render("show.ejs", { languages: languageName });
  
});

app.put('/languages/:languageId', async (req,res) => {
await Language.findByIdAndUpdate(req.params.languageId,req.body)

res.redirect(`/languages/${req.params.languageId}`)

})

app.delete("/languages/:languageId", async (req, res) => {
    await Language.findByIdAndDelete(req.params.languageId)

    res.redirect('/languages')

  });


app.get("/languages/:languageId/edit", async (req, res) => {
    
    const foundLanguage =  await Language.findById(req.params.languageId);

    res.render('edit.ejs', {languages: foundLanguage})
    

    });


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
