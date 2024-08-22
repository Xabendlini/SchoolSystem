const names = document.getElementById("name")
const surname = document.getElementById("surname")
const marks = document.getElementById("marks")
const submitButton = document.getElementById("submit-button")
const sortButton = document.getElementById("sort-button");
const form = document.getElementById("studentForm")
const tablebody = document.getElementById("studentTableBody")
const showGraphButton = document.getElementById("showGraphButton");
const chartCanvas = document.getElementById("marksChart").getContext("2d");

document.getElementById('calculator-button').onclick = function() {
   window.location.href = 'calculator.html'; 
};


const students = JSON.parse(localStorage.getItem('students')) || [];
let marksChart;

submitButton.addEventListener("click",addStudent )

sortButton.addEventListener("click", () => {
   bubbleSortStudents();
  populate()
 });

 showGraphButton.addEventListener("click", () => {
   bubbleSortStudents();
   populate();
   renderChart();
});

document.addEventListener('DOMContentLoaded', populate);

function addStudent(){
   const student = {
      name: names.value,
      surname: surname.value,
      marks: parseFloat(marks.value),
   };
   if (names.value.trim() === "" || surname.value.trim() === "" || marks.value.trim() === "" ){
       
     return;
   }

   
   students.push(student)
   localStorage.setItem('students', JSON.stringify(students));

   form.reset()
   
  

   console.log(students)

   populate()
   
  }
function bubbleSortStudents(){
   const len = students.length;
   for (let i=0; i<len; i++){ 
      for (let j=0; j<len-1; j++){
         if (parseFloat(students[j].marks) > parseFloat(students[j+1].marks)){
            let temp = students[j];
            students[j] = students[j+1];
            students[j+1] = temp;
         }
      }
   }
   
}

 
function populate(){

   

   tablebody.innerHTML='';
 
    students.forEach((student, index) => {
   
    const row = document.createElement('tr') 
   
    row.innerHTML=`
                <td>${student.name}</td>
                <td>${student.surname}</td>
                <td>${formatMarks(student.marks)}</td>
                <td><button onclick="editStudent(${index})" class="updater">Edit</button>
                <button onclick="deleteStudent(${index})"  class="eraser">Delete</button>
                </td>
            `
    tablebody.append(row)
    
   });
   console.log(tablebody)
}
function formatMarks(marks) {
   marks = Math.min(Math.max(marks, 0), 100);
   return marks + "%";
 }
 
function editStudent(index){
   
   const student = students[index];
    names.value = student.name;
    surname.value = student.surname;
    marks.value = student.marks;
    
   
   currentIndex = index;
  

   localStorage.setItem('students', JSON.stringify(students));
   submitButton.innerText="SaveChanges";
   submitButton.removeEventListener("click",addStudent);
  submitButton.addEventListener("click",saveChanges)
  
  
}
function saveChanges() {
   
   students[currentIndex] = {
       name: names.value,
       surname: surname.value,
       marks: parseFloat(marks.value),
   };
   

   names.value = "";
   surname.value = "";
   marks.value = "";

   
   localStorage.setItem('students', JSON.stringify(students));
   submitButton.innerText="AddStudent";
   submitButton.removeEventListener("click",saveChanges);
  submitButton.addEventListener("click",addStudent)
  
 
  populate();
  renderChart()
 
}
   
function deleteStudent(index){
   students.splice(index,1);
   localStorage.setItem('students', JSON.stringify(students));
  
   populate();
   renderChart
}

function searchStudents(){
   
   const input = document.getElementById("searchInput")
   const table= document.getElementById("studentTable")
   const filter = input.value.toUpperCase();
   const tr = table.getElementsByTagName("tr")

   for (i=1; i < tr.length; i++){
      const tdName = tr[i].getElementsByTagName("td")[0];
      const tdSurname = tr[i].getElementsByTagName("td")[1];
      if (tdName || tdSurname){ 
         const txtValueName = tdName.textContent|| tdName.innerText;
         const txtValueSurname = tdSurname.textContent|| tdSurname.innerText;

         if (txtValueName.toUpperCase().indexOf(filter)> -1 || txtValueSurname.toUpperCase().indexOf(filter)> -1 ){
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
   
   marksChart = new Chart(chartCanvas, {
      type: 'line', 
      data: {
        labels: labels,
        datasets: [{
          label: 'Marks (%)',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }


      