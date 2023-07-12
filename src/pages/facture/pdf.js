

// Fonction pour générer le PDF de la facture
function generatePDF(emitterName, emitterAddress, emitterPhone, invoiceDate, invoiceNumber, items, totalAmount) {
   // Création de l'élément div avec la classe "invoice"
const invoiceDiv = document.createElement("div");
invoiceDiv.classList.add("invoice");

// Création de l'en-tête de la facture avec un titre h1
const header = document.createElement("div");
header.classList.add("invoice-header");
const title = document.createElement("h1");
title.textContent = "Facture";
header.appendChild(title);
invoiceDiv.appendChild(header);

// Création des détails de la facture avec deux div (gauche et droite)
const details = document.createElement("div");
details.classList.add("invoice-details");
const leftDetails = document.createElement("div");
leftDetails.classList.add("left");
const rightDetails = document.createElement("div");
rightDetails.classList.add("right");
details.appendChild(leftDetails);
details.appendChild(rightDetails);
invoiceDiv.appendChild(details);

// Ajout des informations de l'émetteur
const emitterName = document.createElement("p");
emitterName.innerHTML = "<strong>Emetteur:</strong> Votre nom ou nom de votre entreprise";
leftDetails.appendChild(emitterName);

const emitterAddress = document.createElement("p");
emitterAddress.innerHTML = "<strong>Adresse:</strong> Votre adresse";
leftDetails.appendChild(emitterAddress);

const emitterPhone = document.createElement("p");
emitterPhone.innerHTML = "<strong>Téléphone:</strong> Votre numéro de téléphone";
leftDetails.appendChild(emitterPhone);

// Ajout des informations de la facture
const invoiceDate = document.createElement("p");
invoiceDate.innerHTML = "<strong>Date:</strong> 12 juillet 2023";
rightDetails.appendChild(invoiceDate);

const invoiceNumber = document.createElement("p");
invoiceNumber.innerHTML = "<strong>Numéro de facture:</strong> 001";
rightDetails.appendChild(invoiceNumber);

// Ajout des articles de la facture
const invoiceItemsDiv = document.createElement("div");
invoiceItemsDiv.classList.add("invoice-items");
invoiceDiv.appendChild(invoiceItemsDiv);

const itemsTable = document.createElement("table");
invoiceItemsDiv.appendChild(itemsTable);

const tableHead = document.createElement("thead");
itemsTable.appendChild(tableHead);

const tableHeadRow = document.createElement("tr");
tableHead.appendChild(tableHeadRow);

const descriptionHeader = document.createElement("th");
descriptionHeader.textContent = "Description";
tableHeadRow.appendChild(descriptionHeader);

const quantityHeader = document.createElement("th");
quantityHeader.textContent = "Quantité";
tableHeadRow.appendChild(quantityHeader);

const unitPriceHeader = document.createElement("th");
unitPriceHeader.textContent = "Prix unitaire";
tableHeadRow.appendChild(unitPriceHeader);

const totalHeader = document.createElement("th");
totalHeader.textContent = "Total";
tableHeadRow.appendChild(totalHeader);

const tableBody = document.createElement("tbody");
itemsTable.appendChild(tableBody);

const item1Row = document.createElement("tr");
tableBody.appendChild(item1Row);

const item1Description = document.createElement("td");
item1Description.textContent = "Produit 1";
item1Row.appendChild(item1Description);

const item1Quantity = document.createElement("td");
item1Quantity.textContent = "2";
item1Row.appendChild(item1Quantity);

const item1UnitPrice = document.createElement("td");
item1UnitPrice.textContent = "10€";
item1Row.appendChild(item1UnitPrice);

const item1Total = document.createElement("td");
item1Total.textContent = "20€";
item1Row.appendChild(item1Total);

const item2Row = document.createElement("tr");
tableBody.appendChild(item2Row);

const item2Description = document.createElement("td");
item2Description.textContent = "Produit 2";
item2Row.appendChild(item2Description);

const item2Quantity = document.createElement("td");
item2Quantity.textContent = "1";
item2Row.appendChild(item2Quantity);

const item2UnitPrice = document.createElement("td");
item2UnitPrice.textContent = "15€";
item2Row.appendChild(item2UnitPrice);

const item2Total = document.createElement("td");
item2Total.textContent = "15€";
item2Row.appendChild(item2Total);

// Ajout du total de la facture
const invoiceTotalDiv = document.createElement("div");
invoiceTotalDiv.classList.add("invoice-total");
invoiceDiv.appendChild(invoiceTotalDiv);

const totalAmount = document.createElement("h3");
totalAmount.textContent = "Total: 35€";
invoiceTotalDiv.appendChild(totalAmount);

// Ajout du bouton de génération du PDF
const generateButton = document.createElement("button");
generateButton.setAttribute("id", "generate");
generateButton.textContent = "Générer le PDF";
invoiceDiv.appendChild(generateButton);

// Ajout de l'élément div contenant la facture au body de la page
document.body.appendChild(invoiceDiv);
   
    // Mise à jour des informations de l'émetteur
    const emitterNameElement = document.querySelector("#emitterName");
    const emitterAddressElement = document.querySelector("#emitterAddress");
    const emitterPhoneElement = document.querySelector("#emitterPhone");

    emitterNameElement.textContent = emitterName;
    emitterAddressElement.textContent = emitterAddress;
    emitterPhoneElement.textContent = emitterPhone;

    // Mise à jour des informations de la facture
    const invoiceDateElement = document.querySelector("#invoiceDate");
    const invoiceNumberElement = document.querySelector("#invoiceNumber");

    invoiceDateElement.textContent = invoiceDate;
    invoiceNumberElement.textContent = invoiceNumber;

    // Mise à jour des articles de la facture
    const invoiceItemsTableBody = document.querySelector("#invoiceItemsTableBody");
    invoiceItemsTableBody.innerHTML = "";

    items.forEach(item => {
        const itemRow = document.createElement("tr");
        const descriptionCell = document.createElement("td");
        const quantityCell = document.createElement("td");
        const unitPriceCell = document.createElement("td");
        const totalCell = document.createElement("td");

        descriptionCell.textContent = item.description;
        quantityCell.textContent = item.quantity;
        unitPriceCell.textContent = item.unitPrice;
        totalCell.textContent = item.total;

        itemRow.appendChild(descriptionCell);
        itemRow.appendChild(quantityCell);
        itemRow.appendChild(unitPriceCell);
        itemRow.appendChild(totalCell);

        invoiceItemsTableBody.appendChild(itemRow);
    });

    // Mise à jour du total de la facture
    const totalAmountElement = document.querySelector("#totalAmount");
    totalAmountElement.textContent = `Total: ${totalAmount}`;

    // Génération du PDF
    const invoice = document.querySelector(".invoice");
    const options = {
        margin: 1,
        filename: 'facture.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(invoice).save();
}

// Écouteur d'événement pour le bouton de génération du PDF
document.getElementById("generate").addEventListener("click", function () {
    const items = [
        { description: "Produit 1", quantity: 2, unitPrice: "10€", total: "20€" },
        { description: "Produit 2", quantity: 1, unitPrice: "15€", total: "15€" }
    ];

    generatePDF(
        "Votre nom ou nom de votre entreprise",
        "Votre adresse",
        "Votre numéro de téléphone",
        "12 juillet 2023",
        "001",
        items,
        "35€"
    );
});
