const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Binary = require('mongodb').Binary;

const schema = {
    fileId: {
        sparse: true,
        type: String,
        unique: true
    },
    fileName: {
        type: String,
        require: [true, "File name is required"],
    },
    source: {
        type: String,
    },
    userId: {
        type: String,
    },
    type: {
        type: String,
    },
    size: {
        type: String
    }
};

const fileSchema = new Schema(schema, { timestamps: true })

fileSchema.set('toJSON', {
    transform: (doc, ret) => {
        let retJson = {
            fileId: ret._id,
            fileName: ret.fileName,
            userId: ret.userId,
            source: ret.source,
            type: ret.type,
            size: ret.size
        }
        return retJson
    }
});

mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('File', fileSchema, 'files');