'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('product_categories', [
      { name: 'Eletrônicos', created_at: now, updated_at: now },
      { name: 'Alimentos', created_at: now, updated_at: now },
      { name: 'Vestuário', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('product_categories', {
      name: ['Eletrônicos', 'Alimentos', 'Vestuário'],
    });
  },
};
