import { sql } from '@vercel/postgres';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
  try {
    // Read the schema file
    const schemaPath = join(__dirname, '..', 'src', 'app', 'db', 'schema.sql');
    const schema = await readFile(schemaPath, 'utf8');
    
    // Execute the schema
    await sql.query(schema);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 