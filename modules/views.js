const CollegeData = require('./collegeData')
const fs = require("fs");
const path = require('path');

const initialize = () => {
    const studentData = JSON.parse(fs.readFileSync(filePath('../data/students.json'), 'utf8'))
    const courseData = JSON.parse(fs.readFileSync(filePath('../data/courses.json'), 'utf8'))
    return new CollegeData(studentData, courseData)
}

const filePath = (dirPath) => {
    return path.join(__dirname, dirPath);
}

const error404 = fs.readFileSync(filePath('../templates/ERROR_404.html'), 'utf8')



const getHomeView = (req, res) => {
    res.render('home.hbs');
}


const getAboutView = (req, res) => {
    res.render('about.hbs');
}

const getHTMLDemoView = (req, res) => {
    res.render('htmlDemo.hbs');
}

const getError404View = (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(error404);
}

const getAllStudentsView = async (req, res) => {
    try {
        const collegeObj = initialize()
        const course = parseInt(req.query.course);
        if (course) {
            try {
                const students = await collegeObj.getStudentsByCourse(course);
                if (students.length > 0) {
                    res.render('students', { students: students, message: "no results" });
                } else {
                    res.render('students', { students: undefined, message: "no results" });
                }
            } catch (error) {
                res.render('students', { students: undefined, message: "no results" });
            }
        } else {
            const students = await collegeObj.getAllStudents();
            if (students.length > 0) {
                res.render('students', { students: students, message: "no results" });
            } else {
                res.render('students', { students: undefined, message: "no results" })
            }
        }
    } catch (error) {
        res.render('students', { students: undefined, message: "no results" })
    }
}


const getAllTAsView = async (req, res) => {
    try {
        const collegeObj = initialize()
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
        const collegeObj = initialize()
        const courses = await collegeObj.getCourses();
        if (courses.length > 0) {
            res.render('courses.hbs', { courses: courses, message: "no results" });
        } else {
            res.render('courses.hbs', { courses: undefined, message: "no results" });
        }
    } catch (error) {
        res.render('courses.hbs', { courses: undefined, message: "no results" });
    }
}


const getStudentDetailView = async (req, res) => {
    const num = parseInt(req.params.num);
    try {
        const collegeObj = initialize()
        const student = await collegeObj.getStudentByNum(num);
        const courses = await collegeObj.getCourses();
        if (student) {
            res.render('student.hbs', { student: student, courses: courses });
        } else {
            res.render('student.hbs', { message: "Student not found" });
        }
    } catch (error) {
        res.render('student.hbs', { message: "Student not found" });
    }
}

const getStudentsFormView = async (req, res) => {
        res.render("addStudent.hbs");
}

const createStudentsView = async (req, res) => {
    try {
        const studentData = req.body;
        const collegeObj = initialize()
        if (studentData) {
            const student = await collegeObj.addStudent(studentData)
            res.json(student);
        } else {
            res.json({message: 'no results'});
        }
    } catch (error) {
        console.log(error)
        res.json({message: 'no results'});
    }
}

const getCourseDetailView = async (req, res) => {
    const collegeObj = initialize()
    const courseId = parseInt(req.params.id);
    try {
        const course = await collegeObj.getCourseById(courseId);
        res.render('course.hbs', { course: course });
    } catch (error) {
        res.render('course.hbs', { message: error });
    }
}

const updateStudentData = async (req, res) => {
    const studentData = req.body;
    const collegeObj = initialize()
    try {
        const studentId = await collegeObj.updateStudent(studentData)
        res.redirect(`/student/${studentId}`);
    } catch (error) {
        res.render('student.hbs', { message: error });
    }

}


module.exports = {
    getAllStudentsView,
    getAllCourseView,
    getAllTAsView,
    getStudentsFormView,
    createStudentsView,
    updateStudentData,
    getStudentDetailView,
    getHomeView,
    getAboutView,
    getHTMLDemoView,
    getCourseDetailView,
    getError404View
}