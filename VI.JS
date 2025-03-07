// Sample user data (could be stored in localStorage or a database in real scenarios)
let users = [];

// Function to add a new user
function addUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const image = document.getElementById('preview').src;

    // Input validation
    if (!firstName || !lastName || !email || !phone || !image) {
        alert("All fields are required!");
        return;
    }

    // Create a new user object
    const newUser = {
        id: Date.now(),  // Generate unique ID using timestamp
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        image: image
    };

    // Add new user to the list
    users.push(newUser);

    // Clear input fields
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('image').value = '';
    document.getElementById('preview').style.display = 'none';

    // Re-render the user list
    renderUserList();
}

// Function to render the user list
function renderUserList() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear the table before re-rendering

    users.forEach(user => {
        const row = document.createElement('tr');
        
        // Create table cells
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><img src="${user.image}" alt="User Image" style="width:50px; height:50px;"></td>
            <td>
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a user
function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('preview').src = user.image;
        document.getElementById('preview').style.display = 'block';

        // Remove the user from the list and allow updating
        deleteUser(id);
    }
}

// Function to delete a user
function deleteUser(id) {
    users = users.filter(user => user.id !== id); // Remove user with matching ID
    renderUserList(); // Re-render the list after deletion
}

// Initial render when the page loads
window.onload = renderUserList;
