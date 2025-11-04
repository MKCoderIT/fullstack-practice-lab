"use strict"

const CreateItemList = (text) => {
    let LI = document.createElement("li")
    LI.textContent = text;
    return LI;
};


/* Practice (1) */
/* (1) */
const maxNumber1 = (a , b , c) => {
    let result = a >= b ? a >= c ? a : c : b >= c ? b : c
    let itemNumber;

    switch (result) {
        case a:
            itemNumber = 1;
            break;
        case b:
            itemNumber = 2;
            break;
        case c:
            itemNumber = 3;
            break;
    }
    return `The largest number : ${result} in item ${itemNumber}`;
}
/* (2) */
const maxNumber2 = (a , b , c , ...d) => {
    let listArge = [a,b,c,...d];
    let listleng = listArge.length;
    let result = {Value : 0 , CurrentIndex : null};

    for (let j = 0; j < listleng; j++) {
        if(result.Value < listArge[j]){
            result.Value = listArge[j];
            result.CurrentIndex = (j + 1);
        }
    }

    return `The largest number : ${result.Value} in item ${result.CurrentIndex}`;
}
/* (3) */
const maxNumber3 = (a , b , c , ...d) => {
    let listArge = [a,b,c,...d];
    const MaxNumber = Math.max(...listArge);
    const index = listArge.indexOf(MaxNumber) + 1;
    return `The largest number : ${MaxNumber} in item ${index}`;
}

//Result
//(1)
const M1P1Button = document.querySelector("#M1P1Button");
const M1P1ResultUL = document.querySelector("#M1P1ResultUL");

M1P1Button.addEventListener('click' , (e) => {
const M1P1Inputs = document.querySelectorAll(".M1P1Inputs");
e.preventDefault();
let M1P1List = [];
    for (const element of M1P1Inputs) {
        M1P1List.push(Number(element.value));
    }
M1P1ResultUL.innerHTML = "";
M1P1ResultUL.appendChild(CreateItemList(maxNumber1(...M1P1List)));

})

//(2)
const M2P1Button = document.querySelector("#M2P1Button");
const M2P1ResultUL = document.querySelector("#M2P1ResultUL");
document.querySelector("#M2P1Input").value = "11,2 ,5,  4,6, 3   ,7,8,9,1"

M2P1Button.addEventListener('click' , (e) => {
    e.preventDefault();

    const M2P1Input = document.querySelector("#M2P1Input");
    let M2P1List = String((M2P1Input.value)).split(",").map((currentValue) => Number(currentValue.trim()));
    M2P1ResultUL.innerHTML = "";
    M2P1ResultUL.appendChild(CreateItemList(maxNumber2(...M2P1List)));

})
//(3)
const M3P1Button = document.querySelector("#M3P1Button");
const M3P1ResultUL = document.querySelector("#M3P1ResultUL");
document.querySelector("#M3P1Input").value = "11,2 ,5,  4,6, 3   ,7,8,9,1"

M3P1Button.addEventListener('click' , (e) => {
    e.preventDefault();

    const M3P1Input = document.querySelector("#M3P1Input");
    let M3P1List = String((M3P1Input.value)).split(",").map((currentValue) => Number(currentValue.trim()));
    M3P1ResultUL.innerHTML = "";
    M3P1ResultUL.appendChild(CreateItemList(maxNumber3(...M3P1List)));

})

/* Practice (2) */
/* (1) */
const sum1 = (...d) => {
    let listArge = d;
    let listleng = listArge.length;
    let result = 0;

    for (let i = 0; i < listleng; i++) {
        result += d[i];
    }

    return `Sum of all numbers : ${result}`;
}
/* (2) */
const sum2 = (...args) => `Sum of all numbers : ${args.reduce((sum, val) => sum + val, 0)}`;

//Result
//(1)
const M1P2Button = document.querySelector("#M1P2Button");
const M1P2ResultUL = document.querySelector("#M1P2ResultUL");
document.querySelector("#M1P2Input").value = "11,2 ,5,  4,6, 3   ,7,8,9,1"

M1P2Button.addEventListener('click' , (e) => {
    e.preventDefault();

    const M1P2Input = document.querySelector("#M1P2Input");
    let M1P2List = String((M1P2Input.value)).split(",").map((currentValue) => Number(currentValue.trim()));
    M1P2ResultUL.innerHTML = "";
    M1P2ResultUL.appendChild(CreateItemList(sum1(...M1P2List)));

})
//(2)
const M2P2Button = document.querySelector("#M2P2Button");
const M2P2ResultUL = document.querySelector("#M2P2ResultUL");
document.querySelector("#M2P2Input").value = "11,2 ,5,  4,6, 3   ,7,8,9,1"

M2P2Button.addEventListener('click' , (e) => {
    e.preventDefault();

    const M2P2Input = document.querySelector("#M2P2Input");
    let M2P2List = String((M2P2Input.value)).split(",").map((currentValue) => Number(currentValue.trim()));
    M2P2ResultUL.innerHTML = "";
    M2P2ResultUL.appendChild(CreateItemList(sum2(...M2P2List)));

})

