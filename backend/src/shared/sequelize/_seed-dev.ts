import './sequelize';

const seeders = [ ];

(async function() {
  for (const seed of seeders)  await seed();
})().then(
  () => {
    console.log('\n\nSEED OK');
    process.exit(0);
  },
  err => {
    console.error(err);
    process.exit(0);
  }
);
