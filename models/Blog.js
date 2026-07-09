const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    viewedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);