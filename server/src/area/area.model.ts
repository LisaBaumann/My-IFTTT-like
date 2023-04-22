import * as mongoose from 'mongoose'

const actionSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    parameters: {}
});

const reactionSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    parameters: {}
});

export const AreaSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    action: actionSchema,
    reactions: [reactionSchema]
}, {
    timestamps: true
  });