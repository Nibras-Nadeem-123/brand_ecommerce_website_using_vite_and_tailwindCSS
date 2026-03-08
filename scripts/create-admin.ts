/**
 * Create admin user script
 * Run with: npx tsx scripts/create-admin.ts <email> <password>
 */

import { dbConnect } from '../src/lib/mongodb';
import User from '../src/models/User';

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('✅ Connected to database');

    const email = process.argv[2] || 'admin@brand.com';
    const password = process.argv[3] || 'admin123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('   Email:', email);
      process.exit(0);
    }

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: email,
      password: password,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('\n🌐 Login at: http://localhost:3000/login');
    console.log('\n⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed to create admin!');
    console.error('Error:', error instanceof Error ? error.message : error);
    console.error('\n💡 Make sure MongoDB is running.');
    process.exit(1);
  }
}

createAdmin();
