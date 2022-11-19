const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel')



const getTodos = asyncHandler(async (req,res)=>{
    const todos = await Todo.find({user:req.user.id});

    if(!todos){
        res.status(404).json({'message':'Todos not found'})
    }
    res.status(200).json(todos)
});

const singleTodo = asyncHandler(async(req,res)=>{
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(404).json({"message":"todo not found"})
    }

    if(!req.user){
        res.status(401).json({"message":"user not passed"})
    }

    if(todo.user.toString() !== req.user.id){
        res.status(401).json({"message":"user not passed"})
    }

    res.status(200).json(todo);
})

const createTodo = asyncHandler(async (req,res)=>{
    // const {name, todo} = req.body;
    if(!req.body.todoName){
        res.status(400)
        throw new Error('please add name');
    }

    const todo = await Todo.create({
        user:req.user.id,
        todoName:req.body.todoName,
        completed:req.body.completed
    })
    res.status(200).json({'message':`the todo is created`,todo})
});

const deleteTodo = asyncHandler(async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    
    if(!todo){
        throw new Error('todo not found')
    }
    
    if(todo.user.toString() !== req.user.id){
        res.status(401).json({"message":"not correct user"})
    }

    const deleteTodo = await Todo.findByIdAndDelete(req.params.id)

    res.status(200).json({'message':`the todo is deleted =${deleteTodo}`});
});

const editTodo = asyncHandler(async (req,res)=>{
    const todo = await Todo.findById(req.params.id)
    
    if(!todo){
        throw new Error('todo not found')
    }

    if(todo.user.toString() !== req.user.id){
        res.status(401).json({"message":"not correct User"})
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json({'message':`the todo is edited =${updatedTodo}`});
});

module.exports = {
    getTodos,createTodo,deleteTodo,editTodo,singleTodo
}