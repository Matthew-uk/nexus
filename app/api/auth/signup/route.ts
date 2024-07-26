import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        await connectToDatabase();
        const hashedPassword = await hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default handler;
