/**
 * Create admin user script
 * Run with: npx tsx scripts/create-admin.ts
 */

import { dbConnect } from '../src/lib/mongodb';
import User from '../src/models/User';

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('✅ Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@brand.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('   Email: admin@brand.com');
      process.exit(0);
    }

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@brand.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: admin@brand.com');
    console.log('   Password: admin123');
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
