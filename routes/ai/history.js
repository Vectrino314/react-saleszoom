const db = require("../../models");
const express = require("express");
const History = db.history;

let app = express.Router()

app.post('/history/userPromptHistory', async (req, res, next) => {
    try {
        let { userId } = req.body

        const userPrompHistory = History.find({user: userId})

        req.locals.userHistory = userPrompHistory

        next()

    } catch (err){
        console.log(err.response)
        console.log(err.data)
        console.log(err.message)
    }
})

