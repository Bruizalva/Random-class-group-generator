var students = ["María", "Jose Luis", "Ricardo", "Ernesto", "Josefina", "Timmy", "Joseph", "Macarena", "Jimmy", "Adolfo", "Lucía", "Ángel", "Jacobina"];
var groupSize = groupSizeInput.value;

const DOM = {
    outputSection: document.querySelector("#outputSection"),
    generateGroupsBtn: document.querySelector("#generateGroupsBtn"),
    groupSizeInput: document.querySelector("#groupSizeInput"),
    classGroups: document.querySelector("#classGroups"),
}

DOM.generateGroupsBtn.addEventListener("click", showGroups);


function showGroups()
{
    let groups = makeGroups(students, 4);
    let groupId = 1;
    groups.forEach(group =>
    {
        let groupDiv = document.createElement("div");
        groupDiv.classList.add("classGroup");
        let groupIdHeader = document.createElement("h3");
        groupIdHeader.textContent = "Grupo " + groupId++;
        groupDiv.append(groupIdHeader);
        group.forEach(student => 
        {
            studentP = document.createElement("p");
            studentP.classList.add("student");
            studentP.textContent = student;
            groupDiv.append(studentP);
        })
        DOM.classGroups.append(groupDiv);
    })
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