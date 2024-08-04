module.exports = (sequelize, Sequelize) => {
    const UserRelievingLetter = sequelize.define(
      "user_relieving_letters",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        employee_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        employee_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        employee_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date_of_joining: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        date_of_relieving: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        hr_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
      }
    );
  
    return UserRelievingLetter;
  };
  