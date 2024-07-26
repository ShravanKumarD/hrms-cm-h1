module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Assumes 'User' table exists
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Present", "Absent", "Leave"],
        allowNull: false,
      },
      clockinTime: {
        type: Sequelize.TIME,
        allowNull: true, // Allow null in case the user hasn't logged in yet
      },
      clockoutTime: {
        type: Sequelize.TIME,
        allowNull: true, // Allow null in case the user hasn't logged out yet
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true, // Allow null if location is not provided
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true, // Allow null if location is not provided
      },
    },
    {
      tableName: "attendances",
      timestamps: false,
    }
  );

  return Attendance;
};
