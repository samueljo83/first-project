document.addEventListener("DOMContentLoaded", function () {
  let taskInput = document.getElementById("input-box");
  let addButton = document.getElementById("add-button");
  let taskBoard = document.getElementById("task-board");
  let tabs = document.querySelectorAll(".task-tabs div");
  let taskList = [];

  addButton.addEventListener("click", addTask);
  taskBoard.addEventListener("click", handleButtonClick);

  for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
      filter(event);
    });
  }

  function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
      taskList.push({ text: taskText, checked: false });
      render();
      taskInput.value = ""; // Clear input field
    } else {
      alert("할 일을 타이핑 해주세요");
    }
  }

  function handleButtonClick(event) {
    if (event.target.tagName === "BUTTON") {
      let action = event.target.textContent.toLowerCase();
      let taskIndex = event.target.parentNode.parentNode.dataset.index;
      if (action === "check") {
        // Toggle the checked property
        taskList[taskIndex].checked = !taskList[taskIndex].checked;
        render();
      } else if (action === "delete") {
        // Implement delete functionality
        taskList.splice(taskIndex, 1);
        render();
      }
    }
  }

  function filter(event) {
    let mode = event.target.id;
    if (mode === "all") {
      console.log(taskList);
      render(taskList); // Render all tasks
    } else if (mode === "onGoing") {
      let filterList = taskList.filter((task) => !task.checked); // Filter unchecked tasks
      render(filterList);
    } else if (mode === "completed") {
      let filterList = taskList.filter((task) => task.checked); // Filter checked tasks
      render(filterList);
    }
  }

  function render(tasks = taskList) {
    let resultHTML = "";
    tasks.forEach((task, index) => {
      let taskClass = task.checked ? "task checked" : "task";
      let taskText = task.checked ? `<s>${task.text}</s>` : task.text;
      resultHTML += `
        <div class="${taskClass}" data-index="${index}">
          <div>${taskText}</div>
          <div>
            <button>Check</button>
            <button>Delete</button>
          </div>
        </div>`;
    });
    taskBoard.innerHTML = resultHTML;
  }
});
