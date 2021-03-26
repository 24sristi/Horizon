const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const cookieParser = require("cookie-parser"); 
const patientRouter = require('./Router/patientRouter');
const doctorRouter = require('./Router/doctorRouter');
const DocViewRouter = require('./Router/DocViewRouter');
const patientViewRouter = require('./Router/PatientViewRouter');
const { getHorizon } = require('./Controller/ViewController');

app.use(cors())

app.use( express.json());
app.use(cookieParser());
app.use(express.static(__dirname+"/public"));

// view engine se
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"View"));

app.get("", getHorizon);
app.use("/patient" , patientRouter);
app.use("/doctor",doctorRouter);
app.use("/d",DocViewRouter);
app.use("/p",patientViewRouter);

let port = process.env.PORT || 3000  
app.listen(port, function () {
    console.log("server started at port 3000");
  });
