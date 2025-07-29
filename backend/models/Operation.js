import {Schema, model} from 'mongoose';

const Operation = new Schema({
    name: {type: String, unique: true, required: true},
    count: {type: String, unique: true, required: true},
    unit: {type: String, unique: true, required: true},
    id: {type: String, unique: true, required: true}
})

export default Operation;