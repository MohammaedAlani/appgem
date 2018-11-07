const Video     = require('../model/viedo');
const mongoose = require( 'mongoose');
const express  = require('express');


exports.video_get_video = (req, res, next)=>{
    const iduser = req.params.id;
    const video  = new Video({
        author   : iduser,
        fans     : req.body.fans,
        video    : req.file.path
    });
    video.save().then(resualt =>{
        res.status(201).json({
            message  : 'video add',
            resulat  : resualt,
            imageurl : "http://localhost:3000/" + resualt.video,
            request: {
                type: 'GET',
                url: "http://localhost:3000/user/" + resualt.auther
            }
        })
    }).catch(er=>{
        res.status(500).json({
            message : err
        })
    })
    
};