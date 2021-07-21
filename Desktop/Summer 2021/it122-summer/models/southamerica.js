import mongoose from 'mongoose';
const { Schema } = mongoose;
import {connectionString} from "../lib/credentials.js";

mongoose.connect(connectionString, {
    dbName: 'SCC_Project',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const countrySchema = new Schema({
 country: { type: String, required: true },
 population: Number,
 capital: String,
 currency: String,
//  inStore: Boolean
});

// export const Book = mongoose.model('Book', bookSchema);
export const Country = mongoose.model('Country', countrySchema, 'countries');