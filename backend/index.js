const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

const MONGO = process.env.MONGO_URL
const PORT = process.env.PORT

mongoose.connect(MONGO)
    .then(() => {
        console.log("DB Connected ....")
    }).catch(() => {
        console.log("DB Failed ....")
    })

const activity = mongoose.model("activity", { name: String }, "activities")

app.get("/todolist", (req, res) => {
    activity.find().then((retdata) => {
        res.send(retdata)
    })
})

app.post("/addactivity", (req, res) => {
    var newactivity = req.body.activity

    var newActivity = new activity({ name: newactivity })
    newActivity.save().then((activitysaved) => {
        console.log(activitysaved)
        res.send(activitysaved)
    })
})

app.delete("/deleteactivity/:id", (req, res) => {
    const activityId = req.params.id
    console.log(activityId)

    activity.findByIdAndDelete(activityId).then((activitydeleted) => {
        console.log(activitydeleted)
        res.send(activitydeleted)
    })
})

app.get("/", (req, res) => {
    res.send("Backend Connected....")
})

app.listen(PORT, (req, res) => {
    console.log(`Server started at port number ${PORT}`)
})