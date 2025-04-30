import fs from 'fs';
import path from 'path';

export const saveUserData = async (userData: { email: string; name?: string; timestamp: string }) => {
  try {
    const filePath = path.join(process.cwd(), 'user_data.txt');
    const dataToWrite = `\n--- New User Registration ---\nTimestamp: ${userData.timestamp}\nEmail: ${userData.email}${userData.name ? `\nName: ${userData.name}` : ''}\n`;
    
    // Append to file
    fs.appendFileSync(filePath, dataToWrite);
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
}; 