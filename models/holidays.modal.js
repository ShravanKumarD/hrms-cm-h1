module.exports = (sequelize, Sequelize) => {
    const Holiday = sequelize.define("holiday", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    
    }, {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    });
  
    return Holiday;
  };
  