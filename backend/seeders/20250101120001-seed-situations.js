'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('situations', [
      { name: 'Ativo', created_at: now, updated_at: now },
      { name: 'Pendente', created_at: now, updated_at: now },
      { name: 'Inativo', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('situations', {
      name: ['Ativo', 'Pendente', 'Inativo'],
    });
  },
};
