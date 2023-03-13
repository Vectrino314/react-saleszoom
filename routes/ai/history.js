const db = require("../models");
const express = require("express");
const History = db.history;

let app = express.Router()

app.post('/history/userPromptHistory', async (req, res, next) => {
    console.log('hit')
    try {
        let { userId, page, pageSize } = req.body

        // console.log(req.body)

        // console.log( userId )
        // console.log( 'hit' )
        console.log( page, pageSize)

        const totalItems = await History.countDocuments({'user': userId});
        const totalPages = Math.ceil(totalItems / pageSize);

        // await History.remove({ 'api': "/api/ai/history/userPromptHistory" })

        const userPrompHistory = await History.find({ 'user': userId })
            .sort({ _id: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec()

        // console.log(userId)

        req.locals.outputs = userPrompHistory
        req.locals.totalPages = totalPages
        req.locals.bottomRange = (page - 1) * pageSize + 1
        req.locals.topRange = (page - 1) * pageSize + pageSize
        req.locals.totalItems = totalItems
        req.locals.skipFilter = true
        req.locals.skipHistory = true
        req.locals.skipCredit = true

        console.log(req.locals);

        next()

    } catch (err){
        console.log(err.response)
        console.log(err.data)
        console.log(err.message)
    }
})

module.exports = app;
