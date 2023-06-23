const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    admin: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

// const ROLES = {
//     ADMIN: "ADMIN",
//     SUPERVISOR: "SUPERVISOR"
// }

const User = mongoose.model("user", UserSchema);

module.exports = User;
// module.exports = ROLES;