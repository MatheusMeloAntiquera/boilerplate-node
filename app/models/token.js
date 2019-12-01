'use strict';
export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    access_token_id: DataTypes.STRING,
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, {
      timestamps: true,
      underscored: true,
  });

  return Token;
};