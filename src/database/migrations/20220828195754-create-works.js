'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('works', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      pdf_id: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subject_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('works');
  }
};
