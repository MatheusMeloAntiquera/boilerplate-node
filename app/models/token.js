import { model, Schema } from 'mongoose';

const schema = new Schema({
    access_token_id:{
        type: String
    },
    revoked: {
        type: Boolean,
        default: false,
    },
});

const Token = model('Token', schema);

export default Token;