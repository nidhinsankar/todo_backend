const express = require('express')
const { getTodos,createTodo,editTodo,deleteTodo, singleTodo} = require('../Controller/todoController')
const protect = require('../middlewares/auth')
const router = express.Router();

//http://localhost:5000/api/todos/

router.get('/',protect,getTodos); 


router.post('/',protect,createTodo);

router.delete('/:id',protect,deleteTodo);

router.put('/:id',protect,editTodo);

router.get('/:id',protect,singleTodo)

module.exports = router;

