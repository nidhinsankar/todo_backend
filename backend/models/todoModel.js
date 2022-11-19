const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    todoName:{
        type:String,
        required:[true,'Please add a text value']
    },
    completed:{
        type:Boolean,
        required:true,
        default:false,
    }
},
{
    timestamps:true,
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;