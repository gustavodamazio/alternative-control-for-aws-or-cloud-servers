import bcrypt from 'bcryptjs';
import { Document } from 'mongoose';

import mongoose from '../../database/NoSQL/mongo';

export interface UserModel {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
    lastJwtGenRef: string; // Internal control to limit only the use of one jwt per login if necessary. It will not be implemented at the moment.
}

const UserSchema = new mongoose.Schema<UserModel>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    lastJwtGenRef: {
        type: String,
        select: false
    }
});

UserSchema.pre('save', async function (next) {
    const user = (this as any) as UserModel;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

export interface UserDocument extends Document, UserModel {}

export const User = mongoose.model<UserDocument>('User', UserSchema);
