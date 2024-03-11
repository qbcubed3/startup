const trackings = {
    "2024-02-28": {
      Worked: false,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-02-29": {
      Worked: true,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-03-01": {
      Worked: false,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-02": {
      Worked: false,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-03": {
      Worked: true,
      Had_Breakfast: false,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-04": {
      Worked: true,
      Had_Breakfast: true,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-05": {
      Worked: false,
      Had_Breakfast: false,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-06": {
      Worked: true,
      Had_Breakfast: false,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-07": {
      Worked: false,
      Had_Breakfast: false,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-08": {
      Worked: true,
      Had_Breakfast: true,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
  };
let amts = {

}

let ratios = {};

function createAmts(){
    Object.values(trackings).forEach(day => {
        Object.entries(day).forEach(([key, value]) => {
            if (key === 'happiness'){
                return;
            }
            if (!(key in amts)){
                if (value){
                    let newItem = {seen: 1, happiness: day['happiness']};
                    amts[key] = newItem;
                }
            }
            else{
                if (value){
                    amts[key]['seen'] += 1;
                    amts[key]['happiness'] += day['happiness'];
                }
            }
        })
    })
}

function getRatios() {
    var data = [];
    Object.values(amts).forEach(activity =>{
        console.log(activity);
        var point = (activity['happiness']/activity['seen']);
        data.push(point);
    })
    return data;
}

function getLabels(){
    var data = [];
    Object.keys(amts).forEach(activity =>{
        data.push(activity);
    })
    return data;
}
createAmts();


var ratioData = getRatios();
var graphLabels = getLabels();

const graphData = {
    
}

console.log(ratioData);
const chart = document.getElementById('barGraph');

new Chart(chart, {
    type: 'bar',
    data: {
        labels: graphLabels,
        datasets: [{
        label:'Average Happiness for Activity', 
        data: ratioData,
        borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: false
            }
        }
    }
});
