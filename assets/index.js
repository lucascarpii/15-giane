import {
  saveTask,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");

let editStatus = false;
let editingId = "";

function copyLink(link) {
  let estructura = `https://tamnora.com/index.html?idin=${link}`;
  navigator.clipboard
    .writeText(estructura)
    .then(() => console.log(`${link} Copiado al portapapeles`));
}

window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    let cantTotalInvitados = querySnapshot.docs.length;
    let html = `
        <h2>Lista de invitados, total: ${cantTotalInvitados}</h2>
        `;
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `
      <div class="task">
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
        </div>
        <div>
          <button class="btn-delete" data-id="${doc.id}"> Eliminar </button>
          <button class="btn-edit" data-id="${doc.id}"> Editar </button>
          <button class="btn-link" data-id="${doc.id}"> Link </button>
        </div>
      </div>
    `;
    });

    tasksContainer.innerHTML = html;

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id);
        const task = doc.data();

        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        editingId = dataset.id;

        taskForm["btn-task-save"].innerText = "Actualizar";
        taskForm["btn-task-save"].classList.toggle("editing");
      });
    });

    const btnsLink = tasksContainer.querySelectorAll(".btn-link");
    btnsLink.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        copyLink(dataset.id);
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"),3000);
      });
    });
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!editStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(editingId, {
      title: title.value,
      description: description.value,
    });
    editStatus = false;
    taskForm["btn-task-save"].innerText = "Guardar";
    taskForm["btn-task-save"].classList.toggle("editing");
  }

  taskForm.reset();
});
