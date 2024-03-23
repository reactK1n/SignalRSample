/*const { signalR } = require("./signalr");
*/

//create connection
/*var connectionUserCount = new signalR.HubConnectionBuilder()
   .configureLogging(signalR.LogLevel.Information)//for logging in which we have trace, info and many
    .withUrl("/hubs/userCount", signalR.HttpTransportType.webSockets).build(); //we can decided not to add , signalR.HttpTransportType.webSockets if we are using websocket unless we want to use SSE or longpollnig*/

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build(); 


//connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("tvc");
    newCountSpan.innerText = value.toString();
})


connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("ac");
    newCountSpan.innerText = value.toString();
})

//invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
     connectionUserCount.send("NewWindowLoaded"); //send is for method that does not return anyting
   // connectionUserCount.invoke("NewWindowLoaded").then((value) => console.log(value)); //invoke for method that returns something
}


//start connection
function fulfilled() {
    console.log("connection to the user hub succesful");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("connection to the user hub rejected");

}

connectionUserCount.start().then(fulfilled, rejected);