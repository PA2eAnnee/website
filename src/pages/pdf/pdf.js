import { API } from "../../backend/backend-layouts/js/global/API.js";

export const generatePDF = async () => {
  const container = document.createElement('div');
  container.classList.add('container');

  try {
    const users = await API.getUsers({id: API.getId()});

    const userTable = document.createElement('table');
    const userTbody = document.createElement('tbody');

    const userHeaderRow = document.createElement('tr');
    const userNameHeader = document.createElement('th');
    const userEmailHeader = document.createElement('th');
    const userRoleHeader = document.createElement('th');
    userNameHeader.textContent = 'Name';
    userEmailHeader.textContent = 'Email';
    userRoleHeader.textContent = 'Role';
    userHeaderRow.appendChild(userNameHeader);
    userHeaderRow.appendChild(userEmailHeader);
    userHeaderRow.appendChild(userRoleHeader);
    userTbody.appendChild(userHeaderRow);

    const userTitle = document.createElement("h1");
    userTitle.innerText="Mes informations"
    container.appendChild(userTitle);

    users.forEach(user => {
      const userRow = document.createElement('tr');
      const userNameCell = document.createElement('td');
      const userEmailCell = document.createElement('td');
      const userRoleCell = document.createElement('td');
      userNameCell.textContent = user.name;
      userEmailCell.textContent = user.email;
      userRoleCell.textContent = user.role;
      userRow.appendChild(userNameCell);
      userRow.appendChild(userEmailCell);
      userRow.appendChild(userRoleCell);
      userTbody.appendChild(userRow);

      userTable.appendChild(userTbody);
      container.appendChild(userTable);
    });

   

    const events = await API.getMyEvents({id_user: API.getId()});

    const eventTable = document.createElement('table');
    const eventTbody = document.createElement('tbody');

    const eventHeaderRow = document.createElement('tr');
    const eventDescriptionHeader = document.createElement('th');
    const eventTypeHeader = document.createElement('th');
    const eventPriceHeader = document.createElement('th');
    const eventStartDateHeader = document.createElement('th');
    const eventEndDateHeader = document.createElement('th');
    eventDescriptionHeader.textContent = 'Description';
    eventTypeHeader.textContent = 'Type';
    eventPriceHeader.textContent = 'Price';
    eventStartDateHeader.textContent = 'Start Date';
    eventEndDateHeader.textContent = 'End Date';
    eventHeaderRow.appendChild(eventDescriptionHeader);
    eventHeaderRow.appendChild(eventTypeHeader);
    eventHeaderRow.appendChild(eventPriceHeader);
    eventHeaderRow.appendChild(eventStartDateHeader);
    eventHeaderRow.appendChild(eventEndDateHeader);
    eventTbody.appendChild(eventHeaderRow);

    const EventTitle = document.createElement("h1");
    EventTitle.innerText="Mes Events"
    container.appendChild(EventTitle);

    events.forEach(event => {
      const eventRow = document.createElement('tr');
      const eventDescriptionCell = document.createElement('td');
      const eventTypeCell = document.createElement('td');
      const eventPriceCell = document.createElement('td');
      const eventStartDateCell = document.createElement('td');
      const eventEndDateCell = document.createElement('td');
      eventDescriptionCell.textContent = event.description;
      eventTypeCell.textContent = event.type;
      eventPriceCell.textContent = event.price;
      eventStartDateCell.textContent = event.start_date;
      eventEndDateCell.textContent = event.end_date;
      eventRow.appendChild(eventDescriptionCell);
      eventRow.appendChild(eventTypeCell);
      eventRow.appendChild(eventPriceCell);
      eventRow.appendChild(eventStartDateCell);
      eventRow.appendChild(eventEndDateCell);
      eventTbody.appendChild(eventRow);
    });

    eventTable.appendChild(eventTbody);
    container.appendChild(eventTable);

    const course_date = document.createElement("h1");
    course_date.innerText="Mes Cours"
    container.appendChild(course_date);

    const courses = await API.getCourses({user_id : API.getId()});

    const courseTable = document.createElement('table');
    const courseTbody = document.createElement('tbody');

    const courseHeaderRow = document.createElement('tr');
    const courseIdHeader = document.createElement('th');
    const courseNameHeader = document.createElement('th');
    const courseDescriptionHeader = document.createElement('th');
    const coursePriceHeader = document.createElement('th');
    const courseTypeHeader = document.createElement('th');
    const courseDateHeader = document.createElement('th');
    const courseEndDateHeader = document.createElement('th');
    courseIdHeader.textContent = 'id';
    courseNameHeader.textContent = 'name';
    courseDescriptionHeader.textContent = 'description';
    coursePriceHeader.textContent = 'price';
    courseTypeHeader.textContent = 'type';
    courseDateHeader.textContent = 'course_date';
    courseEndDateHeader.textContent = 'course_enddate';
    courseHeaderRow.appendChild(courseIdHeader);
    courseHeaderRow.appendChild(courseNameHeader);
    courseHeaderRow.appendChild(courseDescriptionHeader);
    courseHeaderRow.appendChild(coursePriceHeader);
    courseHeaderRow.appendChild(courseTypeHeader);
    courseHeaderRow.appendChild(courseDateHeader);
    courseHeaderRow.appendChild(courseEndDateHeader);
    courseTbody.appendChild(courseHeaderRow);

    courses.forEach(course => {
      
    const courseRow = document.createElement('tr');
    const courseIdCell = document.createElement('td');
    const courseNameCell = document.createElement('td');
    const courseDescriptionCell = document.createElement('td');
    const coursePriceCell = document.createElement('td');
    const courseTypeCell = document.createElement('td');
    const courseDateCell = document.createElement('td');
    const courseEndDateCell = document.createElement('td');
    courseIdCell.textContent = course.id;
    courseNameCell.textContent = course.name;
    courseDescriptionCell.textContent = course.description;
    coursePriceCell.textContent = course.price;
    courseTypeCell.textContent = course.type;
    courseDateCell.textContent = course.course_date;
    courseEndDateCell.textContent = course.course_enddate;
    courseRow.appendChild(courseIdCell);
    courseRow.appendChild(courseNameCell);
    courseRow.appendChild(courseDescriptionCell);
    courseRow.appendChild(coursePriceCell);
    courseRow.appendChild(courseTypeCell);
    courseRow.appendChild(courseDateCell);
    courseRow.appendChild(courseEndDateCell);
    courseTbody.appendChild(courseRow);
  });
    courseTable.appendChild(courseTbody);
    container.appendChild(courseTable);

    const styles = `
      <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 8px;
            border-bottom: 1px solid #dddddd;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }
      </style>
    `;

    const htmlContent = styles + container.outerHTML;

    html2pdf()
      .set({
        margin: 1,
        filename: 'exported_pdf.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(htmlContent)
      .save();
  } catch (error) {
    console.error('An error occurred while fetching the data:', error);
  }
};

window.onload = () => {
  console.log('ok');
  const pdfButton = document.getElementById('generate');
  pdfButton.onclick = generatePDF;
};
