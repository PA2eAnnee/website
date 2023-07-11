import {API} from "../../backend/backend-layouts/js/global/API.js";

window.onload = () => {
    console.log("ok");
    const pdfButton = document.getElementById("generate");
    pdfButton.onclick = () => generatePDF();
}

const generatePDF = () => {
    const container = document.querySelector('.container');
    const table = container.querySelector('table');
    const tbody = table.querySelector('tbody');
    const toSend = {id: API.getId()};
    API.getUsers(toSend)
        .then(users => {
            console.log(users);
            // Remove existing rows
            tbody.innerHTML = '';

            // Create new rows with user data
            users.forEach(user => {
                const userRow = document.createElement('tr');
                const idCell = document.createElement('td');
                const nameCell = document.createElement('td');
                const emailCell = document.createElement('td');
                const roleCell = document.createElement('td');

                idCell.textContent = user.id;
                nameCell.textContent = user.name;
                emailCell.textContent = user.email;
                roleCell.textContent = user.role;

                userRow.appendChild(idCell);
                userRow.appendChild(nameCell);
                userRow.appendChild(emailCell);
                userRow.appendChild(roleCell);

                tbody.appendChild(userRow);
            });

            // Generate PDF
            html2pdf()
                .set({
                    margin: 1,
                    filename: 'exported_pdf.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                })
                .from(container)
                .save();
        })
        .catch(error => {
            console.error(error);
        });
}