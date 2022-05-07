var students = []; //Estudiantes del grupo actual
var currentGroupIndex = -1;
var groupSize = groupSizeInput.value;
if (!localStorage.RCG2groups) localStorage.RCG2groups = JSON.stringify([]); //FORMATO: {name: 'Grupo de prueba', students: ["a", "b"]}

const DOM = {
    outputSection: document.querySelector("#outputSection"),
    studentInput: document.querySelector("#studentInput"),
    addStudentBtn: document.querySelector("#addStudentBtn"),
    generateGroupsBtn: document.querySelector("#generateGroupsBtn"),
    groupSizeInput: document.querySelector("#groupSizeInput"),
    teams: document.querySelector("#teams"),
    students: document.querySelector("#students"),
    groups: document.querySelector("#groups"),
    saveGroupBtn: document.querySelector("#saveGroupBtn")
}

DOM.groupSizeInput.addEventListener("input", function(){groupSize = groupSizeInput.value});
DOM.generateGroupsBtn.addEventListener("click", showTeams);
DOM.addStudentBtn.addEventListener("click", addStudent);
DOM.students.addEventListener("click", removeStudent);
DOM.groups.addEventListener("click", selectStoragedGroup);
DOM.saveGroupBtn.addEventListener("click", saveGroup);
DOM.groups.addEventListener("click", removeGroup);


(function()
{
    showStudents();
    showStoragedGroups();
})();


/**
 * Si se clicka una de las "x" de la lista de grupos, elimina el grupo en cuestión.
 */
function removeGroup(event)
{
    if (event.target.className == "removeGroupCross")
    {
        let indexToRemove = event.target.parentNode.getAttribute("data-group-index");
        let groups = JSON.parse(localStorage.RCG2groups);
        groups.splice(indexToRemove, 1);
        localStorage.RCG2groups = JSON.stringify(groups);
        students = [];
        currentGroupIndex = -1;
        showStoragedGroups();
        showStudents();
    }
}

/**
 * Activa un prompt y, si se introduce un nombre, crea un grupo nuevo con ese nombre formado por los alumnos escogidos.
 */
function saveGroup()
{
    let newGroupName = prompt("Nombre del grupo a guardar:");
    if (newGroupName)
    {
        if (newGroupName.trim())
        {
            let newGroup = {name: newGroupName, students: Array.from(students)};
            let groups = JSON.parse(localStorage.RCG2groups);
            groups.push(newGroup);
            localStorage.RCG2groups = JSON.stringify(groups);
            showStoragedGroups();
        }
    }
}

/**
 * Al hacer click sobre un grupo lo selecciona y muestra los alumnos que lo forman.
 */
function selectStoragedGroup(event)
{
    if (event.target.className == "groupName")
    {
        let selectedGroupIndex = event.target.parentNode.getAttribute("data-group-index");
        students = JSON.parse(localStorage.RCG2groups)[selectedGroupIndex].students;
        currentGroupIndex = parseInt(selectedGroupIndex);
        showStudents();
    }
}

/**
 * Muestra por pantalla los grupos guardados en el localStorage.
 */
function showStoragedGroups(){
    if (localStorage.RCG2groups)
    {
        DOM.groups.innerHTML = "";
        JSON.parse(localStorage.RCG2groups).forEach((group, index) => 
        {
            let groupDiv = document.createElement("div");
            groupDiv.classList.add("storagedGroup");
            groupDiv.setAttribute("data-group-index", index);
            let groupName = document.createElement("p");
            groupName.classList.add("groupName");
            groupName.textContent = group.name;
            let removeGroupCross = document.createElement("img");
            removeGroupCross.setAttribute("src", "./assets/remove-cross.svg");
            removeGroupCross.classList.add("removeGroupCross");
            groupDiv.append(removeGroupCross);
            groupDiv.append(groupName);
            DOM.groups.append(groupDiv);
        })
    }
}

/**
 * Si se clicka una de las "x" de la lista de alumnos, elimina al alumno en cuestión.
 */
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
        removeStudentCross.setAttribute("src", "./assets/remove-cross.svg");
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