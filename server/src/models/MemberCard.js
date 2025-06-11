import mongoose from "mongoose"

const MemberCard = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eCode: {
        type: String,
        unique: true,
        required: true
    },
    totalUse: {
        type: Number,
        required: true,
        default: 0
    },
    totalUsed: {
        type: Number,
        required: true,
        default: 0
    },
    userRemain: {
        type: Number,
        required: true,
        default: 0
    },
    otherRemain: {
        type: Number,
        required: true,
        default: 0
    }
})

export default mongoose.model('MemberCard', MemberCard)