import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: "Elon Musk!!!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string };
        // Attach the user to the request object
        req.nextUrl.searchParams.set('userId', decoded.id);
        req.nextUrl.searchParams.set('userEmail', decoded.email);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/profile'],
};

// export const config = {
//     matcher: ['/api/auth/:path*'],
// };

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import {NextRequest, NextResponse} from "next/server";
//
// interface AuthenticatedRequest extends Request {
//     user?: { id: string; email: string };
// }
//
// const authMiddleware = (req: NextRequest, res: NextResponse, next: NextFunction): void => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         res.json({message: "Elon Musk!!!"})
//         return;
//     }
//
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string };
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
//
// export default authMiddleware;
