// /models/Contact.ts
import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  subject: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