/* Practice (3) */

class Student {
    constructor(name , score){
        this.Name = name;
        this.Score = score;
    }
}
class StudentDB {
    constructor(){
        this.DataBase = new Map([['Ali Ahmadi' , 20],['Mohsen Nafar' , 8],['Hosein Riazi' , 12],['Nima Heidari' , 19]]);
    }
    CheckValidData(Student){
        return new Promise((resolve , reject) => {
            if (Student.Score === null || isNaN(Student.Score)) {
                reject("Score is not valid.");
            }
            else if(Student.Name === '' || Student.Name === null){
                reject("Name is not valid.");
            }
            else if (Student.Score < 0) {
                reject("Score cannot be less than 0.");
            } else if (Student.Score > 20) {
                reject("Score cannot be higher than 20.");
            } else {
                resolve(Student);
            }
        });
    }
    CheckExistItem (Student){
        return new Promise((resolve , reject) => {
            setTimeout(() => {
                try {
                    if (this.DataBase.size > 0) {
                        const exist = Array.from(this.DataBase.keys()).some(k => k.toLowerCase() === Student.Name.toLowerCase());
                        resolve(exist);
                    }else{
                        resolve(false);
                    }
                }
                catch (error) {
                    reject(`There was an error Checking information. Error Text : ${error}`);
                }
            } , 500)
            });
    }
    GetByName(Student){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    for (const [name , score] of this.DataBase) {
                        if (name.toLowerCase() === Student.Name.toLowerCase()) {
                            Student.Name = name;
                            resolve(Student);
                        }
                    }
                } catch (error) {
                    reject(`There was an error Get Name for information. Error Text : ${error}`);
                }
            } , 1000)
        })
    }
    AddItemToDataBase(Student){
        return new Promise((resolve , reject) => {
            this.CheckExistItem(Student)
            .then((result) => {
                setTimeout(() => {
                    try {
                        if (!result) {
                            this.DataBase.set(Student.Name , Student.Score);
                            resolve("Add data is successfully");
                        } else {
                            reject("Key already exists in the database.");
                        }
                    }
                    catch (error) {
                        reject(`There was an error adding information. Error Text : ${error}`);
                    }
                } , 1000)
            })
            .catch((error) => {
                    reject(error);
            })
        });
    }
    UpdateItemToDataBase(Student){
        return new Promise((resolve , reject) => {
            setTimeout(() => {
                this.CheckExistItem(Student)
                .then((result) => {
                    try {
                        if (result) {
                            return this.GetByName(Student);
                        } else {
                            reject("Key dont exists in the database.");
                        }
                    }
                    catch (error) {
                        reject(`There was an error Update information. Error Text : ${error}`);
                    }
                })
                .then((Student) => {
                    this.DataBase.set(Student.Name , Student.Score);
                    resolve("Update data is successfully");
                })
                .catch((error) => {
                    reject(`There was an error Update information. Error Text : ${error}`);
                })
            } , 1000)
        });
    }
    DeleteItemToDataBase(Student){
        return new Promise((resolve , reject) => {
            if(Student.Name === '' || Student.Name === null){
                reject("Name is not valid.");
            }
            else{
                setTimeout(() => {
                    this.CheckExistItem(Student)
                    .then((result) => {
                        try {
                            if (result) {
                                    return this.GetByName(Student);
                            } else {
                                reject("Name dont exists in the database.");
                            }
                        }
                        catch (error) {
                            reject(`There was an error Delete information. Error Text : ${error}`);
                        }
                    })
                    .then((Student) => {
                            this.DataBase.delete(Student.Name);
                            resolve("Delete data is successfully");
                        })
                    .catch((error) => {
                            reject(error);
                    })
                } , 1000)
            }
        });
    }

    get GetDatabase(){
        return this.DataBase;
    }
}



function TableItamCreator(Name , Value) {
    const TableItem = document.createElement("tr");
    const th = document.createElement("th")
    th.setAttribute('scope' , 'row');
    th.textContent = Name;
    TableItem.appendChild(th);

    let Position;
    switch (true) {
        case Value >= 18:
            Position = 1;
            break;
        case Value >= 15:
            Position = 2;
        break;
        case Value >= 10:
            Position = 3;
        break;
        default:
            Position = 4;
            break;
    }
    for (let index = 1; index <= 4; index++) {
        let td = document.createElement("td");
        if (index == Position) {
            td.style.backgroundColor = "#a3d3a2";
            td.textContent = "*";
        } else {
            td.textContent = "";
        }
        TableItem.appendChild(td);
    }



    const td = document.createElement("td")
    td.textContent = Value;
    TableItem.appendChild(td);

    return TableItem;
}
function refreshTable (Table , ListItem){
    Table.querySelector('tbody').innerHTML = '';

    let averageScore = 0;
    for (const [name , value] of ListItem) {
        Table.querySelector('tbody').appendChild(TableItamCreator(name, value));
        averageScore += value;
    }

    averageScore /= ListItem.size;
    Table.querySelector('tfoot td').textContent = averageScore.toFixed(2);
}
function ShowMessage(button , message , color , ID){
    if (ID != null) {
        clearTimeout(ID);
    }
    button.style.color = color;
    button.textContent = message;
    return setTimeout(() => {
        MessageID = null;
        button.textContent = "";
    }, 5000);
}
let MessageID = null;


