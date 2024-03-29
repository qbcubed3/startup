var surveyItems = [
    "Morning meditation",
    "Worked out",
    "Ate Breakfast",
    "Talked to a Friend",
    "Learned something new",
    "Took a walk",
    "Listened to music",
    "Did a Hobby",
    "Read a book",
    "Wrote in a journal",
    "Ate lunch",
    "Took Breaks from Work",
    "Disconnect from technology for a bit",
    "Had coffee/tea",
    "Did something creative",
    "Help someone in need",
    "Planned for future goals",
    "Laughed or watched something funny",
    "Attend a social event",
    "Ate Dinner",
    "Had restful sleep",
    "Unplugged before bedtime"]


document.addEventListener('DOMContentLoaded', function() {
    createList(surveyItems);
    var happinessRange = document.getElementById('happinessRange');
    var selectedHappiness = document.getElementById('selectedHappiness');
    happinessRange.addEventListener('input', updateValue);
    
    function updateValue() {
        selectedHappiness.textContent = happinessRange.value;
    }
});

document.getElementById("addNew").addEventListener('click', addItem);
document.getElementById("remove").addEventListener('click', deleteItem);
document.getElementById("submit").addEventListener('click', submitSurvey);

async function createList(array) {
    var list = document.createElement("ul");

    list.id = "listContainer";
    const body2 = {
        authToken: localStorage.getItem("auth")
    }
    try{
        response = await fetch('/api/survey/get', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body2)
        });
    }
    catch (error){
        console.log(error.message);
    }
    const data = await response.json();
    const items = data.items;

    items.forEach(function(item) {
        var label = document.createElement('label');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.textContent = item;
        checkbox.id = item;

        checkbox.style.padding = 0;

        label.textContent = item;

        list.appendChild(checkbox);
        list.appendChild(label);
        list.appendChild(document.createElement('br'));
    })
    const body = {
        authToken: localStorage.getItem("auth")
    }
    try{
        const response = await fetch('/api/survey/update', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body)
        });
    }
    catch{
        return;
    }


    document.getElementById('checkboxes').appendChild(list);
}

async function addItem(){
    var newItem = document.getElementById("newItem").value;
    const auth = localStorage.getItem("auth");
    const body = {
        authToken: auth,
        item: newItem
    }
    try{
        const response = await fetch('/api/survey/add', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body)
        });
    }
    catch{
        return;
    }
    await updateList();

    document.getElementById("newItem").value = "";
}

async function updateList(){
    var list = document.getElementById("listContainer");
    var response;
    list.innerHTML = "";
    const body = {
        authToken: localStorage.getItem("auth")
    }
    try{
        response = await fetch('/api/survey/update', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body)
        });
    }
    catch (error){
        console.log(error.message);
    }
    const data = await response.json();
    const items = data.items;
    items.forEach(function(item) {
        var label = document.createElement('label');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.textContent = item;
        checkbox.id = item;

        label.textContent = item;

        list.appendChild(checkbox);
        list.appendChild(label);
        list.appendChild(document.createElement('br'));
    });
}


async function deleteItem() {
    var remove = document.getElementById("deleteItem").value;
    const body = {
        authToken: localStorage.getItem("auth"),
        item: remove
    }
    try{
        const response = await fetch('api/survey/delete', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body),
        });
    }
    catch{
        return;
    }

    updateList();
    document.getElementById("deleteItem").value = "";

}

async function submitSurvey() {
    const date = new Date();
    var list = document.getElementById("checkboxes");
    var newDay = {}
    var key = "";
    var checks = document.getElementById("checkboxes").getElementsByTagName('input');
    console.log(checks);
    for(i=0; i < checks.length; i++){
        console.log(checks[i])
        key = checks[i].id;
        newDay[key] = checks[i].checked;
    }
    newDay['happiness'] = document.getElementById('happinessRange').value;
    console.log("adding score");
    const data = {
        auth: localStorage.getItem("auth"),
        scores: newDay
    }
    //trackings[date] = newDay;
    try{
        var response = await fetch('/api/survey/answers', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        });
    }
    catch{
        console.log("ERROR")
        return;
    }
    updateList();
}

async function randomJoke() {
    var joke;
    try{
        fetch('https://official-joke-api.appspot.com/jokes/random')
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const setup = data.setup;
                const punchline = data.punchline;
                document.getElementById("setup").textContent = setup;
                document.getElementById("punchline").textContent= punchline;
                console.log(setup + " : " + punchline);
            })      
    }
    catch (error){
        console.log('bad request')
        return;
    }
    console.log(joke);
}

randomJoke();


document.getElementById("logout").addEventListener('click', logout);

async function logout(){
  const body = {
    authToken: localStorage.getItem("auth")
  }
  try{
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
  }
  catch{
    console.log("ERROR")
    return;
  }
  localStorage.removeItem("auth");
  console.log("logged out");
}
