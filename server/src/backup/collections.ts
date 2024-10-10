import mongoose from 'mongoose';
import fs from 'fs';
import path, { dirname } from 'path';
import { createConnection, closeConnection } from '../connection/database.connection';
import { fileURLToPath } from 'url';

interface ExportedData {
  [key: string]: any[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

async function exportAllCollections() {
  try {
    await createConnection();
    const database = mongoose.connection.db;
    
    if (!database) {
      throw new Error('Cant connect to the database');
    }

    const collections = await database.collections();
    const data: ExportedData = {};

    for (const collection of collections) {
      const name = collection.collectionName;
      const documents = await collection.find({}).toArray();
      data[name] = documents;
      console.log(`Collection exported: ${name} with ${documents.length} documents`);
    }

    const filePath = path.join(__dirname, '../backup/collections/collectionsBackup.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data exported successfuly to ${filePath}`);
  } catch (error) {
    console.error('Error exporting the collections:', error);
  } finally {
    await closeConnection();
  }
}

exportAllCollections();
