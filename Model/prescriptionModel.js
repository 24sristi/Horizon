const mongoose = require("mongoose");
const  DB_LINK  = process.env.DB_LINK;
const { doctorSchema } = require("./doctorModel");
const { patientSchema } = require("./patientModel");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(
        DB_LINK,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((db) => {
        console.log("Connected to db !!!");
    });

let prescriptionSchema = new mongoose.Schema({
    patientObj:{
        type:{},
        required:true
    },
    patientId:{
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    doctorId:{
        type:String
    },
    department:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    prescriptionPath:{
        type:String,
        required:true
    }

})

const prescriptionModel = mongoose.model("prescriptionCollection",prescriptionSchema);
module.exports = prescriptionModel;