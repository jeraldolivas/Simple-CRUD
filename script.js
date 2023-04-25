// Initialize an empty array to store the user data
let users = [];

// Get references to the DOM elements we'll be working with
const tableBody = document.getElementById("table-body");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addButton = document.getElementById("add");

// This variable will store the index of the user we're editing, if any
let editIndex = null;

// This function renders the table rows for each user in the users array
function renderTable() {
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const actionTd = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameTd.textContent = user.name;
    emailTd.textContent = user.email;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", () => {
      editUser(index);
    });

    deleteButton.addEventListener("click", () => {
      deleteUser(index);
    });

    actionTd.appendChild(editButton);
    actionTd.appendChild(deleteButton);

    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(actionTd);

    tableBody.appendChild(tr);
  });
}

// This function adds a new user to the users array and updates the table
function addUser() {
  // Get the values from the input fields
  const name = nameInput.value;
  const email = emailInput.value;

  // If editIndex is null, we're adding a new user; otherwise, we're updating an existing one
  if (editIndex === null) {
    users.push({ name, email });
  } else {
    users[editIndex].name = name;
    users[editIndex].email = email;
    editIndex = null;
  }

  // Clear the input fields and re-render the table
  nameInput.value = "";
  emailInput.value = "";
  renderTable();

  // Change the Add button text back to "Add"
  addButton.textContent = "Add"; 
}

// This function populates the input fields with the data for a user we want to edit
function editUser(index) {
  const user = users[index];
  nameInput.value = user.name;
  emailInput.value = user.email;
  editIndex = index;

  // Change the Add button text to "Update"
  addButton.textContent = "Update";
}

// This function removes a user from the users array and updates the table
function deleteUser(index) {
  users.splice(index, 1);
  renderTable();
  editIndex = null;

  // Change the Add button text back to "Add"
  addButton.textContent = "Add";
}

// This event listener calls the addUser function when the Add button is clicked
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  addUser();
});
