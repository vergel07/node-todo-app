import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

// loadTodos
const loadTodos = () => {
    const todoJSON = localStorage.getItem('todos')

    try {
        todos = todoJSON ? JSON.parse(todoJSON) : []
    } catch (error) {
        todos = []
    }
}

// saveTodos
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
const getTodos = () => todos

// createTodo
const createTodo = (text) => {
    const id = uuidv4()
    todos.push({
        id: id,
        text: text,
        completed: false
    })
    saveTodos()
}

// removeTodo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id )

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// toggleTodo
const toggleTodo = (id) => {
    const todoFind = todos.find((todo) => todo.id === id)

    if (todoFind) {
        todoFind.completed = !todoFind.completed
        saveTodos()
    }
}

loadTodos()

// Make sure to call loadTodos and setup the exports
export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }