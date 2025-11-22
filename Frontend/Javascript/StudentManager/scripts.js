const students = [
    { id: 1, name: "Kamyar", age: 18, scores: [18, 17, 19] },
    { id: 2, name: "Ali", age: 19, scores: [12, 14, 10] },
    { id: 3, name: "Sara", age: 17, scores: [20, 19, 18] },
    { id: 4, name: "Reza", age: 20, scores: [15, 16, 14] },
    { id: 5, name: "Nika", age: 18, scores: [9, 11, 8] },
    { id: 6, name: "Mahdi", age: 21, scores: [16, 18, 17] }
];

function Reduce(arry, func, initialvalue = 0) {
    let sum = initialvalue;
    for (let i = 0; i < arry.length; i++) {
        sum = func(sum, arry[i]);
    }
    return sum;
}

function GPA(studentsScores) {
    return Reduce(studentsScores, (acc, cur) => acc + cur) / studentsScores.length;
}


const studentTableBody = document.querySelector('.students__table > tbody');
const studentTableFormBody = document.querySelector('.students__form--table > tbody');

function StudentTableUpdate() {
    studentTableBody.innerHTML = "";

    students.forEach(student => {
        const tr = document.createElement("tr");

        const nameTD = document.createElement("td");
        nameTD.textContent = student.name;

        const ageTD = document.createElement("td");
        ageTD.textContent = student.age;

        const idTD = document.createElement("td");
        idTD.classList.add("hidden");
        idTD.textContent = student.id;

        tr.appendChild(nameTD);
        tr.appendChild(ageTD);
        tr.appendChild(idTD);

        studentTableBody.appendChild(tr);
    });
}

StudentTableUpdate();

function StudentformTableUpdate(id) {
    const student = students.find(s => s.id === Number(id));
    if (!student) return;

    const nameTag = document.querySelector(".students__form--name > p");
    const ageTag = document.querySelector(".students__form--age > p");
    const GPATag = document.querySelector(".students__form--GPA > p");

    nameTag.textContent = student.name;
    ageTag.textContent = student.age;
    GPATag.textContent = GPA(student.scores).toFixed(2); // مثلا 18.67

    const tr = document.createElement("tr");

    const physicTD = document.createElement("td");
    physicTD.textContent = student.scores[0];

    const mathTD = document.createElement("td");
    mathTD.textContent = student.scores[1];

    const chemiTD = document.createElement("td");
    chemiTD.textContent = student.scores[2];

    tr.appendChild(physicTD);
    tr.appendChild(mathTD);
    tr.appendChild(chemiTD);

    studentTableFormBody.innerHTML = "";
    studentTableFormBody.appendChild(tr);
}


[...studentTableBody.children].forEach(row => {
    row.addEventListener("click", e => {
        const clickedRow = e.currentTarget;
        const id = clickedRow.children[2].textContent;
        StudentformTableUpdate(id);
    });
});
