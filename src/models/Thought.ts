import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    username: string,
    reactions: Schema.Types.ObjectId[],
    createdAt: Date,
}

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

// Create a reaction schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            //get: (timestamp: Date) => new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/New_York' }),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            //get: (timestamp: Date) => timestamp.toLocaleString( ),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ reactionSchema ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;