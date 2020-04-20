const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = {
    fileId: {
        sparse: true,
        type: String,
        unique: true
    },
    length: {
        type: String
    },
    fileName: {
        type: String,
        require: [true, "File name is required"],
    },
    uploadDate: {
        type: Date
    },
    userId: {
        type: String,
    },
};

const fileSchema = new Schema(schema, { timestamps: true })

fileSchema.set('toJSON', {
    transform: (doc, ret) => {
        let retJson = {
            fileId: ret._id,
            length: ret.length,
            fileName: ret.fileName,
            uploadDate: ret.date, 
            userId: ret.userId
        }
        return retJson
    }
});

mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('File', fileSchema, 'files');