const form = document.querySelector("form")
const taskList = document.querySelector(".uk-list")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector(".filter")
const taskInput = document.querySelector("form > input")

const loadEventListeners = () => {
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener("submit", addTask)
  taskList.addEventListener("click", removeTask)
  clearBtn.addEventListener("click", clearTasks)
  filter.addEventListener("keyup", filterTasks)

}

const getTasks = () => {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach((curr) => {
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(curr))
    const link = document.createElement("a")
    link.className = "delete-item uk-align-right"
    const icon = document.createElement("i")
    icon.className = "fa fa-remove"
    link.appendChild(icon)
    li.appendChild(link)
    taskList.appendChild(li)
  })
}

const addTask = (e) => {
  //Prevent Regresh

  e.preventDefault()

  //Conditional to check if empty

  if (taskInput.value == "") {
    alert("Add a task")
  } else {
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(taskInput.value))
    const link = document.createElement("a")
    link.className = "delete-item uk-align-right"
    const icon = document.createElement("i")
    icon.className = "fa fa-remove"
    link.appendChild(icon)
    li.appendChild(link)
    taskList.appendChild(li)

    //Store in LS

    storeTaskInLS(taskInput.value);

    taskInput.value = ""
  }
}

const storeTaskInLS = (task) => {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


const removeTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You sure?")) {
      e.target.parentElement.parentElement.remove()
      // Remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement)
    }
  }
}

const removeTaskFromLS = (taskItem) => {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((curr, index) => {
    if(taskItem.textContent === curr)
    tasks.splice(index, 1)
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


const clearTasks = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  // Clear from LS

  clearTasksFromLS()
}

const clearTasksFromLS = () => {
  localStorage.clear()
}

const filterTasks = (e) => {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll("li").forEach((curr) => {
    const item = curr.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      curr.style.display = "block"
    } else {
      curr.style.display = "none"
    }
  })
}

loadEventListeners()
