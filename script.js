var students = ["María", "Jose Luis", "Ricardo", "Ernesto", "Josefina", "Timmy", "Joseph", "Macarena", "Jimmy", "Adolfo", "Lucía", "Ángel", "Jacobina"];
var groupSize = groupSizeInput.value;

const DOM = {
    outputSection: document.querySelector("#outputSection"),
    studentInput: document.querySelector("#studentInput"),
    addStudentBtn: document.querySelector("#addStudentBtn"),
    generateGroupsBtn: document.querySelector("#generateGroupsBtn"),
    groupSizeInput: document.querySelector("#groupSizeInput"),
    teams: document.querySelector("#teams"),
    students: document.querySelector("#students"),
}

DOM.groupSizeInput.addEventListener("input", function(){groupSize = groupSizeInput.value});
DOM.generateGroupsBtn.addEventListener("click", showTeams);
DOM.addStudentBtn.addEventListener("click", addStudent);
DOM.students.addEventListener("click", removeStudent);


(function()
{
    showStudents();
})();


function removeStudent(event)
{
    if (event.target.className == "removeStudentCross")
    {
        let indexToRemove = event.target.parentNode.getAttribute("data-student-index");
        students.splice(indexToRemove, 1);
        showStudents();
    }
}


/**
 * Añade un nuevo estudiante al grupo de clase actual.
 */
function addStudent()
{
    let newStudent = DOM.studentInput.value.trim();
    if (newStudent.length > 1)
    {
        students.push(newStudent);
        showStudents();
    }
}


/**
 * Muestra en pantalla a los alumnos que forman el grupo de clase actual.
 */
function showStudents()
{
    DOM.students.innerHTML = "";
    students.forEach((student, index) => {
        let studentDiv = document.createElement("div");
        studentDiv.classList.add("student");
        studentDiv.setAttribute("data-student-index", index);
        let studentName = document.createElement("p");
        studentName.textContent = student;
        let removeStudentCross = document.createElement("img");
        removeStudentCross.setAttribute("src", "./assets/remove-student-cross.svg");
        removeStudentCross.classList.add("removeStudentCross");
        studentDiv.append(removeStudentCross);
        studentDiv.append(studentName);
        DOM.students.append(studentDiv);
    });
}


/**
 * Genera equipos y los muestra en la sección teams.
 */
function showTeams()
{
    if (DOM.groupSizeInput.validity.valid)
    {
        let generatedTeams = makeGroups(students, groupSize);
        let teamId = 1;
        DOM.teams.innerHTML = "";
        generatedTeams.forEach(team =>
        {
            let teamDiv = document.createElement("div");
            teamDiv.classList.add("team");
            let teamIdHeader = document.createElement("h3");
            teamIdHeader.classList.add("teamId");
            teamIdHeader.textContent = "Grupo " + teamId++;
            teamDiv.append(teamIdHeader);
            team.forEach(teamMember => 
            {
                teamMemberP = document.createElement("p");
                teamMemberP.classList.add("teamMember");
                teamMemberP.textContent = teamMember;
                teamDiv.append(teamMemberP);
            })
            DOM.teams.append(teamDiv);
        });
    }
    
}


/**
 * En base a un array de alumnos crea grupos aleatorios con el tamaño deseado. Si sobran alumnos se añaden a un grupo pequeño.
 * @param {Array} studentsList Array que contiene los estudiantes.
 * @param {Number} groupSize Tamaño deseado de cada grupo a crear.
 * @returns {Array<Array<string>>} Array que contiene los grupos formados, en forma de arrays.
 */
function makeGroups(studentsList, groupSize)
{
    let students = studentsList.slice(0); //Clono la lista de alumnos para no alterar la original.
    let groupsList = []; //Contiene los grupos creados.
    let group = []; //Contiene los alumnos que forman grupo.
    while(students.length > 0)
    {
        let randomIndex = Math.floor(Math.random() * (students.length));
        group.push(students.splice(randomIndex, 1)[0]);
        if (group.length == groupSize || students.length == 0)
        {
            groupsList.push(group);
            group = [];
        };
    }

    return groupsList;
}