import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
  balance: number;
  referrer: String;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, default: null },
    balance: { type: Number, required: true, default: 0 },
    isSubscribed: { type: Boolean, default: false },
    referrer: { type: String, default: null },
  },
  { timestamps: true },
);

// Helper function to generate a 6-character alphanumeric referral code
function generateReferralCode(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let referralCode = "";
  for (let i = 0; i < length; i++) {
    referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return referralCode;
}

// Middleware to generate referralCode
userSchema.pre<IUser>("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = generateReferralCode(6);
  }
  next();
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
