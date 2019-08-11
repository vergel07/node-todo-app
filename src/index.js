import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters'
import { renderTodos } from './views'

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-todo').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.todoText.value.trim()
    if (text.length > 0 ){
        createTodo(text)
        renderTodos()
        e.target.elements.todoText.value = ''
    } 
})

// Add Syncing Data Across Pages
window.addEventListener('storage', (e) => {
    if (e.key === 'todos'){
        loadTodos()
        renderTodos()
    }
})