// DOM 요소를 선택해야합니다.
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let tasks = []; // 배열 값은 변경될 수 있기 때문에 const -> let

// addButton이 클릭되면 이벤트가 발생하는 리스너를 추가해주세요.
addButton.addEventListener('click', addTask);

// addTask 함수를 만듭니다.
function addTask() {
  // 인풋창에 입력된 텍스트가 있어야 합니다. taskText
  const taskText = taskInput.value.trim();
  // 텍스트가 없는 상황을 제외
  if (taskText !== '') {
    // 태스크 아이템을 만드는 함수
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    tasks.push(taskText); // 배열에 추가
    saveTask(tasks); // 로컬 저장소에 저장
    taskInput.value = '';
  }
}

// 리스트 (Todo) 생성 함수 선언
function createTaskItem(taskText) {
  // li태그를 생성하여 taskItem 변수를 지정.
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  taskItem.addEventListener('click', completeTask);

  // 버튼 태그 생성
  const removeButton = document.createElement('button');
  removeButton.textContent = '❌'; // x
  removeButton.addEventListener('click', removeTask);
  taskItem.appendChild(removeButton);
  return taskItem;
}

// 할 일 완료 함수
function completeTask(event) {
  const taskItem = event.target.closest('li'); // 가장 가까운 oo 태그를 찾아라.
  taskItem.classList.toggle('completed');
}

// 할 일 지우기 함수
function removeTask(event) {
  const taskItem = event.target.closest('li');
  // 로컬 저장소 remove 구현
  const taskText = taskItem.textContent.split('❌')[0];
  const index = tasks.indexOf(taskText);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTask(tasks);
  }
  taskItem.parentNode.removeChild(taskItem);
}

// 로컬 저장소에 저장하기 saveTask()
function saveTask(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 로컬 저장소에서 불러오기 loadTask()
function loadTask() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    // 로컬저장소에 tasks가 있는 경우만 실행
    tasks = JSON.parse(savedTasks);
    for (let i = 0; i < tasks.length; i++) {
      const taskItem = createTaskItem(tasks[i]);
      taskList.appendChild(taskItem);
    }
  }
}

// 창이 새로고침이나, 처음 로딩되었을 때, 불러오기를 실행.
window.addEventListener('load', loadTask);
