import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: ''
    },
    userName: {
        type: String,
        required: false
    }
})

export default mongoose.model('User', userSchema);