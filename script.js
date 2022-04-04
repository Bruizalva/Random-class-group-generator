var students = ["María", "Jose Luis", "Ricardo", "Ernesto", "Josefina", "Timmy", "Joseph", "Macarena", "Jimmy", "Adolfo", "Lucía", "Ángel", "Jacobina"];

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