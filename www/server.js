/*********************************************************************************
 * WEB700 – Assignment 03
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Dhruvil Patel Student ID: dpatel564 Date: 17-06-2023
 *
 ********************************************************************************/


const {
    getAllStudentsView, getStudentDetailView, getAllTAsView, getAllCourseView, getHomeView, getAboutView,
    getHTMLDemoView, getError404View, getStudentsFormView, createStudentsView
} = require("../modules/views");
const morgan = require("morgan")();
const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const PORT = 8000
// app.use(morgan)
app.use(bodyParser.urlencoded({extended: true}))
app.use("/public", express.static((__dirname.replace("www", "public"))))


app.get('/students', getAllStudentsView)
app.get('/student/:num', getStudentDetailView)
app.get('/students/add', getStudentsFormView)
app.post('/students/add', createStudentsView)
app.get('/tas', getAllTAsView)
app.get('/courses', getAllCourseView)

app.get('/', getHomeView)
app.get('/about', getAboutView)
app.get('/htmlDemo', getHTMLDemoView)

app.use(getError404View);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Connected! on http://localhost:${PORT}`)
})