"use strict"

var UserUnorderList = document.querySelector("#UserUnorderList");
var UserGetButton = document.querySelector("#UserGetButton");
var Resetlist = document.querySelector("#Resetlist");

function ListItemCreator(TextContent) {
    var ListItem = document.createElement("li");
    var ListIdNumber = UserUnorderList.children.length + 1;

    ListItem.classList.add("UserUnorderListItem");
    ListItem.setAttribute("id" , `UserUnorderListItem_${ListIdNumber}`),
    ListItem.textContent = TextContent;
    UserUnorderList.appendChild(ListItem);
}

if(UserUnorderList.children.length == 0){
    UserUnorderList.innerHTML = "";
    ListItemCreator("List item is null. Please click the button");
}
UserGetButton.addEventListener("click", async() =>{
    try {
        UserUnorderList.innerHTML = "";
        ListItemCreator("The request is loading. Please wait...");

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) throw new Error(`Request failed. Error code : ${response.status}` );

        const ResultData = await response.json();
        if(ResultData.length > 0){
            UserUnorderList.innerHTML = "";
            ResultData.forEach(object => {
                ListItemCreator(`[Username: ${object.username}]   [Name: ${object.name}]   [Email: ${object.email}]`);
            });
        }else{
            ListItemCreator("List item is null. Please click the button");
        }
    } catch (error) {
        UserUnorderList.innerHTML = "";
        ListItemCreator("Can not GET data from server. Status : " + error);
    }
})

Resetlist.addEventListener("click" , function () {
    UserUnorderList.innerHTML = "";
    ListItemCreator("List item is null. Please click the button");
})


// UserGetButton.addEventListener("click", function() {
//     var AJAX = new XMLHttpRequest();
//     AJAX.open('GET', 'https://jsonplaceholder.typicode.com/users' , true);



//     AJAX.addEventListener("loadstart", function () {
//         UserUnorderList.innerHTML = "";
//         ListItemCreator("The request is loading. Please wait...");
//     })
//     AJAX.addEventListener("readystatechange", function() {
//         if (AJAX.readyState === XMLHttpRequest.OPENED) {
//             UserUnorderList.innerHTML = "";
//             ListItemCreator("Request has been opened.");
//         }
//         else if (AJAX.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
//             UserUnorderList.innerHTML = "";
//             ListItemCreator("The request is loading. Please wait...");
//         }
//         else if (AJAX.readyState === XMLHttpRequest.LOADING) {
//             UserUnorderList.innerHTML = "";
//             ListItemCreator("The request is loading. Please wait...");
//         }
//         else if (AJAX.readyState === XMLHttpRequest.DONE){
//             if (AJAX.status === 200) {
//                 UserUnorderList.innerHTML = "";
//                 var ResultData = JSON.parse(AJAX.responseText);
//                 ResultData.forEach(object => {
//                     ListItemCreator(`[Username: ${object.username}]   [Name: ${object.name}]   [Email: ${object.email}]`);
//                 });
//             } else {
//                 UserUnorderList.innerHTML = "";
//                 ListItemCreator("Cannot GET file from server. Status: " + AJAX.status);
//             }
//         }else{
//             UserUnorderList.innerHTML = "";
//             ListItemCreator("Request failed. Please try again later.");
//         }
//     });
//     AJAX.addEventListener("error", function () {
//         UserUnorderList.innerHTML = "";
//         ListItemCreator("Request failed. Please try again later.");
//     });
//     AJAX.send();
// });





var PostDataForm = document.querySelector("#PostDataForm");
var UsernameInput = document.querySelector("#UsernameInput");
var NameInput = document.querySelector("#NameInput");
var StatusMessage = document.querySelector("#StatusMessage");

var SetTimeID;
function AlertMessage(color , text) {
    if (SetTimeID) {
        clearTimeout(SetTimeID);
    }
    StatusMessage.style.color = color;
    StatusMessage.textContent = text;
    SetTimeID = setTimeout(() => StatusMessage.textContent = "",5000)
}

PostDataForm.addEventListener("submit" , async e => {
    e.preventDefault();

    AlertMessage('blue' , 'Data is ready to be sent...');

    var usernameVariable = UsernameInput.value;
    var nameVAriable = NameInput.value;

    var JSONrequest = JSON.stringify({
        username: usernameVariable,
        name: nameVAriable,
    })

    try {
        const request = await fetch('https://jsonplaceholder.typicode.com/users' , {
            method : 'POST',
            headers : {
            'Content-Type' : 'application/json',
            },
            body : JSONrequest
        });
        if(request.status === 201 && request.ok){
            return AlertMessage('green' , `The operation was successful.`);
        }else{
            return AlertMessage('red' , `Cannot Post file to server. Status : ${request.status}`);
        }

    } catch (error) {
        AlertMessage('red' , `Request failed. Please try again later. ${error}`);
    }

})

// PostDataForm.addEventListener("submit" , function (e) {
//     e.preventDefault();
//     StatusMessage.textContent = "Data is ready to be sent...";

//     var usernameVariable = UsernameInput.value;
//     var nameVAriable = NameInput.value;
//     var JSONrequest = JSON.stringify({
//         username: usernameVariable,
//         name: nameVAriable,
//     })

//     if (SetTimeID) {
//         clearTimeout(SetTimeID);
//     }

//     var AJAX = new XMLHttpRequest();
//     AJAX.open('Post', 'https://jsonplaceholder.typicode.com/users' , true);
//     AJAX.setRequestHeader("Content-Type", "application/json");


//     AJAX.addEventListener("loadstart", function () {
//         StatusMessage.textContent = "Sending information... Please wait.";
//         StatusMessage.style.color = "blue";
//     });

//     AJAX.addEventListener("readystatechange", function () {
//         if (AJAX.readyState === XMLHttpRequest.LOADING) {
//             StatusMessage.textContent = "Sending information... Please wait.";
//             StatusMessage.style.color = "blue";
//         }
//     });


//     AJAX.addEventListener("load", function() {
//         if (AJAX.readyState === XMLHttpRequest.DONE){
//             setTimeout(function(){
//             if (AJAX.status === 201) {
//                 StatusMessage.textContent = "The operation was successful.";
//                 StatusMessage.style.color = "green";
//                 clearTimeout(SetTimeID);
//             } else {
//                 UserUnorderList.innerHTML = "";
//                 StatusMessage.textContent = "Cannot Post file to server. Status: " + AJAX.status;
//                 StatusMessage.style.color = "red";
//             }
//         } , 2000)
//         }else{
//             UserUnorderList.innerHTML = "";
//             StatusMessage.textContent = "Request failed. Please try again later.";
//             StatusMessage.style.color = "red";
//         }
//     });
//     AJAX.addEventListener("error", function () {
//         UserUnorderList.innerHTML = "";
//         StatusMessage.textContent = "Request failed. Please try again later.";
//         StatusMessage.style.color = "red";
//     });

//     SetTimeID = setTimeout(() => StatusMessage.textContent = "",5000)
//     AJAX.send(JSONrequest);
// })
