'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('products', [
      {
        name: 'Notebook',
        product_category_id: 1,
        product_situation_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Arroz 5kg',
        product_category_id: 2,
        product_situation_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Camiseta Básica',
        product_category_id: 3,
        product_situation_id: 1,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', {
      name: ['Notebook', 'Arroz 5kg', 'Camiseta Básica'],
    });
  },
};
