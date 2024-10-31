import { Schema, model, models } from 'mongoose';

export interface Periodista {
  _id: any;
  name: string;
  email: string;
  topics: string[];
  mediaName: string;
  mediaType: 'prensa' | 'television' | 'radio' | 'digital';
  location: string;
  bio?: string;
}

// Define the Periodista schema
const PeriodistaSchema = new Schema({
  
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  topics: { type: [String], required: true }, // Array of topics
  mediaName: { type: String, required: true },
  mediaType: { type: String, required: true, enum: ['prensa', 'television', 'radio', 'digital'] },
  location: { type: String, required: true },
  bio: { type: String }, // Optional field
}, { timestamps: true });

// Create the model or get the existing one
const PeriodistaModel = models.Periodista || model('Periodista', PeriodistaSchema);

export default PeriodistaModel;
