import mongoose from "mongoose"
import { 
    compareValues, 
    hashValue 
} from "../utils/bcrypt.util.js"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        select: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    currentWorkspace: {
        type: mongoose.Types.ObjectId,
        ref: "Workspace"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password") && this.password) {
        this.password = await hashValue(this.password)
    }
    next()
})

// // Remove password from user object before sending response
// userSchema.methods.omitPassword = function () {
//     const userObject = this.toObject()
//     delete userObject.password
//     return userObject
// };

// Compare hashed password
userSchema.methods.comparePassword = async function (value) {
    return compareValues(value, this.password)
}
const UserModel = mongoose.models.User ||  mongoose.model("User", userSchema)
export default UserModel