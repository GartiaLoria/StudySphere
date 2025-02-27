import mongoose from "mongoose"
import { RolePermissions } from "../utils/rolesPermissions.util.js"
import { 
    Roles, 
    Permissions 
} from "../enums/roles.enum.js"
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: Object.values(Roles),
        required: true,
        unique: true
    },
    permissions: {
        type: [String],
        enum: Object.values(Permissions),
        required: true,
        default: function () {
            return RolePermissions[this.name] || [];
        }
    }
}, { 
    timestamps: true 
})
const RoleModel = mongoose.models.Role || mongoose.model("Role", roleSchema)
export default RoleModel
