import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['Teacher', 'Student'] },
    country: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    profilePhoto: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

export default User;
