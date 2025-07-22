const mongoose = require('mongoose');
const Client = require('../models/user');


const dummyClients = Array.from({ length: 20 }, (_, i) => ({
  clientName: `Client ${i + 1}`,
  clientPhone: `+91 98765${(10000 + i).toString()}`
}));

const seedClients = async () => {
  try {
    await Client.deleteMany();
    const inserted = await Client.insertMany(dummyClients);
    console.log(`✅ Inserted ${inserted.length} clients successfully.`);
  } catch (error) {
    console.error('❌ Error seeding clients:', error);
    throw error;
  }
};

module.exports = {
  seedClients,
};
