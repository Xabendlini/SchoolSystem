// script.js

const addStudentTab = document.getElementById("add-student-tab");
const listStudentsTab = document.getElementById("list-students-tab");
const graphTab = document.getElementById("graph-tab");
const addStudentPage = document.getElementById("add-student-page");
const listStudentsPage = document.getElementById("list-students-page");
const graphPage = document.getElementById("graph-page");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const marksInput = document.getElementById("marks");
const submitButton = document.getElementById("submit-button");
const sortButton = document.getElementById("sort-button");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const showGraphButton = document.getElementById("showGraphButton");
const marksChartCanvas = document.getElementById("marksChart").getContext("2d");

document.getElementById('calculator-button').onclick = function() {
   window.location.href = 'calculator.html'; 
};


const students = JSON.parse(localStorage.getItem('students')) || [];
let marksChart;

submitButton.addEventListener("click", addStudent);
sortButton.addEventListener("click", () => {
    bubbleSortStudents();
    populate();
});

showGraphButton.addEventListener("click", () => {
    bubbleSortStudents();
    populate();
    renderChart();
});

addStudentTab.addEventListener("click", () => {
    addStudentTab.classList.add("active");
    listStudentsTab.classList.remove("active");
    graphTab.classList.remove("active");
    addStudentPage.classList.add("active");
    listStudentsPage.classList.remove("active");
    graphPage.classList.remove("active");
});

listStudentsTab.addEventListener("click", () => {
    addStudentTab.classList.remove("active");
    listStudentsTab.classList.add("active");
    graphTab.classList.remove("active");
    addStudentPage.classList.remove("active");
    listStudentsPage.classList.add("active");
    graphPage.classList.remove("active");
});

graphTab.addEventListener("click", () => {
    addStudentTab.classList.remove("active");
    listStudentsTab.classList.remove("active");
    graphTab.classList.add("active");
    addStudentPage.classList.remove("active");
    listStudentsPage.classList.remove("active");
    graphPage.classList.add("active");
});

function addStudent() {
    const student = {
        name: nameInput.value,
        surname: surnameInput.value,
        marks: parseFloat(marksInput.value)
    };

    if (nameInput.value.trim() === "" || surnameInput.value.trim() === "" || isNaN(marksInput.value)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    nameInput.value = "";
    surnameInput.value = "";
    marksInput.value = "";
    populate();
}

function bubbleSortStudents() {
    const len = students.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (parseFloat(students[j].marks) > parseFloat(students[j + 1].marks)) {
                let temp = students[j];
                students[j] = students[j + 1];
                students[j + 1] = temp;
            }
        }
    }
}

function populate() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.marks}%</td>
            <td>
                <button onclick="editStudent(${index})" class="updater">Edit</button>
                <button onclick="deleteStudent(${index})" class="eraser">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

function editStudent(index) {
    const student = students[index];
    nameInput.value = student.name;
    surnameInput.value = student.surname;
    marksInput.value = student.marks;
    submitButton.innerText = "SaveChanges";
    submitButton.removeEventListener("click", addStudent);
    submitButton.addEventListener("click", saveChanges);
}

function saveChanges() {
    students[currentIndex] = {
        name: nameInput.value,
        surname: surnameInput.value,
        marks: parseFloat(marksInput.value)
    };

    nameInput.value = "";
    surnameInput.value = "";
    marksInput.value = "";
    submitButton.innerText = "Add Learner";
    submitButton.removeEventListener("click", saveChanges);
    submitButton.addEventListener("click", addStudent);
    populate();
    renderChart();
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    populate();
    renderChart();
}

function searchStudents() {
    const input = document.getElementById("searchInput");
    const table = document.getElementById("studentTable");
    const filter = input.value.toUpperCase();
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const tdName = tr[i].getElementsByTagName("td")[0];
        const tdSurname = tr[i].getElementsByTagName("td")[1];

        if (tdName || tdSurname) {
            const txtValueName = tdName.textContent || tdName.innerText;
            const txtValueSurname = tdSurname.textContent || tdSurname.innerText;

            if (txtValueName.toUpperCase().indexOf(filter) > -1 || txtValueSurname.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function renderChart() {
    const labels = students.map(student => `${student.name} ${student.surname}`);
    const data = students.map(student => student.marks);

    if (marksChart) {
        marksChart.destroy();
    }

    marksChart = new Chart(marksChartCanvas, {
        type: 'bar', // You can change the chart type (bar, line, pie, etc.)
        data: {
            labels: labels,
            datasets: [{
                label: 'Marks (%)',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            indexAxis: 'y'
        }
    });
}

populate(); // Load students from localStorage on page load