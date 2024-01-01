const express = require('express')
const path = require('path')
const api = express()
const randomstring = require('randomstring');


api.use(express.static(path.join(__dirname, ,"public")))


api.get("/createroom", (req, res) => {
    const hash = randomstring.generate({
        length : 5,
        charset: ['numeric']
    });
    console.log("hash gen")
    return res.send({ code  : hash});
})

api.get('/chat/:hash', (req, res) => {
    return res.sendFile(path.join(__dirname,   "public", "chat.html"));
})

api.get('/:hash?', (req, res) => {
    return res.sendFile(path.join(__dirname,"public", "index.html"))
})







module.exports = api