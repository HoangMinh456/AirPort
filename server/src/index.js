import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';
import User from './models/User.js';
import MemberCard from './models/MemberCard.js';
import TicketPlan from './models/TicketPlan.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB lỗi kết nối: ', err));

let OTP_STORE = {}

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

const transporter = nodemailer.createTransport({
    service: 'gmail', // hoặc tùy nhà cung cấp email bạn dùng
    auth: {
        user: process.env.EMAIL_USER,      // Email gửi đi, set trong .env
        pass: process.env.EMAIL_PASSWORD,  // Mật khẩu ứng dụng (app password) hoặc mật khẩu email
    },
});

// Hàm tạo mã khách hàng
function generateECode() {
    let code = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex]
    }
    return code
}

// console.log(generateECode())

//Nhập đường dẫn API trên điện thoại để kiểm tra xem server có hoạt động không
app.get('/', (req, res) => {
    res.send('Server đang hoạt động');
});


//START auth và OTP
app.post('/send-otp', async (req, res) => {
    const { email } = req.body
    try {
        const otp = generateOTP();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        OTP_STORE[email] = { otp: otp, expiresAt: expiresAt }

        await transporter.sendMail({
            from: `"OTP Service" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Mã OTP',
            text: `Mã OTP của bạn là: ${otp}`
        })

        res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const data = OTP_STORE[email];

    try {
        if (!data) {
            return res.status(400).json({ message: 'Chưa gửi mã OTP hoặc sai email' })
        }

        if (data.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Mã OTP đã hết hạn' })
        }

        if (data.otp !== otp) {
            // console.log('Chạy vào OTP không chính xác')
            return res.status(400).json({ message: 'Mã OTP không chính xác' })
        }

        //Xác thực thành công
        delete OTP_STORE[email];
        return res.json({ success: true, message: 'Xác thực thành công' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

app.post('/create-account', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await User.create({ email: email, password: password, userName: email })
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await User.findOne({ email: email, password: password });

        if (!getUser) return res.status(400).json({ message: 'Không tìm thấy tài khoản' });

        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.post('/getUserByEmail', async (req, res) => {
    const { email } = req.body;
    try {
        const response = await User.findOne({ email: email })

        if (!response) return res.status(400).json({ message: 'Email chưa được đăng ký với bất kì tài khoản nào' })

        const otp = generateOTP();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        OTP_STORE[email] = { otp: otp, expiresAt: expiresAt }

        await transporter.sendMail({
            from: `"OTP Service" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Mã OTP',
            text: `Mã OTP của bạn là: ${otp}`
        })

        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.post('/changePassword', async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await User.findOne({ email: email })

        if (!getUser) return res.status(400).json({ message: 'Không tìm thấy tài khoản để đổi mật khẩu' })

        // console.log(getUser)
        getUser.password = password;

        await getUser.save();

        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})
// END auth-OTP

//START memberCard
app.post('/createMemberCard', async (req, res) => {
    const { userId } = req.body;
    let code = '';
    let isUnique = false;

    while (!isUnique) {
        code = generateECode()
        const exis = await MemberCard.findOne({ eCode: code })
        if (!exis) {
            isUnique = true
        }
    }

    try {
        const response = await MemberCard.create({ userId: userId, eCode: code })

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.get('/getMemberCardByECode/:eCode', async (req, res) => {
    const { eCode } = req.params;
    try {
        const response = await MemberCard.findOne({ eCode: eCode }).populate('userId')

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})
//END memberCard

//START ticketPlan
app.post('/createTicketPlan', async (req, res) => {
    const { userId, userUse, otherUse, userTicket, otherTicket, signature } = req.body;
    try {
        const response = await TicketPlan.create({ userId: userId, userUse: userUse, otherUse: otherUse, userTicket: userTicket, otherTicket: otherTicket, signature: signature });

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})
//END ticketPlan

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});