// Todo 애플리케이션 JavaScript 코드

// DOM 요소 참조
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedButton = document.getElementById('clearCompleted');
const filterButtons = document.querySelectorAll('.filter-btn');

// 할 일 데이터 관리
let tasks = [];
let currentFilter = 'all';

// 로컬 스토리지에서 할 일 불러오기
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// 로컬 스토리지에 할 일 저장
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 할 일 추가
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('할 일을 입력해주세요.');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    taskInput.focus();
}

// 할 일 삭제
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// 할 일 완료 상태 토글
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

// 완료된 할 일 모두 삭제
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// 현재 필터에 맞는 할 일 가져오기
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// 필터 변경
function changeFilter(filter) {
    currentFilter = filter;
    
    // 활성화된 필터 버튼 스타일 변경
    filterButtons.forEach(button => {
        if (button.dataset.filter === filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    renderTasks();
}

// 할 일 목록 렌더링
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    // 할 일 목록 비우기
    taskList.innerHTML = '';
    
    // 할 일 항목 생성 및 추가
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = task.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'todo-delete';
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        
        taskList.appendChild(li);
    });
    
    // 할 일 개수 업데이트
    updateTaskCount();
}

// 할 일 개수 업데이트
function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${activeTasks}개의 할 일`;
}

// 이벤트 리스너 등록
function setupEventListeners() {
    // 할 일 추가 버튼 클릭 시
    addButton.addEventListener('click', addTask);
    
    // 입력 필드에서 엔터 키 누를 때
    taskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // 완료된 항목 삭제 버튼
    clearCompletedButton.addEventListener('click', clearCompletedTasks);
    
    // 필터 버튼
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            changeFilter(button.dataset.filter);
        });
    });
}

// 애플리케이션 초기화
function init() {
    loadTasks();
    setupEventListeners();
}

// 애플리케이션 시작
init(); 