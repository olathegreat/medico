import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import Admin, { AdminDocument } from "../models/AdminModel";
import Doctor, {DoctorDocument} from "../models/DoctorModel";

interface DecodedToken {
    id: string;
    iat: number;
}

interface AuthenticatedRequest extends Request {
    admin?: AdminDocument;
    doctor?: DoctorDocument;
}


export const adminAccess = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new Error('You are not logged in as admin, please do so'))
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        const freshAdmin = await Admin.findById(decoded.id);
        if (!freshAdmin) throw new Error('Admin no longer exists');
        if (freshAdmin.changedPasswordAfter(decoded.iat)) throw new Error('Password recently changed');
        req.admin = freshAdmin;
        next()
    }catch(error:any){
        res.status(401).json({ message: error.message || 'Unauthorized' });
    }
}

export const adminOrDoctorAccess = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new Error('You are not logged in as admin, please do so'))
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        const freshAdmin = await Admin.findById(decoded.id);
        const freshDoctor = await Doctor.findById(decoded.id);
        if (!freshAdmin && !freshDoctor) throw new Error('Admin or Doctor no longer exists');
        if (freshDoctor && freshDoctor.changedPasswordAfter(decoded.iat)) {
            throw new Error('Doctor password recently changed. Please log in again.');
        }
        if ( freshAdmin && freshAdmin.changedPasswordAfter(decoded.iat)) throw new Error('Password recently changed');
          if(freshAdmin){
            req.admin = freshAdmin;
          }
          if(freshDoctor){
            req.doctor = freshDoctor
          }
        
        next()
    }catch(error:any){
        res.status(401).json({ message: error.message || 'Unauthorized' });
    }
}



