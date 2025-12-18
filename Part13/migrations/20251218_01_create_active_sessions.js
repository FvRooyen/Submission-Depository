const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('active_sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
     created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('active_sessions')
  },
}