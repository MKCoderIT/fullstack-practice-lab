const students = [
    {
        id: 1,
        name: "Kamyar",
        age: 18,
        scores: [18, 17, 19]
    },
    {
        id: 2,
        name: "Ali",
        age: 19,
        scores: [12, 14, 10]
    },
    {
        id: 3,
        name: "Sara",
        age: 17,
        scores: [20, 19, 18]
    },
    {
        id: 4,
        name: "Reza",
        age: 20,
        scores: [15, 16, 14]
    },
    {
        id: 5,
        name: "Nika",
        age: 18,
        scores: [9, 11, 8]
    },
    {
        id: 6,
        name: "Mahdi",
        age: 21,
        scores: [16, 18, 17]
    }
];

function reduce(arry , func , initialvalue = 0){
    let sum = initialvalue;
    for (let i = 0; i < arry.length; i++) {
        sum = func(sum , arry[i]);
    }
    return sum;
}

function GPA (studentsScores){
    return (reduce(studentsScores , (acc , cur) => acc + cur) / studentsScores.length);
}

