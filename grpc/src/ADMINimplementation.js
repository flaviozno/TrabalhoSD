const Admin = require('./models/Admin')
const User = require('./models/User')
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async GenerateUserID(call, callback) {
        const { email } = call.request;

        const response = await User.find({ email: email })

        if (response.length !== 0) {
            return callback(null, { error: 'This user email already exists' });
        } else {
            const id = uuidv4()
            return callback(null, { id: id })
        }
    },
    async RegisterAdminRequest(call, callback) {
        const { email, username, password } = call.request.admin;

        if (email) {
            const response = await Admin.find({ email: email });
            if (response.length !== 0) {
                return callback(null, { error: 'This email already exists' });
            }
            else {
                const admin = await Admin.create({ email, username, password })

                return callback(null, { admin: { ...admin.toObject(), id: admin._id } });
            }
        }
    },
    async GetAdminByIdRequest(call, callback) {
        const { id } = call.request;

        const admin = await Admin.findById(id);

        if (!admin) {
            return callback(null, { error: 'Admin not found' });
        }

        return callback(null, {
            admin: { ...admin.toObject(), id: admin._id, password: undefined },
        });
    },
    async DeleteUser(call, callback) {
        const email = call.request.email;
        
        const data = await User.find({email: email})

        await User.findOneAndRemove({email: email })
        
        if (data.length !== 0)
            return callback(null, { message: "User has been deleted" })
        else
            return callback(null, { message: "User not found" })
    }
}