import mongoose from "mongoose"

const TicketPlan = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeUsed: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    userUse: {
        type: Number,
        required: true,
    },
    otherUse: {
        type: Number,
        required: false,
        default: 0
    },
    userTicket: {
        type: String,
        required: true
    },
    otherTicket: {
        type: [String],
        required: false,
        default: []
    },
    signature: {
        type: String,
        required: true
    },
    adminConfirm: {
        type: Boolean,
        required: true,
        default: false
    },
    typeTicket: {
        type: String,
        enum: ['Business', 'Regular'], //Thương gia và phổ thông
        default: undefined
    }
})

export default mongoose.model('TicketPlan', TicketPlan)