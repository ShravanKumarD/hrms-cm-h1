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
      loginTime: {
        type: Sequelize.DATE,
        allowNull: true, // Allow null in case the user hasn't logged in yet
      },
      logoutTime: {
        type: Sequelize.DATE,
        allowNull: true, // Allow null in case the user hasn't logged out yet
      },
    },
    {
      tableName: "attendances",
      timestamps: false,
    }
  );

  return Attendance;
};
