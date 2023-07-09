const fs = require('fs');
const {writeStudentsFile} = require("../utils/utils");

class CollegeData {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }


    getAllStudents() {
        return new Promise((resolve, reject) => {
            if (this.students && this.students.length > 0) {
                resolve(this.students);
            } else {
                reject('No results returned');
            }
        });
    }

    getTAs() {
        return new Promise((resolve, reject) => {
            if (this.students && this.students.length > 0) {
                const tas = this.students.filter(student => student.TA);
                if (tas.length > 0) {
                    resolve(tas);
                } else {
                    reject('No results returned');
                }
            } else {
                reject('No results returned');
            }
        });
    }

    getCourses() {
        return new Promise((resolve, reject) => {
            if (this.courses && this.courses.length > 0) {
                resolve(this.courses);
            } else {
                reject('No results returned');
            }
        });
    }

    getStudentsByCourse(course) {
        return new Promise((resolve, reject) => {
            if (this.students && this.students.length > 0) {
                const studentsCourse = this.students.filter(student => student.course === course)
                resolve(studentsCourse)
            } else {
                reject('No results returned');
            }
        });
    }

    getStudentByNum(num) {
        return new Promise((resolve, reject) => {
            if (this.students && this.students.length > 0) {
                const student = this.students.filter(student => student.studentNum === num)
                resolve(student[0])
            } else {
                reject('No results returned');
            }
        });
    }

    addStudent(data) {
        return new Promise((resolve, reject) => {
            if (data) {
                const studentNum = this.students.length + 1
                const isTA = data.TA.toUpperCase() === "ON"
                data.studentNum = studentNum
                const studentData = {
                    studentNum: studentNum,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    addressStreet: data.addressStreet,
                    addressCity: data.addressCity,
                    addressProvince: data.addressProvince,
                    TA: isTA,
                    status: data.status,
                    course: data.course
                }
                this.students.push(studentData)
                writeStudentsFile(this.students)
                resolve(data)
            } else {
                reject('No results returned');
            }
        });
    }
}


module.exports = CollegeData