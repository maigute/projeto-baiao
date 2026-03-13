'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = bcrypt.hashSync('senha123', 10);
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@email.com',
        password: passwordHash,
        situation_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        email: 'usuario@email.com',
        password: passwordHash,
        situation_id: 1,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@email.com', 'usuario@email.com'],
    });
  },
};
