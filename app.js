const apiUrl = "http://localhost:8080/v1/usuario";


async function saveUser() {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;


    if (!nombre || !telefono) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const user = {
        nombre: nombre,
        telefono: telefono
    };

    try {

        const response = await fetch(`${apiUrl}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("Usuario guardado exitosamente.");
            document.getElementById("nombre").value = "";
            document.getElementById("telefono").value = "";
        } else {
            const errorData = await response.json();
            alert(`Error al guardar el usuario: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("Hubo un problema al guardar el usuario.");
    }
}

async function listUsers() {
    try {
        const response = await fetch(`${apiUrl}/List`);

        if (response.ok) {
            const users = await response.json();
            displayUserList(users);
        } else {
            alert("Error al obtener los usuarios.");
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("Hubo un problema al obtener los usuarios.");
    }
}

function displayUserList(users) {
    const userTableBody = document.querySelector("#userTable tbody");
    userTableBody.innerHTML = ""; 

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.telefono}</td>
        `;
        userTableBody.appendChild(row);
    });

    
    document.getElementById("userList").style.display = "block";
}


document.getElementById("saveButton").addEventListener("click", saveUser);


document.getElementById("listButton").addEventListener("click", listUsers);
