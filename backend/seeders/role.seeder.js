import "dotenv/config"
import connectMongoDb from "../config/mongo.config.js"
import RoleModel from "../models/roles.model.js"
import { RolePermissions } from "../utils/rolesPermissions.util.js"
const seedRoles = async () => {
    console.log('Seeding Roles started ...')
    try {
        await connectMongoDb()
        console.log('Clearing Existing roles')
        await RoleModel.deleteMany()
        for (const roleName of Object.keys(RolePermissions)) {
            const permissions = RolePermissions[roleName]
            // const existingRole = await RoleModel.findOne({ name: roleName })
            // if (!existingRole) {
            const newRole = new RoleModel({
                name: roleName,
                permissions: permissions
            })
            await newRole.save()
            console.log(`Role = ${roleName} added with permissions = ${permissions}`);
            // } else {
                // console.log(`Role = ${roleName} already exists`);
            // }
        }
        console.log('Seeding completed successfully.')
        process.exit(1)
    } catch (error) {
        console.error('Error during seeding: ', error)
        process.exit(1)
    }
}
seedRoles().catch((error) => {
    console.error('Error during running seed script: ', error)
})