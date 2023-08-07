const CollegeData = require('./collegeData')
const fs = require("fs");
const path = require('path');


const filePath = (dirPath) => {
    return path.join(__dirname, dirPath);
}

const collegeObj = new CollegeData()

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
            console.log(">>>>>>>>>>>>>>>", courses);
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
    let viewData = {};
    try {
        const studentData = await collegeObj.getStudentByNum(num);
        if (studentData) {
        viewData.student = studentData;
        } else {
        viewData.student = null;
        }
    } catch (error) {
        viewData.student = null;
    }

    try {
        const courseData = await collegeObj.getCourses();
        viewData.courses = courseData;

        if (viewData.student) {
        for (let i = 0; i < viewData.courses.length; i++) {
            if (viewData.courses[i].courseId == viewData.student.courseId) {
              viewData.courses[i].selected = true;
            }
        }
        }
    } catch (error) {
        viewData.courses = [];
    }

    if (!viewData.student) {
        res.status(404).send("Student Not Found");
    } else {
        res.render("student", { viewData });
    }
}

const getStudentsFormView = async (req, res) => {
        const courses = await collegeObj.getCourses()
        console.log(courses);
        if(courses.length===0){
            res.render("addStudent")    
        }
        res.render("addStudent", {courses});
}

const createStudentsView = async (req, res) => {
    try {
        const studentData = req.body;
        
        if (studentData) {
            const student = await collegeObj.addStudent(studentData)
            res.redirect('/students')
        } else {
            res.json({message: 'no results'});
        }
    } catch (error) {
        console.log(error)
        res.json({message: 'no results'});
    }
}

const updateStudentData = async (req, res) => {
    const studentData = req.body;
    
    try {
        const studentId = await collegeObj.updateStudent(studentData)
        res.redirect(`/student/${studentId}`);
    } catch (error) {
        res.render('student.hbs', { message: error });
    }
}

const deleteStudentData = async (req, res) => {
    try{
        await collegeObj.deleteStudentByNum(req.params.studentNum)
        res.redirect('/students');
    
    }      
     catch {
        res.status(500).send('Unable to Remove Student / Student not found');
      };
  }

const getCourseFormView = (req, res) => {
    res.render('addCourse'); // Assuming you've set up your view engine and templates
}
 

const addCourseView = async (req, res) => {
    const courseData = req.body; // Assuming form fields are properly named
    collegeObj.addCourse(courseData)
      .then(() => {
        res.redirect('/courses');
      })
      .catch(() => {
        res.status(500).send('Unable to add course');
      });
};

const getCourseDetailView = async (req, res) => {
    const courseId = req.params.id;
    collegeObj.getCourseById(courseId)
      .then(course => {
        if (!course) {
          res.status(404).send('Course Not Found');
        } else {
          res.render('course', course);
        }
      })
      .catch(() => {
        res.status(500).send('Error fetching course');
      });
}


const updateCourseView = async (req, res) => {
    const courseData = req.body; // Assuming form fields are properly named
    collegeObj.updateCourse(courseData)
      .then(() => {
        res.redirect('/courses');
      })
      .catch(() => {
        res.status(500).send('Unable to update course');
      });
}

const deleteCourseById = async (req, res) => {
    const courseId = req.params.id;
    collegeObj.deleteCourseById(courseId)
      .then(() => {
        res.redirect('/courses');
      })
      .catch(() => {
        res.status(500).send('Unable to Remove Course / Course not found');
      });
}

module.exports = {
    getAllStudentsView,
    getAllCourseView,
    getAllTAsView,
    getStudentsFormView,
    createStudentsView,
    updateStudentData,
    deleteStudentData,
    getStudentDetailView,
    getHomeView,
    getAboutView,
    getHTMLDemoView,
    getCourseDetailView,
    getCourseFormView,
    addCourseView,
    updateCourseView,
    deleteCourseById,
    getError404View
}