const mongoose  =  require('mongoose')

const callSchema =   new mongoose.Schema({
    clientId : { 
        type : mongoose.Schema.Types.ObjectId , 
         ref:'User'
        },
    date:{
        type:String, // yyyy-mm-dd
        required:true
    },
    time:{
        type:String , 
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    recurring:{
        type:Boolean,
    default:false,
    },
    dayOfWeek:{
        type:Number,
        min:0, max:6
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Call =  mongoose.model('Call' , callSchema);

module.exports =  Call ;