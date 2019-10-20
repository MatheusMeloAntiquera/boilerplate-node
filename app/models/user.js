'use strict';

module.exports = (app) => {
  const Sequelize = app.db.Sequelize;
  const User = app.db.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },


  }, {
      timestamps: true,
      modelName: 'user'
  });
  User.associate = function (models) {
    // associations can be defined here
  };

  return User
};