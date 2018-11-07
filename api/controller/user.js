const User     = require('../model/user');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const mongoose = require( 'mongoose');
const express  = require('express');

function getYears(x) {
    return Math.floor(x / 1000 / 60 / 60 / 24 / 365);
}
function getjon(n,c) {
    var oneDay = 24*60*60*1000;
    return Math.round(Math.abs((n - c)/(oneDay)));
}
exports.user_get_profile = (req, res, next)=>{
    const iduser = req.params.id;
    User.findById({_id : iduser}).exec().then(doc=>{
        let n = Date.now();
        let d = new Date(doc.birthday);
        let c = new Date(doc.joinedOn);
        res.status(200).json({
            firstname : doc.firstname,
            lastname  : doc.lastname,
            gender    : doc.gender,
            age       : getYears(n - d),
            joinedOn  : getjon(n , c),
            profImg   : "http://localhost:3000/" + doc.profImg,
        })
    }).catch(err =>{
        res.status(500).json({
            error : err
        });
    })
};


exports.user_singup = (req, res, next)=>{
    User.find({email : req.body.email}).exec()
    .then(user =>{
        if (user.length >= 1) {
            return res.status(409).json({
                message : 'Mail is taken'
            });       
        } else {
            bcrypt.hash(req.body.password , 10 , (err,hash)=>{
                if (err) {
                    return res.status(500).json({ error : err });
                }
                else {
                    const user = new User({
                        _id       : mongoose.Types.ObjectId(),
                        firstname : req.body.firstname,
                        lastname  : req.body.lastname,
                        email     : req.body.email,
                        password  : hash,
                        gender    : req.body.gender,
                        birthday  : req.body.birthday,
                        phone     : req.body.phone,
                        profImg   : req.file.path
                    });
                    user.save().then(resulat =>{
                        res.status(201).json({
                            message  : 'user created',
                            resulat  : resulat,
                            imageurl : "http://localhost:3000/" + resulat.profImg,
                            request: {
                                type: 'GET',
                                url: "http://localhost:3000/products/" + resulat._id
                            }
                        })
                    }).catch(err =>{
                        res.status(500).json({
                            error : err
                        });
                    }); 
                }
            });            
        };
    }); 
};
exports.user_login =(req, res, next)=>{
    User.find({email : req.body.email}).exec().then(resulat =>{
        if (resulat.length < 1) {
            return res.status(401).json({
                message : 'User Or Email does not exsist'
            })
        }
        bcrypt.compare(req.body.password , resulat[0].password , (err , ress)=>{
            if (err) {
                return res.status(401).json({
                    message : "Auth faild"
                })
            }
            if(ress) {
               const token = jwt.sign({
                    email  : resulat[0].email,
                    userId : resulat[0]._id,

                }, 'MyfamilyYounis' , {
                    expiresIn : '1y' 
                });
                return res.status(200).json({
                    token : token
                })
            }
        })
    }).catch(err =>{
        res.status(500).json({
            error : err
        });
    })
};

//Delete function
exports.user_delete = (req, res, next)=>{
    const token   = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token , 'MyfamilyYounis');
    const iduser  = decoded.userId; 
    if (iduser === req.body.userId) {
        User.deleteOne({_id : req.body.userId}).exec()
        .then(resulat =>{
        res.status(200).json({
            message : 'Account Deleted',
            resulat : resulat
        })
        }).catch(err =>{
        res.status(500).json({
            error : err
        });
        });
    } else {
        res.status(401).json({
            message : 'Not Match singularity'
        })
    }
    
};





