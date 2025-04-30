import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, name, password } = data;
    
    const filePath = path.join(process.cwd(), 'user_data.txt');
    const timestamp = new Date().toISOString();
    const dataToWrite = `
--- New User Registration ---
Timestamp: ${timestamp}
Email: ${email}
${name ? `Name: ${name}` : ''}
Password: ${password}
----------------------------------------
`;
    
    // Append to file
    fs.appendFileSync(filePath, dataToWrite);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ success: false, error: 'Failed to save user data' }, { status: 500 });
  }
} 