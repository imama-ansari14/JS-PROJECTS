const addbtn = document.querySelector(".add-btn");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");

// 🧠 Prevent form reload + support Enter key
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    addbtn.click();
});

// Function to update task count
function updateTaskCount() {
    const allTasks = taskList.querySelectorAll(".task-item");
    const emptyText = taskList.querySelector(".empty-text"); // select fresh
    let taskCount = 0;

    allTasks.forEach(task => {
        const text = task.querySelector(".task-text").textContent.trim();
        if (text !== "Example Task") taskCount++;
    });

    if (taskCount === 0) {
        emptyText.textContent = "No tasks yet! Add your first one 🌟";
    } else {
        emptyText.textContent = `You have ${taskCount} task${taskCount > 1 ? "s" : ""} 🤗`;
    }
}

// ADD NEW TASKS
addbtn.addEventListener("click", function () {
    const value = taskInput.value.trim();
    if (!value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a task!',
        });
        return;
    }

    taskList.innerHTML += `
            <div class="task-item">
                <input type="checkbox" class="form-check-input" />
                <p class="task-text">${value}</p>
                <div class="task-btns">
                    <button class="edit-btn border border-secondary mx-2 rounded-2"><i class="bi bi-pencil"></i></button>
                    <button class="delete-btn border border-secondary mx-2 rounded-2"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `;

    Swal.fire({
        icon: 'success',
        title: 'Task Added!',
        text: `Your task "${value}" has been added.`,
        showConfirmButton: false,
        timer: 1500
    });

    taskInput.value = "";
    updateTaskCount();
});

// EVENT DELEGATION FOR EDIT & DELETE
taskList.addEventListener("click", function (e) {
    const taskItem = e.target.closest(".task-item");
    if (!taskItem) return;

    // DELETE
    if (e.target.closest(".delete-btn")) {
        taskItem.remove();
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Task has been deleted.',
            showConfirmButton: false,
            timer: 1200
        });
        updateTaskCount();
    }

    // EDIT
    if (e.target.closest(".edit-btn")) {
        const taskText = taskItem.querySelector(".task-text");
        Swal.fire({
            title: 'Edit your task',
            input: 'text',
            inputValue: taskText.textContent,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value.trim()) return 'Task cannot be empty!';
            }
        }).then((result) => {
            if (result.isConfirmed) {
                taskText.textContent = result.value;
                Swal.fire({
                    icon: 'success',
                    title: 'Edited!',
                    text: 'Task has been updated.',
                    showConfirmButton: false,
                    timer: 1200
                });
                updateTaskCount();
            }
        });
    }
});

// Initial count
updateTaskCount();