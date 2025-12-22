import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
},{timestamps: true});
userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
};
export const user = mongoose.model('user', userSchema);