"use strict";
/****************************************AISHA ADEDIRAN******************************************************/

const pages = document.querySelectorAll(".page"); //get the class page from html file
const container = document.querySelector(".container"); //get class container from html file

function showPage(pageId) {
  // itirate through all pages and hide them when not selected
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // Show the selected page
  const selectedPage = document.getElementById(pageId);
  selectedPage.classList.add("active");

  // Sets container to scroll to the top
  container.scrollTop = 0;
}

// Shows the default page.
showPage("page1");

//once all content on the page has loaded, then execute the fuction
$(window).on("load", () => {
  let todoapp = JSON.parse(localStorage.getItem("todoapp")) || []; //retrives data from the local storage and converts it to javascript object.

  const name = $("#name");
  const todoform = $("#new-todo-form");
  const username = localStorage.getItem("username") || "";
  //gets username added to the local storage
  name.val(username); //and then assigns it to username

  name.on("change", (evt) => {
    localStorage.setItem("username", evt.target.value);
  }); // if name is changed then add new name to local storage.

  // code for writing out task
  todoform.on("submit", function (evt) {
    evt.preventDefault(); //prevent default of submit.

    const content = evt.target.elements.content.value.trim(); // remove unneccessary spaces from value
    const category = evt.target.elements.category.value;
    const calendar = evt.target.elements.category.value;
    const errormessage = $("<p>").css("color", "red");

    // to ensure empty tasks are not added to local storage
    if (content !== "") {
      const todo = {
        content: content,
        category: category,
        done: false,
        calendar: calendar,
      };

      todoapp.push(todo); //add task if not empty
      localStorage.setItem("todoapp", JSON.stringify(todoapp));
      errormessage.text("");
    } else {
      errormessage.text("Error message");
    }

    evt.target.reset();

    displaytodos();
  });

  displaytodos();
});

