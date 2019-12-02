import { model, Schema } from 'mongoose';

const schema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = model('User', schema);

export default User;