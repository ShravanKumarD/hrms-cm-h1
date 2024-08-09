const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  timezone: "+05:30",
  logging: true,
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model")(sequelize, Sequelize);
db.userPersonalInfo = require("./userPersonalInfo.model")(sequelize, Sequelize);
db.userFinancialInfo = require("./userFinancialInfo.model")(
  sequelize,
  Sequelize
);
db.userPersonalEvent = require("./userPersonalEvent.model")(
  sequelize,
  Sequelize
);
db.userDocuments = require("./userDocuments.model")(sequelize, Sequelize);
db.department = require("./department.model")(sequelize, Sequelize);
db.deptAnnouncement = require("./deptAnnouncement.model")(sequelize, Sequelize);
db.job = require("./job.model")(sequelize, Sequelize);
db.application = require("./application.model")(sequelize, Sequelize);
db.attendance = require("./attendance.model")(sequelize, Sequelize);
db.payment = require("./payment.model")(sequelize, Sequelize);
db.expense = require("./expense.model")(sequelize, Sequelize);
db.userSalarySlip = require("./userSalarySlips.model")(sequelize, Sequelize);
db.userOfferLetter = require("./userOfferLetter.model")(sequelize, Sequelize);
db.userHikeLetter = require("./userHikeLetter.model")(sequelize, Sequelize);
db.userResignationLetter = require("./userResignationLetter.model")(
  sequelize,
  Sequelize
);
db.userRelievingLetter = require("./userRelievingLetter.model")(
  sequelize,
  Sequelize
);

// User Associations
db.user.hasOne(db.userPersonalInfo, { foreignKey: { allowNull: false } });
db.user.hasOne(db.userFinancialInfo, { foreignKey: { allowNull: false } });
db.user.hasOne(db.userDocuments, { foreignKey: { allowNull: false } });
db.user.hasMany(db.userPersonalEvent, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
  hooks: true,
});
db.user.hasMany(db.application, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
  hooks: true,
});
db.user.hasMany(db.deptAnnouncement, {
  foreignKey: { name: "createdByUserId", allowNull: false },
  onDelete: "CASCADE",
  hooks: true,
});
db.user.hasMany(db.job, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
  hooks: true,
});
db.user.hasMany(db.attendance, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  hooks: true,
});
db.user.hasMany(db.userSalarySlip, { foreignKey: { allowNull: false } });
db.user.hasOne(db.userOfferLetter, {
  foreignKey: { name: "userId", allowNull: false },
});
// maybe this is hasMany since a user can have multiple hike letters, change to salaryslip template
db.user.hasOne(db.userHikeLetter, {
  foreignKey: { name: "userId", allowNull: false },
});
db.user.hasOne(db.userResignationLetter, {
  foreignKey: { name: "userId", allowNull: false },
});
db.user.hasOne(db.userRelievingLetter, {
  foreignKey: { name: "userId", allowNull: false },
});
db.user.belongsTo(db.department, { foreignKey: { allowNull: true } });

// User Financial Informations Assocations
db.userFinancialInfo.belongsTo(db.user, { foreignKey: { allowNull: false } });

// User Documents Associations
db.userDocuments.belongsTo(db.user, { foreignKey: { allowNull: false } });

// Department Associations
db.department.hasMany(db.user, { onDelete: "CASCADE", hooks: true });
db.department.hasMany(db.deptAnnouncement, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
  hooks: true,
});
db.department.hasMany(db.expense, { foreignKey: { allowNull: false } });

// Expense Association
db.expense.belongsTo(db.department, { foreignKey: { allowNull: false } });

// Job Associations
db.job.hasMany(db.payment, {
  foreginKey: { allowNull: true },
  onDelete: "CASCADE",
  hooks: true,
});
db.job.belongsTo(db.user, { foreignKey: { allowNull: false } });

// Application Associations
db.application.belongsTo(db.user);

// Payment Associations
db.payment.belongsTo(db.job);

// Announcement Associations
db.deptAnnouncement.belongsTo(db.department, {
  foreignKey: { allowNull: true },
});
db.deptAnnouncement.belongsTo(db.user, {
  foreignKey: { name: "createdByUserId", allowNull: false },
});

// Attendance Associations
db.attendance.belongsTo(db.user, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

// User Salary Slip Associations
db.userSalarySlip.belongsTo(db.user, { foreignKey: { allowNull: false } });

// User Offer Letter Associations
db.userOfferLetter.belongsTo(db.user, {
  foreignKey: { name: "userId", allowNull: false },
});

// User Hike Letter Associations
db.userHikeLetter.belongsTo(db.user, {
  foreignKey: { name: "userId", allowNull: false },
});

// User Resignation Letter Associations
db.userResignationLetter.belongsTo(db.user, {
  foreignKey: { name: "userId", allowNull: false },
});

// User Relieving Letter Associations
db.userRelievingLetter.belongsTo(db.user, {
  foreignKey: { name: "userId", allowNull: false },
});

module.exports = db;
