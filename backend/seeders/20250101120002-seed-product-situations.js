'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('product_situations', [
      { name: 'Ativo', created_at: now, updated_at: now },
      { name: 'Fora de Linha', created_at: now, updated_at: now },
      { name: 'Em breve', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('product_situations', {
      name: ['Ativo', 'Fora de Linha', 'Em breve'],
    });
  },
};
