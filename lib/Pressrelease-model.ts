import mongoose from 'mongoose';

// Define the Review Schema
const reviewSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    subject: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 }, // Optional: limit rating to 0-5
    review: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Define the PressRelease Schema
const pressReleaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
    },
    content: {
      type: String,
      required: [true, 'El contenido es obligatorio'],
    },
    mediaType: {
      type: String,
      enum: ['Prensa', 'Televisión', 'Radio', 'Digital'],
      required: true,
    },
    topic: {
      type: String,
      enum: [
        'Política', 'Economía', 'Sociedad', 'Internacionales', 'Deportes',
        'Espectáculos', 'Culturales', 'Eventos'
      ],
      required: true,
    },
    location: {
      type: String,
      enum: [
        "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
        "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
        "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
        "Santiago del Estero", "Tierra del Fuego", "Tucumán",
        "Ciudad Autónoma de Buenos Aires"
      ],
      required: true,
    },
    reach: {
      type: String,
      enum: ['Pequeno', 'Mediano', 'Grande'],
      required: true,
    },
    distributionDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['Borrador', 'scheduled', 'Enviado'],
      default: 'Enviado',
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
    },
    image: {
      type: String,
      required: false,
    },
    rating: { type: Number, required: false, default: 0 },
    likes: [{ user: { type: String, required: false } }],
    reviews: [reviewSchema],
    
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Export the PressRelease model
const PressRelease = mongoose.models.PressRelease || mongoose.model('PressRelease', pressReleaseSchema);
export default PressRelease;
