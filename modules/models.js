const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(process.env.DB_URL);

const Student = sequelize.define('Student', {
  studentNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressProvince: Sequelize.STRING,
  TA: Sequelize.BOOLEAN,
  status: Sequelize.STRING,
});

const Course = sequelize.define('Course', {
  courseId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseCode: Sequelize.STRING,
  courseDescription: Sequelize.STRING,
});

Course.hasMany(Student, {
  foreignKey: 'courseId',
});

sequelize.sync()
  .then(() => {
    console.log('Models synced with database');
  })
  .catch(err => {
    console.error('Error syncing models:', err);
  });

module.exports = {
  Student,
  Course,
};
