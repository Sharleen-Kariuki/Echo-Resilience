import prisma from './client.js';

async function main() {
  console.log('Testing database connection...');
  try {
    // Try to count users as a basic query check
    const usersCount = await prisma.user.count();
    console.log(`\n🎉 Connection successful! Current user count in database: ${usersCount}`);
  } catch (error) {
    console.error('\n❌ Database connection test failed.');
    console.error('Error details:', error.message);
    
    console.log('\n------------------------------------------------------------');
    console.log('Troubleshooting Checklist:');
    console.log('1. Ensure PostgreSQL is running locally or remotely.');
    console.log('2. Update your DATABASE_URL inside "database/.env" to match your PG instance.');
    console.log('3. Push the schema to the database (or run migrations if you want to track them):');
    console.log('   npx prisma db push');
    console.log('4. Run the connection test again:');
    console.log('   npm run test-connection');
    console.log('------------------------------------------------------------');
  } finally {
    await prisma.$disconnect();
  }
}

main();
