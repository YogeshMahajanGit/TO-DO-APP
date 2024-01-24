let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value !== "") {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    //IIFE
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  } else {
    msg.innerHTML = "Can not be blank";
  }
};

let data = [];

let acceptData = () => {
  data.push({
    title: textInput.value,
    date: dateInput.value,
    desc: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  displayData();
};

let displayData = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id="${y}">
        <span class="fw-bold">${x.title}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.desc}</p>

        <span class="options">
          <i onClick="updateTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="fas fa-edit"></i>
          <i onClick="deleteTask(this);displayData()" class="fas fa-trash-alt"></i>
        </span>
    </div>
  `);
  });

  resetForm();
};

let resetForm = () => {
  textInput.value = dateInput.value = textarea.value = "";
};

let deleteTask = (x) => {
  x.parentElement.parentElement.remove();

  data.splice(x.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let updateTask = (x) => {
  let selectedTask = x.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(x);
};

// run first
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  displayData();
})();
