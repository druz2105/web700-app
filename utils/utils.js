const fs = require('fs');
const path = require("path");
const filePath = (dirPath) => {
    return path.join(__dirname, dirPath);
}


const studentsFilePath = filePath('../data/students.json');
const coursesFilePath = filePath('../data/courses.json');


function writeStudentsFile(data) {
    fs.writeFile(studentsFilePath, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing the file:', err);
        } else {
            console.log('JSON file has been successfully written.');
        }
    });
}

module.exports = {
    writeStudentsFile
}