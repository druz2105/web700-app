const { Student, Course } = require('./models');

class CollegeData {
    

    getAllStudents() {
        return Student.findAll()
            .then(students => {
                if (students.length === 0) {
                    throw new Error("No results returned");
                }
                return students;
            });
    }

    getCourses() {
        return Course.findAll()
            .then(courses => {
                if (courses.length === 0) {
                    throw new Error("No results returned");
                }
                return courses;
            });
    }

    getStudentsByCourse(course) {
        return Student.findAll({
            where: {
                course: course
            }
        })
        .then(students => {
            if (students.length === 0) {
                throw new Error("No results returned");
            }
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
            if (students.length === 0) {
                throw new Error("No results returned");
            }
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
}

module.exports = CollegeData;
