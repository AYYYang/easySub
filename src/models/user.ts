import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 13;
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    fistName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});


// hashing password for security: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre<IUser>('save', function (next) {
    const user = this;

// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

// generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword: string, cb:any): void {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


