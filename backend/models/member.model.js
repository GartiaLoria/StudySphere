import mongoose from "mongoose"
const memberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})
const MemberModel = mongoose.models.Member || mongoose.model('Member', memberSchema)
export default MemberModel