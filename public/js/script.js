function loadUsers() {
    fetch('http://localhost:3000/users/')
        .then(response => response.json())
        .then(data => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = ''; // Clear the list before adding new users
            data.forEach(user => {
                const tr = document.createElement('tr');
                // Create first cell
                let td = document.createElement('td');
                td.textContent = user.id;
                tr.appendChild(td);
                // Create second cell
                td = document.createElement('td');
                td.textContent = user.username;
                tr.appendChild(td);
                // Create third cell
                td = document.createElement('td');
                td.textContent = user.email;
                tr.appendChild(td);

                usersList.appendChild(tr);
            });
        });
}

function addUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (!username || !email) {
        alert('Username and email required');
        return; 
    }

    fetch('http://localhost:3000/users', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email })
    })
        .then(response => response.json())
        .then(data => {
            loadUsers(); // Reload users after adding a new user
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
        })
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    // Add an eventListen to th add user btn
    const addUserBtn = document.getElementById('addUser');
    addUserBtn.addEventListener('click', addUser)

});