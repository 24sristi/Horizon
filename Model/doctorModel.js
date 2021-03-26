const mongoose = require("mongoose");
const DB_LINK  = process.env.DB_LINK;
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

let doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password must be greater than 6 characters"],
        required: true
    },
    confirmPassword: {
        type: String,
        minlength: [6, "Password must be greater than 6 characters"],
        validate: {
            validator: function () {
                return this.password == this.confirmPassword;
            },
            message: "Password didn't matched !!"
        }
    },
    role: {
        type: String,
        default: "doctor"
    },
    pImage: {
        type: String,
        default: "/images/profile/dummy.jpg"
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    timing:{
        type:String,
    },
    department:{
        type:String,
        required:true
    },
    fees:{
        type:Number
    }
})


// it will run before create is called on userModel
doctorSchema.pre("save", function () {
    this.confirmPassword = undefined;
})

const doctorModel = mongoose.model("doctorCollection", doctorSchema);
module.exports.doctorModel = doctorModel;
module.exports.doctorSchema = doctorSchema