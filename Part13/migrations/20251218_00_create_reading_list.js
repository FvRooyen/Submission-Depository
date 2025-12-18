const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      reading_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readinglists')
  },
}