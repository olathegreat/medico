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
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id) as UserDocument | null;
  if (!freshUser) {
    return next(new Error('The user belonging to this token no longer exists'));
  }

  // 4) Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new Error('User recently changed password! Please log in again'));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
};
