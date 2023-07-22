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

    getCourseById = (id) => {
        return new Promise((resolve, reject) => {
            const course = this.courses.find((course) => course.courseId === id);
            if (course) {
                resolve(course);
            } else {
                reject("query returned 0 results");
            }
        });
    };

    updateStudent(studentData) {
        return new Promise((resolve, reject) => {
            const index = this.students.findIndex((student) => student.studentNum === parseInt(studentData.studentNum));
            if (index !== -1) {
                this.students[index] = {
                    ...this.students[index],
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    email: studentData.email,
                    addressStreet: studentData.addressStreet,
                    addressCity: studentData.addressCity,
                    addressProvince: studentData.addressProvince,
                    TA: studentData.TA === 'on', // Convert checkbox data to boolean
                    status: studentData.status,
                    course: studentData.course,
                };
                writeStudentsFile(this.students)
                resolve(parseInt(studentData.studentNum));
            } else {
                reject(new Error('Student not found'));
            }
        });
    }

}


module.exports = CollegeData