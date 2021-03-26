const { patientModel } = require("../Model/patientModel");
const { doctorModel } = require("../Model/doctorModel");
const followerModel = require("../Model/followingModel");
const jwt = require("jsonwebtoken");

async function sendRequest(req, res) {
    try {
        let doctorId = req.user.id;
        let patientId = req.params.pid;
        console.log(doctorId, patientId);
        let reqobj = await followerModel.create({
            doctorId: doctorId,
            patientId: patientId
        });

        res.status(200).json({
            mess: "Req send successfully",
            data: reqobj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to send request",
            error: err
        })
    }

}

async function acceptRequest(req, res) {
    try {
        let obj = await followerModel.findOne({ patientId: req.id, doctorId: req.body.doctorId });
        obj.isAccepted = true;
        obj = await obj.save();
        res.status(200).json({
            message: "req accepted !!",
            data: obj
        })

    } catch (err) {
        res.status(501).json({
            mess: "failed to accept reqest",
            error: err
        })
    }
}

async function cancelRequest(req, res) {
    try {
        let obj = await followerModel.deleteOne({ patientId: req.id, doctorId: req.body.doctorId });
        res.status(200).json({
            message: "req deleted !!",
        })

    } catch (err) {
        res.status(501).json({
            mess: "failed to accept reqest",
            error: err
        })
    }
}

async function unfollow(req, res) {
    try {
        let obj = await followerModel.deleteOne({ patientId: req.id, doctorId: req.body.doctorId });
        res.status(200).json({
            message: "req deleted !!",
        })

    } catch (err) {
        res.status(501).json({
            mess: "failed to accept reqest",
            error: err
        })
    }
}

async function getfollowers(req, res) {
    try {
        let followersId = await followerModel.find({ patientId: req.id, isAccepted: true });
        let followerObj = [];
        for (let i = 0; i < followersId.length; i++) {
            let obj = await doctorModel.findById(followersId[i].doctorId);
            followerObj.push(obj);
        }
        res.status(200).json({
            mess: "Successfully get all followers",
            data: followerObj
        })
    } catch (err) {
        res.status(501).json({
            mess: "failed to get followers",
            error: err
        })
    }
}

async function getfollowing(req, res) {
    try {
        let followingId = await followerModel.find({ doctorId: req.id, isAccepted: true });

        let followingObj = [];
        for (let i = 0; i < followingId.length; i++) {
            let obj = await patientModel.findById(followingId[i].patientId);
            followingObj.push(obj);
        }
        res.status(200).json({
            mess: "Successfully get all followings",
            data: followingObj
        })
    } catch (err) {
        res.status(501).json({
            mess: "failed to get followings",
            error: err
        })
    }
}

async function getPendingRequest(req, res) {
    try {
        let followersId = await followerModel.find({ patientId: req.id, isAccepted: false });

        let followerObj = [];
        for (let i = 0; i < followersId.length; i++) {
            let obj = await doctorModel.findById(followersId[i].doctorId);
            followerObj.push(obj);
        }
        res.status(200).json({
            mess: "Successfully get all pending req",
            data: followerObj
        })
    } catch (err) {
        res.status(501).json({
            mess: "failed to get pending req",
            error: err
        })
    }
}


async function cancelRequestByDoc(req, res) {
    try {
        let obj = await followerModel.deleteOne({ patientId: req.params.pid, doctorId: req.user.id });
        res.status(200).json({
            message: "req deleted !!",
        })

    } catch (err) {
        res.status(501).json({
            mess: "failed to accept reqest",
            error: err
        })
    }
}

async function unfollowByDoc(req, res) {
    try {
        let obj = await followerModel.deleteOne({ patientId: req.params.pid, doctorId: req.user.id });
        res.status(200).json({
            message: "req deleted !!",
        })

    } catch (err) {
        res.status(501).json({
            mess: "failed to accept reqest",
            error: err
        })
    }
}

module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest;
module.exports.cancelRequest = cancelRequest;
module.exports.unfollow = unfollow;
module.exports.cancelRequestByDoc = cancelRequestByDoc;
module.exports.unfollowByDoc = unfollowByDoc;
module.exports.getfollowers = getfollowers;
module.exports.getfollowing = getfollowing;
module.exports.getPendingRequest = getPendingRequest;