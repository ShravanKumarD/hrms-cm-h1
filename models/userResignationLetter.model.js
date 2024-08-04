module.exports = (sequelize, Sequelize) => {
    const UserResignationLetter = sequelize.define(
      "user_resignation_letters",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        recipient_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        recipient_position: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        company_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        your_position: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_working_day: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        your_name: {
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
  
    return UserResignationLetter;
  };
  