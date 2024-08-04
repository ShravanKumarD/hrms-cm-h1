module.exports = (sequelize, Sequelize) => {
    const UserHikeLetter = sequelize.define(
      "user_hike_letters",
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        place: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        effective_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        new_salary: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        previous_salary: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hr_name: {
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
  
    return UserHikeLetter;
  };
  