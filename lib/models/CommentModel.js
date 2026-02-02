import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.models.comment || mongoose.model("comment", Schema);

export default CommentModel;
