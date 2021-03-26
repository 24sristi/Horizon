const mongoose = require("mongoose");
const  DB_LINK  = process.env.DB_LINK;
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

let followerSchema = new mongoose.Schema({
    doctorId:{
        type:String
    },
    patientId:{
        type:String
    },
    isAccepted:{
        type:Boolean,
        default:false
    }
})

const followerModel = mongoose.model("followerCollection", followerSchema);
module.exports = followerModel;