const mongoose = require('mongoose');
const {Schema} = mongoose;

const projectSchema = new Schema({
    ref: String,
    type: {
        B2B: Boolean,
        B2C: Boolean
    },
    area: {
        technology : Boolean,
        marketing : Boolean,
        commercial: Boolean
    },
    development_time: Number,
    cost: Number,
    gross_profit: Number
});

const Project = mongoose.model('projects',projectSchema);

module.exports = Project;