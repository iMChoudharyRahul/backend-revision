import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Mongoose Middleware: Pre save hook to hash the user password
 */
// userSchema.pre("save", async (next)=> {
//     //If password not modified then skip hashing
//     if(!this.isModified("password")) return next();
//  // hash the password with using bcrypt(10 round encryption)
//  this.password = bcrypt.hash(this.password, 10);
//   next();
// });

// Mongoose Middleware: Pre-save hook to hash the user's password before saving
userSchema.pre("save", async function (next) {
  // If password not modified, skip hashing
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt (10 rounds of encryption)
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Mongoose Method(Function): Compare a given password with the stored one
 * @param {*} password
 */
userSchema.methods.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
