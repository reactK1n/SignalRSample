/*const { signalR } = require("./signalr");
*/

//create connection
/*var connectionUserCount = new signalR.HubConnectionBuilder()
   .configureLogging(signalR.LogLevel.Information)//for logging in which we have trace, info and many
    .withUrl("/hubs/userCount", signalR.HttpTransportType.webSockets).build(); //we can decided not to add , signalR.HttpTransportType.webSockets if we are using websocket unless we want to use SSE or longpollnig*/

var connectionDeathlyHallows = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyhallows").build(); 
    var cloakCountSpan = document.getElementById("cloakCounter");
    var stoneCountSpan = document.getElementById("stoneCounter");
    var wandCountSpan = document.getElementById("wandCounter");


//connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {

    cloakCountSpan.innerText = cloak.toString();
    stoneCountSpan.innerText = stone.toString();
    wandCountSpan.innerText = wand.toString();
})


//start connection
function fulfilled() {

    console.log("connection to the user hub succesful");
    connectionDeathlyHallows.invoke("GetRaceStatus").then((race) => {
        cloakCountSpan.innerText = race.cloak.toString();
        stoneCountSpan.innerText = race.stone.toString();
        wandCountSpan.innerText = race.wand.toString();
    });

}

function rejected() { 
    console.log("connection to the user hub rejected");

}

connectionDeathlyHallows.start().then(fulfilled, rejected);