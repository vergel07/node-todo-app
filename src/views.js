import { getFilters } from './filters'
import { toggleTodo, removeTodo, getTodos } from './todos'
import { get } from 'https';

// renderTodos
const renderTodos = () => {
    const todoElement = document.querySelector('#todo-list')
    const { searchText, hideCompleted } = getFilters()
    const filterTodo = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const searchCompletedMatch = !hideCompleted || !todo.completed
        return searchTextMatch && searchCompletedMatch
    })
    const getThingsTodo = filterTodo.filter((todos) => !todos.completed)

    todoElement.innerHTML = ''

    const summary = generateSummaryDOM(getThingsTodo)
    
    todoElement.appendChild(summary)

    if (filterTodo.length > 0) {
        filterTodo.forEach((listTodo) => {
            const listTodos = generateTodoDOM(listTodo)
            todoElement.appendChild(listTodos)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No to-dos to show'
        emptyMessage.classList.add('empty-message')
        todoElement.appendChild(emptyMessage)
    }
}

// generateTodoDOM
const generateTodoDOM = (listTodo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkEl = document.createElement('input')
    const spanEl = document.createElement('span')
    const buttonEl = document.createElement('button')

    // Setup the checkbox todo
    checkEl.setAttribute('type', 'checkbox')
    checkEl.checked = listTodo.completed
    containerEl.appendChild(checkEl)
    checkEl.addEventListener('change', () => {
        toggleTodo(listTodo.id)
        renderTodos()
    })

    // Setup the span for Todo text
    spanEl.textContent = listTodo.text
    containerEl.appendChild(spanEl)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    buttonEl.textContent = 'remove'
    buttonEl.classList.add('button', 'button--text')
    todoEl.appendChild(buttonEl)
    buttonEl.addEventListener('click', () => {
        removeTodo(listTodo.id)
        renderTodos()
    })

    return todoEl
}

// generateSummaryDOM
const generateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')   
    const pluralize = incompletedTodos.length === 1 ? '' : 's'

    summary.textContent = `You have ${incompletedTodos.length} todo${pluralize} left`
    return summary
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }