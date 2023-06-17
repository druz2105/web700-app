const collegeData = require('./collegeData')
const fs = require("fs");
const path = require('path');


const filePath = (dirPath) => {
    return path.join(__dirname, dirPath);
}

const studentData = JSON.parse(fs.readFileSync(filePath('../data/students.json'), 'utf8'))
const courseData = JSON.parse(fs.readFileSync(filePath('../data/courses.json'), 'utf8'))

const homeHTML = fs.readFileSync(filePath('../templates/home.html'), 'utf8')
const aboutHTML = fs.readFileSync(filePath('../templates/about.html'), 'utf8')
const htmlDemoHTML = fs.readFileSync(filePath('../templates/htmlDemo.html'), 'utf8')
const error404 = fs.readFileSync(filePath('../templates/ERROR_404.html'), 'utf8')

const collegeObj = new collegeData(studentData, courseData)

const getHomeView = (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(homeHTML);
}


const getAboutView = (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(aboutHTML);
}

const getHTMLDemoView = (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(htmlDemoHTML);
}

const getError404View = (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(error404);
}

const getAllStudentsView = async (req, res) => {
    try {
        const course = parseInt(req.query.course);
        if (course) {
            try {
                const students = await collegeObj.getStudentsByCourse(course);
                if (students.length > 0) {
                    res.json(students);
                } else {
                    res.json({message: 'no results'});
                }
            } catch (error) {
                res.json({message: 'no results'});
            }
        } else {
            const students = await collegeObj.getAllStudents();
            if (students.length > 0) {
                res.json(students);
            } else {
                res.json({message: 'no results'});
            }
        }
    } catch (error) {
        res.json({message: 'no results'});
    }
}


const getAllTAsView = async (req, res) => {
    try {
        const tas = await collegeObj.getTAs();
        if (tas.length > 0) {
            res.json(tas);
        } else {
            res.json({message: 'no results'});
        }
    } catch (error) {
        res.json({message: 'no results'});
    }
}


const getAllCourseView = async (req, res) => {
    try {
        const courses = await collegeObj.getCourses();
        if (courses.length > 0) {
            res.json(courses);
        } else {
            res.json({message: 'no results'});
        }
    } catch (error) {
        res.json({message: 'no results'});
    }
}


const getStudentDetailView = async (req, res) => {
    const num = parseInt(req.params.num);
    try {
        const student = await collegeObj.getStudentByNum(num);
        if (student) {
            res.json(student);
        } else {
            res.json({message: 'no results'});
        }
    } catch (error) {
        res.json({message: 'no results'});
    }
}

module.exports = {
    getAllStudentsView,
    getAllCourseView,
    getAllTAsView,
    getStudentDetailView,
    getHomeView,
    getAboutView,
    getHTMLDemoView,
    getError404View
}