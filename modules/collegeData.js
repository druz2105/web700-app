const { Student, Course } = require('./models');

class CollegeData {
    

    getAllStudents() {
        return Student.findAll()
            .then(students => {
                return students;
            });
    }

    getCourses() {
        return Course.findAll({
            order: [['courseId', 'ASC']]
        })
            .then(courses => {
                return courses;
            });
    }

    getTAs(){
        return Student.findAll({
            where: {
                TA: true
            }
        })
        .then(students => {
            return students;
        });
    }

    getStudentsByCourse(course) {
        return Student.findAll({
            where: {
                course: course
            }
        })
        .then(students => {
            return students;
        });
    }

    getStudentByNum(num) {
        return Student.findAll({
            where: {
                studentNum: num
            }
        })
        .then(students => {
            return students[0];
        });
    }

    addStudent(studentData) {
        studentData.TA = !!studentData.TA; // Convert to boolean
        for (const key in studentData) {
            if (studentData[key] === "") {
                studentData[key] = null;
            }
        }

        return Student.create(studentData)
            .then(() => {
                return;
            })
            .catch(() => {
                throw new Error("Unable to create student");
            });
    }

    updateStudent(studentData) {
        studentData.TA = !!studentData.TA; // Convert to boolean
        for (const key in studentData) {
            if (studentData[key] === "") {
                studentData[key] = null;
            }
        }

        return Student.update(studentData, {
            where: {
                studentNum: studentData.studentNum
            }
        })
        .then(() => {
            return;
        })
        .catch(() => {
            throw new Error("Unable to update student");
        });
    }

    deleteStudentByNum(studentNum) {
        return new Promise((resolve, reject) => {
          Student.destroy({
            where: { studentNum }
          })
            .then(() => {
              resolve('Student deleted successfully');
            })
            .catch(err => {
              reject('Unable to delete student');
            });
        });
      }

    addCourse(courseData) {
        Object.keys(courseData).forEach(key => {
          if (courseData[key] === '') {
            courseData[key] = null;
          }
        });
        console.log(">>>>86", courseData);
        return new Promise((resolve, reject) => {
          Course.create(courseData)
            .then(() => {
              resolve('Course created successfully');
            })
            .catch(err => {
              reject('Unable to create course');
            });
        });
    }

    getCourseById(id) {
        return new Promise((resolve, reject) => {
          Course.findAll({
            where: { courseId: id },
            limit: 1
          })
            .then(courses => {
              if (courses.length === 0) {
                reject('No results returned');
              } else {
                resolve(courses[0]);
              }
            })
            .catch(err => {
              reject('Error fetching course');
            });
        });
      }
      
    updateCourse(courseData) {
    Object.keys(courseData).forEach(key => {
        if (courseData[key] === '') {
        courseData[key] = null;
        }
    });
    
    return new Promise((resolve, reject) => {
        Course.update(courseData, {
        where: { courseId: courseData.courseId }
        })
        .then(() => {
            resolve('Course updated successfully');
        })
        .catch(err => {
            reject('Unable to update course');
        });
    });
    }
    
    deleteCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.destroy({
        where: { courseId: id }
        })
        .then(() => {
            resolve('Course deleted successfully');
        })
        .catch(err => {
            reject('Unable to delete course');
        });
    });
    }
}

module.exports = CollegeData;
