/**
 * Check user role
 * Run with: npx tsx scripts/check-user.ts <email>
 */

import { dbConnect } from '../src/lib/mongodb';
import User from '../src/models/User';

async function checkUser(email: string) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('✅ Connected to database');

    if (!email) {
      console.error('❌ Please provide an email address');
      console.error('Usage: npx tsx scripts/check-user.ts <email>');
      process.exit(1);
    }

    const user = await User.findOne({ email }).select('+role');
    if (!user) {
      console.error(`❌ No user found with email: ${email}`);
      process.exit(1);
    }

    console.log('\n📝 User details:');
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Created: ${user.createdAt}`);

    if (user.role === 'admin') {
      console.log('\n✅ This user has ADMIN access!');
    } else {
      console.log('\n⚠️  This user is a regular USER (not admin)');
      console.log('\n💡 To promote to admin, run:');
      console.log(`   npm run promote-admin ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed to check user!');
    console.error('Error:', error instanceof Error ? error.message : error);
    console.error('\n💡 Make sure MongoDB is running.');
    process.exit(1);
  }
}

const email = process.argv[2];
checkUser(email);
