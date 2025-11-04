"use strict";


var ul = document.querySelector("ol");

ul.addEventListener('copy', function (e) {
    e.preventDefault()
    var returntext = "dont copy fuck you";

    if (e.target.textContent != returntext) {
        var defaultText = e.target.textContent;
        e.target.textContent = returntext;
        setTimeout(function(){
            e.target.textContent = defaultText;
        }, 3000)
    }
});

function addListItem(list){
    var li = document.createElement("li");
    var length = (list.length + 1)
    li.classList.add("group_item");
    li.id = `group_item${length}`;
    li.textContent = `This is Item (${length})`;
    return li;
}
function showError(ErorrText){
    var list = document.getElementsByClassName("errors") || 0;
    var p = document.createElement("p");
    var ErrorNumber = (list.length + 1)
    p.classList.add("errors");
    p.id = `errors_Item${ErrorNumber}`;
    p.textContent = `${ErorrText}`;
    p.style.color = "red";
    return p;
}

var order = document.getElementsByClassName("group_item");

var addButton = document.getElementById("addItemButton");
var removeButton = document.querySelector("#removeItemButton");
var addButtonInput = document.querySelector("#addItemButtonInput");
var addInput = document.querySelector("#addItemInput");
var removeAllButton = document.querySelector("#removeAllItemButton");

addButton.onclick = function(){
document.querySelector("ol").appendChild(addListItem(order));
}
removeButton.addEventListener("click" , function(){
    var x = document.querySelector("ol").lastElementChild;
    if(x){
    x.remove();
    }
});

addButtonInput.addEventListener("click" , function(){
    if(confirm("Are you sure about the entered value?")){
        try {
            var value = Number(addInput.value);
            if(typeof value == "number"){
                if(value > 0){
                    for (let i = 1; i <= value; i++) {
                        document.querySelector("ol").appendChild(addListItem(order));
                    }
                }
                else{
                    document.querySelectorAll(".errors").forEach(e => e.remove());
                    document.querySelector("#errorBox").appendChild(showError("Please enter a number greater than zero."));
                }
            }else{
                document.querySelectorAll(".errors").forEach(e => e.remove());
                document.querySelector("#errorBox").appendChild(showError("Please enter a number."));
            }
        } catch (e) {
            document.querySelectorAll(".errors").forEach(e => e.remove());
            document.querySelector("#errorBox").appendChild(showError("Please enter a number."));
        }

    }
    setTimeout(() => {
        document.querySelectorAll(".errors").forEach(e => e.remove());
    }, 4000);
})
removeAllButton.addEventListener("click" , function(){
    var x = Array.from(document.querySelector("ol").children);
    x.forEach(function(Item){Item.remove();})
})
