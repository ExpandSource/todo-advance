// DOM 요소를 선택해야합니다.
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

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
  removeButton.textContent = 'x'; // x❌
  removeButton.addEventListener('click', removeTask);
  taskItem.appendChild(removeButton);
  return taskItem;
}

// 할 일 완료 함수
function completeTask() {}

// remove task function
function removeTask() {}
