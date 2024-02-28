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

var trackings = []

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

function createList(array) {
    var list = document.createElement("ul");

    list.id = "listContainer";

    array.forEach(function(item) {
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

    document.getElementById('checkboxes').appendChild(list);
}

function addItem(){
    var newItem = document.getElementById("newItem").value;

    if(newItem.trim() !== ""){
        surveyItems.push(newItem);

        updateList();
    }

    document.getElementById("newItem").value = "";
    console.log(surveyItems);
}

function updateList(){
    var list = document.getElementById("listContainer");

    list.innerHTML = "";
    surveyItems.forEach(function(item) {
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

function deleteItem() {
    var remove = document.getElementById("deleteItem").value;

    console.log(remove);
    var index = surveyItems.indexOf(remove);

    if (index !== -1){
        surveyItems.splice(index, 1);
        updateList();
    }

    document.getElementById("deleteItem").value = "";

}

function submitSurvey() {

}
