var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


var ChildSchema = new Schema({
    name : {
        type : String, required: true
    },
    age : {
        type : Number, required: true  
    },
    gender : {
        type: String, 
        enum: ["זכר", "נקבה"]
    },
    hobbies : [{
       // enum: ["ספורט", "מוזיקה"]
       type: String
    }],
    verbal: Number,
    Independent: Number,
    address:{
        city: {
            type: String
        },
        street:{
            type: String 
        }
    }
});

    ChildSchema.set('autoIndex', true)
    module.exports = mongoose.model('Child', ChildSchema)

