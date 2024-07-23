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
    },
    {
      tableName: "attendances",
      timestamps: false,
    }
  );

  return Attendance;
};
