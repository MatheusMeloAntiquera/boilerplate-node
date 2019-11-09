'use strict';

module.exports = (app) => {
  const Sequelize = app.db.Sequelize;
  const Token = app.db.define('Token', {
    access_token_id: Sequelize.STRING,
    revoked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },
  }, {
      timestamps: true,
      underscored: true
  });
  Token.associate = function (models) {
    // associations can be defined here
  };
  return Token;
};