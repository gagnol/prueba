import mongoose from 'mongoose';

export interface Comunicador {
  _id: any;
  name: string;
  email: string;
  sector: string;
  organization: string;
  specialization: string;
  experience: number;
  location: string;
  bio?: string;
}


const sliderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sector: { type: String, enum: ['empresarial', 'publico', 'ong', 'asociacion'], required: true },
    organization: { type: String, required: true },
    specialization: { type: String, enum: ['corporativa', 'crisis', 'digital', 'rse'], required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
  );

  const SliderModel =
  mongoose.models.Slider || mongoose.model('Slider', sliderSchema)
  export default SliderModel