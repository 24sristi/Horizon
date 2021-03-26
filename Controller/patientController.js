const {patientModel} = require("../Model/patientModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY  = process.env.SECRET_KEY;

async function getPatient(req, res) {
  try {
    let user = await patientModel.find({email:req.body.email});
    res.status(200).json({
      message: "Patient data",
      data: user
    })
  } catch (err) {
    res.status(501).json({
      message: "failed to get doctor data",
      error: err
    })
  }
}

async function patientSignup(req, res) {
  try {
    let user = req.body;
    let newUser = await patientModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      phone: user.phone,
      age: user.age,
      address: user.address
    });
    const token = jwt.sign({ id: newUser["_id"], role:"patient" }, SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).json({
      message: "Succesfully Signed up !!",
      data: newUser,
    });
  } catch (error) {
    res.status(200).json({
      message: "Email is already registered!!",
      error,
    });
  }
}

async function patientLogin(req, res) {
  try {
    let { email, password } = req.body;
    let loggedInUser = await patientModel.find({ email: email });
    if (loggedInUser.length) {
      let user = loggedInUser[0];
      if (user.password == password) {
        // token ban na chahie
        const token = jwt.sign({ id: user["_id"], role:"patient" }, SECRET_KEY);

        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
          message: "Logged in succesfully !!",
          data: loggedInUser[0],
        });
        // res.redirect("/");
      } else {
        res.status(200).json({
          message: "Email and Password didn't Matched !!",
        });
      }
    } else {
      res.status(200).json({
        message: "No User Found SignUp First",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Login Failed !!",
      error,
    });
  }
}

async function PatientisLoggedIn(req, res, next) {
  try {
    let token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      if (payload.role == "doctor") {
        res.redirect("/d/profile")
      }
      let user = await patientModel.findById(payload.id);
      req.name = user.name;
      req.role = user.role;
      req.user = user;
      next();
    } else {
      //logged in nhi hai
      next();
    }
  } catch (error) {
    next();
  }
}
async function updatePatientProfilePhoto(req, res) {
  try {
    let id = req.id;
    let user = await patientModel.findById(id);
    user.pImage = req.body.imagePath;
    await user.save({ validateBeforeSave: false });
    res.json({
      message: "Profile Photo updated !!"
    })
  }
  catch (error) {
    res.status(200).json({
      message: "failed to update photo !!",
      error
    })
  }
}


async function updateDetails(req,res){
  try{
      let user = await patientModel.findById(req.id);
      for(key in req.body){
          user[key] = req.body[key];
      }
      user.save();
      res.status(200).json({
          mess:"Successfully updated details",
          data: user
      })

  }catch(err){
      res.status(500).json({
          mess:"failed to update",
          data : changesObj
      })
  }
}





module.exports.patientSignup = patientSignup;
module.exports.patientLogin = patientLogin;
module.exports.PatientisLoggedIn = PatientisLoggedIn;
module.exports.updatePatientProfilePhoto = updatePatientProfilePhoto;
module.exports.getPatient = getPatient;
module.exports.updateDetails = updateDetails;
