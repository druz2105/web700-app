/*********************************************************************************
 * WEB700 – Assignment 04
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * cyclic-link: https://relieved-life-jacket-lamb.cyclic.app/
 * Name: Dhruvil Patel Student ID: dpatel564 Date: 21-07-2023
 *
 ********************************************************************************/


const {
    getAllStudentsView, getStudentDetailView, getAllTAsView, getAllCourseView, getHomeView, getAboutView,
    getHTMLDemoView, getError404View, getStudentsFormView, createStudentsView, getCourseDetailView, updateStudentData
} = require("../modules/views");
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const exphbs = require('express-handlebars');
const path = require("path");


const templatesDir = path.join(__dirname.replace("www", "templates"));


const handlebarsHelpers = {
    navLink: function(url, options) {
        return '<li' + ((url === app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') + '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
    },
    equal: function(lvalue, rvalue, options) {
        if (arguments.length < 3) throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue !== (rvalue)) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    }
};


app.engine('hbs', exphbs({ extname: 'hbs', layoutsDir: path.join(templatesDir, 'layouts'), defaultLayout: 'main', helpers: handlebarsHelpers }));
app.set('views', templatesDir); // Set the "views" directory to the "templates" directory
app.set('view engine', 'hbs');


app.use(function (req, res, next) {
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    console.log("app.locals.activeRoute", app.locals.activeRoute)
    next();
});

const PORT = 8000
// app.use(morgan)
app.use(bodyParser.urlencoded({extended: true}))
app.use("/public", express.static((__dirname.replace("www", "public"))))


app.get('/students', getAllStudentsView)
app.get('/student/:num', getStudentDetailView)
app.get('/students/add', getStudentsFormView)
app.post('/students/add', createStudentsView)
app.post('/student/update', updateStudentData)
app.get('/tas', getAllTAsView)
app.get('/courses', getAllCourseView)
app.get('/course/:id', getCourseDetailView)

app.get('/', getHomeView)
app.get('/about', getAboutView)
app.get('/htmlDemo', getHTMLDemoView)

app.use(getError404View);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Connected! on http://localhost:${PORT}`)
})
