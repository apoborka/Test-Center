import models from '../models/index.js';
import db from '../config/connection.js';
export default async (modelName, collectionName) => {
    try {
        const model = models[modelName];
        if (!model || !model.db?.db) {
            throw new Error(`Model or database connection is undefined for ${modelName}`);
        }
        const modelExists = await model.db.db.listCollections({
            name: collectionName,
        }).toArray();
        if (modelExists.length) {
            await db.dropCollection(collectionName);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error cleaning database: ${err.message}`);
        }
        else {
            console.error('An unknown error occurred while cleaning the database.');
        }
        throw err;
    }
};
