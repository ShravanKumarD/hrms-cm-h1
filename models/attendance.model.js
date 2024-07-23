module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assumes 'Users' table exists
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Present", "Absent", "Leave"],
        allowNull: false,
      },
    },
    {
      tableName: "attendances",
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Attendance;
};
