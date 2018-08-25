const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    articleTitle: {
        type: String,
        required: [true, 'article title is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    article: {
        type: String,
        required: [true, 'article is required']
    },
    author: {
        type: String,
        required: [true, 'article is required']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'date is required']
    },
    comments: [{
        comment: String,
        date: Date,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    tags: [{
        type: String,
        required: [true, 'tags is required']
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article