/* (1) */
const M1P3AddButton = document.getElementById("M1P3AddButton");
const M1P3AddDataTable = document.getElementById("M1P3AddDataTable");
const M1P3MessageBox = document.getElementById("M1P3MessageBox");
const M1P3UpdateButton = document.getElementById("M1P3UpdateButton");
const M1P3DeleteButton = document.getElementById("M1P3DeleteButton");

const StudentDBOj = new StudentDB();
refreshTable(M1P3AddDataTable, StudentDBOj.GetDatabase);

M1P3AddButton.addEventListener('click' ,(e) => {
    e.preventDefault();

    const M1P3Name = String(document.getElementById("M1P3Name").value).trim();
    const M1P3Score = document.getElementById("M1P3Score").value === '' ? null : Number(document.getElementById("M1P3Score").value);
    const StudentOb = new Student(M1P3Name , M1P3Score);

    StudentDBOj.CheckValidData(StudentOb)
    .then((Student) => {
        return StudentDBOj.AddItemToDataBase(Student);
    })
    .then((result) => {
        MessageID = ShowMessage(M1P3MessageBox , result , 'green' , MessageID);
        refreshTable(M1P3AddDataTable, StudentDBOj.GetDatabase);
    })
    .catch((err) => {
        MessageID = ShowMessage(M1P3MessageBox , err , 'red' , MessageID);
    });

})
M1P3UpdateButton.addEventListener('click' ,(e) => {
    e.preventDefault();

    const M1P3Name = String(document.getElementById("M1P3Name").value).trim();
    const M1P3Score = document.getElementById("M1P3Score").value === '' ? null : Number(document.getElementById("M1P3Score").value);
    const StudentOb = new Student(M1P3Name , M1P3Score);

    StudentDBOj.CheckValidData(StudentOb)
    .then((Student) => {
        return StudentDBOj.UpdateItemToDataBase(Student);
    })
    .then((result) => {
        MessageID = ShowMessage(M1P3MessageBox , result , 'green' , MessageID);
        refreshTable(M1P3AddDataTable, StudentDBOj.GetDatabase);
    })
    .catch((err) => {
        MessageID = ShowMessage(M1P3MessageBox , err , 'red' , MessageID);
    });

})
M1P3DeleteButton.addEventListener('click' ,(e) => {
    e.preventDefault();
    const M1P3Name = String(document.getElementById("M1P3Name").value).trim();
    const StudentOb = new Student(M1P3Name);


    StudentDBOj.DeleteItemToDataBase(StudentOb)
    .then((result) => {
        MessageID = ShowMessage(M1P3MessageBox , result , 'green' , MessageID);
        refreshTable(M1P3AddDataTable, StudentDBOj.GetDatabase);
    })
    .catch((err) => {
        MessageID = ShowMessage(M1P3MessageBox , err , 'red' , MessageID);
    });

})

/* Practice (4) */
/* (1) */
const Bugatti = {
    Brand : "GX10",
    Model : "2020",
    Color : "Red",
    PrintCar : ({Brand = this.Brand, Model = this.Model, Color = this.Color}) => `Car information => Brand : ${Brand} , Model : ${Model} , Color : ${Color}.`
}

const {Brand , Model : Madel , Color , PrintCar} = Bugatti;
console.log(Brand , Madel , Color , PrintCar(Bugatti));


/* Practice (5) Symbol*/

const secretCode = {
    code : null,
    setCode(value){
        this.code = value.match(/\d+/g) || 0;
    },
    [Symbol.match](){
        return `(${this.code})💀ACCESS GRANTED💀`
    },
}
const secret = "This is my secret code: 1337";
secretCode.setCode(secret);

/* Practice (6) CallBack and Iterator*/
class Customer {
    constructor(name , username , products = []){
        this.name = name;
        this.username = username;
        this.products = products;
    }
    set addProduct (productName){
        this.products.push(productName);
    }
    get returnProduct (){
        return this.products.entries();
    }
    *[Symbol.iterator](){
            for (let i = 0; i < this.products.length; i++) {
                    yield this.products[i];

            }
        }
    }
    const cr1 = new Customer("Ali" , "AliX123" , ['pencile' , 'pen']);
    cr1.addProduct = 'laptob';
    cr1.addProduct = 'mouse';

    for (const element of cr1) {
        console.log(element);
    }
