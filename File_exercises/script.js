"use strict";

function prt(index) {
    console.log(index);
}


var list_array = new Array(1,4,3,2,5,20,7,8,9,11,10,12,13,14,15,18,17,16,19,6);
var total = 0;

/* (1) */



//The first Method
for(var i = 0; i < list_array.length; i++){
    total += list_array[i];
}

//The second Method
list_array.forEach(X => {
    total += X;
});

//The third Method
prt(list_array.reduce(function (Total , CurrentValue) {Total += CurrentValue; return Total} , 0));

/* (2) */
function Arrays(array){
    this.ArrayVariable = array;
}

Arrays.prototype.AddIndex = function (value) {

    if(this.ArrayVariable.length == 0||this.ArrayVariable == undefined || this.ArrayVariable == null){
        this.ArrayVariable = [];
        this.ArrayVariable[0] = value;
        return this;
    }else{
        if(this.ArrayVariable[this.ArrayVariable.length] == undefined || this.ArrayVariable[this.ArrayVariable.length] == null){
            this.ArrayVariable[this.ArrayVariable.length] = value;
        }else{
            for (let i = (this.ArrayVariable.length - 1); i < true; i++) {
                if(this.ArrayVariable[i] == undefined || this.ArrayVariable[i] == null){
                    this.ArrayVariable[i] = value;
                    break;
                }
            }
        }
    }
    return this;
}
Arrays.prototype.filterArray = function (func){
    var returnArray = [];
    var ArrayIndexID = 0;
    for (let i = 0; i < this.ArrayVariable.length; i++) {
        if(func(this.ArrayVariable[i])){
            returnArray[ArrayIndexID] = this.ArrayVariable[i];
            ArrayIndexID++;
        }
    }
    this.ArrayVariable = returnArray;
    return this;
}
Arrays.prototype.sortArray = function (func) {
    var lng = (this.ArrayVariable).length;
    var result = this.ArrayVariable;
    for (let i = 0; i < lng - 1; i++) {
        for (let j = 0; j < lng - 1 - i; j++) {
                if (func(result[j] , result[j + 1]) > 0) {
                    var save = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = save;
                }
        }

    }
    this.ArrayVariable = result;
    return this;
}

let arraya = new Array(2,55,35,24,26,24,6,63);
arraya.sortArray((x , y)=> y - x)
prt(arraya);

var ArrayMethods = new Arrays(list_array);
ArrayMethods.filterArray(x => x>5).sortArray((x , y)=> y - x);
prt(ArrayMethods.ArrayVariable);

/* (3) */
var person = {
    name : "Ali",
    age : 24,
    job : "Programmer",
    introducing : function () {
        prt(`my name is ${this.name}. I am ${this.age} years old and I'm a ${this.job}`);
    }
}
person.introducing();

/* (4) */
person.name = "Reza";
person.introducing();

/* (5) */
function Animal(Name){
    this.name = Name;
}
Animal.prototype.greet = function (){prt(`${this.name} say Hello`)}

var CatObject = new Animal("cat");
CatObject.greet();

/* (6) */
function dog(name) {
    Animal.call(this, name);
}

dog.prototype = Object.create(Animal.prototype);
dog.prototype.constructor = dog;

const doggo = new dog("Rocky");
doggo.greet();
