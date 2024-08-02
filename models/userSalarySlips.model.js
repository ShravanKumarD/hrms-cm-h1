module.exports = (sequelize, Sequelize) => {
  const UserSalarySlip = sequelize.define(
    "user_salary_slips",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user", // references the user table
          key: "id",
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_joining: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      basic_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hra: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      conveyance_allowance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      special_allowance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      medical_allowance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_earnings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tds: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      professional_tax: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      employee_pf: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      other_deductions: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_deductions: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );

  return UserSalarySlip;
};
