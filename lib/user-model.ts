import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    image: {type: String, required: false, default:"https://res.cloudinary.com/dps8xubee/image/upload/v1729251440/avatar/nyxxcnk27bz8mu5dh3ux.png"},
    token:{ type: String, required: true,default:'AAAEEE9' },
    tokenExpiration:{type:Date,required:false},
    address: { type: String, required: false ,default:""},
    city: { type: String, required: false,default:"" },
    postal:{type: String, required: false,default:""},
    country:{ type: String, required: false,default:"" },
    chats: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
      default: [],
    }
},
  {
    timestamps: true,
  }
  
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;