//function to display all task added in webpage
const displaytodos = () => {
  const todolist = $("#todo-list");

  todolist.empty(); //remove any element in the todolist as we will be creating all child elent in js.

  //to create and append elements to each task added.
  let todoapp = JSON.parse(localStorage.getItem("todoapp")) || [];
  todoapp.forEach((todo) => {
    const todoitem = $("<div>").addClass("todo-item");
    const totTask = todoapp.length;

    const countask = $("<div>");
    const label = $("<label>");
    const input = $("<input>")
      .attr("type", "checkbox")
      .prop("checked", todo.done);

    //add class attributes the variables
    const span = $("<span>").addClass("bubble");
    const content = $("<div>").addClass("todo-content");
    const actions = $("<div>").addClass("actions");
    //const date = $("<div>");//
    const calendar = $("<input>")
      .addClass("calendar")
      .attr("type", "date")
      .attr("name", "calendar")
      .val(todo.date);
    const edit = $("<button>").addClass("edit");
    const deletebtn = $("<button>").addClass("delete");
    const shell = $("<div>").addClass("shell");

    countask.text(`${totTask}`);
    const pg2body = $(".pg2body");
    span.addClass(todo.category);

    countask.addClass("number");
    content.addClass("todo-content");
    actions.addClass("actions");

    edit.html('<i class="fa-regular fa-pen-to-square"></i>');

    deletebtn.html("<i class='fas fa-trash'></i>");

    content.html(`<input type="text" value= "${todo.content}" readonly>`);
    //append attributes to the right elements
    label.append(input);
    label.append(span);
    actions.append(calendar);
    actions.append(edit);
    actions.append(deletebtn);
    todoitem.append(label);
    todoitem.append(content);
    todoitem.append(actions);
    todolist.append(todoitem);
    pg2body.append(shell);

    //this is a click event listener for edit.
    edit.on("click", (e) => {
      const input = content.find("input"); //when clicked finds the input field to be edited
      input.removeAttr("readonly"); //and then removes the readonly attribute assigned to input
      input.focus(); //and then adds focus for the user to be able to type.
      input.on("blur", (e) => {
        //and when the user clicks outside the input, the blur is triggered
        input.attr("readonly", true); //and readonly is assigned back to input
        todo.content = e.target.value;
        localStorage.setItem("todoapp", JSON.stringify(todoapp)); //and changes are saved to local storage

        displaytodos();
      });
    });

    deletebtn.on("click", (e) => {
      //when the delete button is clicked
      todoapp = todoapp.filter((t) => t != todo); //the filter method will filter out the task from the todoapp array
      localStorage.setItem("todoapp", JSON.stringify(todoapp)); //and then the changes are saved back to the local storage.

      displaytodos();
    });

    calendar.on("change", (e) => {
      //once the value of calendar changes
      todo.date = e.target.value; //the date property becomes updated using the value property
      localStorage.setItem(calendar, e.target.value); //and then the new date is stored under key 'calendar'
      localStorage.setItem("todoapp", JSON.stringify(todoapp)); //and thenall changes are saved to local storage
      displaytodos();
    });
  });

  //the function is used to filter task to display on task added to fitness.
  const displayFitnessTasks = () => {
    const fitnessTasks = todoapp.filter((todo) => {
      return todo.category === "fitness"; //used to display all the task added to the category fitness
    });

    const $pg2body = $(".pg2body");
    $pg2body.empty(); //empty out whatever elemts that are contained in the pg2body elemnt.

    fitnessTasks.forEach((task) => {
      //for ech individual task retrived create html elements
      const $taskElement = $("<div>").addClass("fitness-task");
      const $label = $("<label>");
      const $span = $("<span>").addClass("bubble");
      const $radioBtn = $("<input>").attr({
        type: "radio",
        name: "fitness-task",
      });
      //add attributes to the elements created
      const $header = $("<div>").addClass("title");
      const $header_p = $("<h3>").html(`<i class="fa-solid fa-plus"></i>`);
      $header.append($header_p);

      const $taskContent = $("<div>").addClass("task-content");
      $taskContent.html(task.content);

      const $taskActions = $("<div>").addClass("task-actions");

      const $editBtn = $("<button>")
        .addClass("task-edit")
        .html("<i class='fas fa-edit'></i>");

      const $deleteBtn = $("<button>")
        .addClass("task-delete")
        .html("<i class='fas fa-trash'></i>");

      //create input field for the editing task
      const $editInput = $("<input>")
        .attr({ type: "text", value: task.content })
        .addClass("edit-input")
        .css("display", "none"); // hide the input until when required

      //append child elements
      $label.append($radioBtn);
      $label.append($span);
      $taskActions.append($editBtn);
      $taskActions.append($editInput);
      $taskActions.append($deleteBtn);
      $header.append($header_p);

      $taskElement.append($label);
      $taskElement.append($taskContent);
      $taskElement.append($taskActions);

      $pg2body.append($taskElement);

      $editBtn.on("click", () => {
        //once edit is clicked
        $taskContent.css("display", "none"); // hide the task content
        $editInput.css("display", "inline-block"); // show the input
        $editInput.focus(); // and apply focus to the input
      });

      // add edit blur event listener to input element
      $editInput.on("blur", () => {
        const newContent = $editInput.val().trim(); // get new task content from input
        if (newContent !== "") {
          task.content = newContent; //if newcontent is empty then remove spaces using trim
          $taskContent.html(newContent); // update task content
          localStorage.setItem("todoapp", JSON.stringify(todoapp)); // and update the local storage
        }
        $taskContent.css("display", "inline-block"); // show the task content again
        $editInput.css("display", "none"); //and hide the input
      });

      $deleteBtn.on("click", () => {
        //once delete is clicked
        todoapp = todoapp.filter((t) => t !== task); // if t matches the value of task, the filter method will filter out the unwanted task
        localStorage.setItem("todoapp", JSON.stringify(todoapp)); //update the new task list in local storage
        $taskElement.remove(); // and remove task from html element
      });

      $radioBtn.on("click", () => {
        //mark task as complete
        if ($radioBtn.prop("checked")) {
          task.done = false;
          localStorage.setItem("todoapp", JSON.stringify(todoapp));
        }
      });
    });
  };
  displayFitnessTasks();

  /*******A REPITION OF DISPLAYFITNESSTASKS *******/

  const displayWorkTasks = () => {
    const worktasks = todoapp.filter((todo) => {
      return todo.category === "Business";
    });

    const pg3body = document.querySelector(".pg3body");
    pg3body.innerHTML = "";

    worktasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("work-task");
      const label = document.createElement("label");
      const span = document.createElement("span");
      const radioBtn = document.createElement("input");

      radioBtn.type = "radio";
      radioBtn.name = "work-task";
      span.classList.add("bubble");

      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");
      taskContent.innerHTML = task.content;

      const taskActions = document.createElement("div");
      taskActions.classList.add("task-actions");

      const editBtn = document.createElement("button");
      editBtn.classList.add("task-edit");
      editBtn.innerHTML = "<i class='fas fa-edit'></i>";

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("task-delete");
      deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";

      //creating input for editing task
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task.content;
      editInput.classList.add("edit-input");
      editInput.style.display = "none"; // hide the input initially
      label.appendChild(radioBtn);
      label.appendChild(span);
      taskActions.appendChild(editBtn);
      taskActions.appendChild(editInput);
      taskActions.appendChild(deleteBtn);
      taskElement.appendChild(label);
      taskElement.appendChild(taskContent);
      taskElement.appendChild(taskActions);
      pg3body.appendChild(taskElement);

      editBtn.addEventListener("click", () => {
        taskContent.style.display = "none"; // hide the task content
        editInput.style.display = "inline-block"; // show the input
        editInput.focus(); // focus on the input
      });
      // add blur event listener to input element
      editInput.addEventListener("blur", () => {
        const newContent = editInput.value.trim(); // get new task content from input
        if (newContent !== "") {
          task.content = newContent;
          taskContent.innerHTML = newContent; // update task content in UI
          localStorage.setItem("todoapp", JSON.stringify(todoapp)); // update local storage
        }
        taskContent.style.display = "inline-block"; // show the task content again
        editInput.style.display = "none"; // hide the input
      });

      deleteBtn.addEventListener("click", () => {
        todoapp = todoapp.filter((t) => t !== task);
        localStorage.setItem("todoapp", JSON.stringify(todoapp));
        taskElement.remove();
      });

      radioBtn.addEventListener("click", () => {
        // code to mark task as complete
        if (radioBtn.checked) {
          // code to mark task as complete
          task.done = false;
          localStorage.setItem("todoapp", JSON.stringify(todoapp));
        }
      });
    });
  };
  displayWorkTasks();

  /*******WORKS THE SAME AS DISPLAYFITNESSTASKS*******/
  const displayPersonalTasks = () => {
    const personaltasks = todoapp.filter((todo) => {
      return todo.category === "Personal";
    });
    const pg4body = $(".pg4body");
    pg4body.empty();

    $.each(personaltasks, (index, task) => {
      const taskElement = $("<div>").addClass("personal-task");
      const label = $("<label>");
      const span = $("<span>").addClass("bubble");
      const radioBtn = $("<input>").attr({
        type: "radio",
        name: "personal-task",
      });

      const taskContent = $("<div>")
        .addClass("task-content")
        .html(task.content);

      const taskActions = $("<div>").addClass("task-actions");

      const editBtn = $("<button>")
        .addClass("task-edit")
        .html("<i class='fas fa-edit'></i>");

      const deleteBtn = $("<button>")
        .addClass("task-delete")
        .html("<i class='fas fa-trash'></i>");

      const editInput = $("<input>")
        .attr({
          type: "text",
          value: task.content,
        })
        .addClass("edit-input")
        .hide(); // hide the input initially

      label.append(radioBtn);
      label.append(span);
      taskActions.append(editBtn);
      taskActions.append(editInput);
      taskActions.append(deleteBtn);
      taskElement.append(label);
      taskElement.append(taskContent);
      taskElement.append(taskActions);
      pg4body.append(taskElement);

      editBtn.on("click", () => {
        taskContent.hide(); // hide the task content
        editInput.show(); // show the input
        editInput.focus(); // focus on the input
      });

      editInput.on("blur", () => {
        const newContent = editInput.val().trim(); // get new task content from input
        if (newContent !== "") {
          task.content = newContent;
          taskContent.html(newContent); // update task content in UI
          localStorage.setItem("todoapp", JSON.stringify(todoapp)); // update local storage
        }
        taskContent.show(); // show the task content again
        editInput.hide(); // hide the input
      });

      deleteBtn.on("click", () => {
        todoapp = todoapp.filter((t) => t !== task);
        localStorage.setItem("todoapp", JSON.stringify(todoapp));
        taskElement.remove();
      });

      radioBtn.on("click", () => {
        // code to mark task as complete
        if (radioBtn.is(":checked")) {
          // code to mark task as complete
          task.done = false;
          localStorage.setItem("todoapp", JSON.stringify(todoapp));
        }
      });
    });
  };

  displayPersonalTasks();
};
