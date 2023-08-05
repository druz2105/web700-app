const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL);


class CollegeData {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }

    getAllStudents() {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    getTAs() {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    getCourses() {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    getStudentsByCourse(course) {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    getStudentByNum(num) {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    addStudent(data) {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    getCourseById = (id) => {
        return new Promise((resolve, reject) => {
            reject();
        });
    };

    updateStudent(studentData) {
        return new Promise((resolve, reject) => {
            reject();
        });
    }
}

module.exports = CollegeData;
