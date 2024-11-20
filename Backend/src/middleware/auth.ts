import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/UserModel';
 
interface DecodedToken {
  id: string;
  iat: number;
}
  

// Extend the Request interface to include `user` with the correct type.
interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new Error('You are not logged in! Please log in to get access'));
    
  }

  // 2) Verification token


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) throw new Error('User no longer exists');
    if (freshUser.changedPasswordAfter(decoded.iat)) throw new Error('Password recently changed');
    req.user = freshUser;
    next();
} catch (error:any) {
    res.status(401).json({ message: error.message || 'Unauthorized' });
}

};



