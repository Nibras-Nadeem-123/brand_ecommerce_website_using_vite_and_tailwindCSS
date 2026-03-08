/**
 * Promote a user to admin
 * Run with: npx tsx scripts/promote-admin.ts <email>
 */

import { dbConnect } from '../src/lib/mongodb';
import User from '../src/models/User';

async function promoteAdmin(email: string) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('✅ Connected to database');

    if (!email) {
      console.error('❌ Please provide an email address');
      console.error('Usage: npx tsx scripts/promote-admin.ts <email>');
      process.exit(1);
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`❌ No user found with email: ${email}`);
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`✅ User ${email} is already an admin!`);
      process.exit(0);
    }

    // Promote to admin
    user.role = 'admin';
    await user.save();

    console.log('✅ User promoted to admin successfully!');
    console.log(`\n📝 Admin credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: (your existing password)`);
    console.log(`\n🌐 Now you can access: http://localhost:3000/admin`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed to promote user!');
    console.error('Error:', error instanceof Error ? error.message : error);
    console.error('\n💡 Make sure MongoDB is running.');
    process.exit(1);
  }
}

// Get email from command line
const email = process.argv[2];
promoteAdmin(email);
