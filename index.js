/**************************************************
**| Notes and plans to self before writing code |**
***************************************************

1. Understand the structure of a table in html, so that you can build one using javascript code

2. Periodically generate new freelancers and add them to the table
	2.1 create addNewFreelancer function
	2.2 you'll need to create an array of names and professions to choose from at random

3. the new freelancer function (see 2.1) needs to call a computeAverage function

4. you will probably have an initialize function that sets up the table and any other initial html content, and that starts the repetitive loop of new freelancers constantly being generated

**/

//html elements that will be mutated throughout the course of the program
const body = document.querySelector("body");
const avgText = document.createElement("div");
//avg starting price
let avg = 0;
let numFreelancers = 0;
const table = getTable();
//names & occupations arrays
const names = ["Alice", "Carol", "Bob", "Hayden", "Silas", "Justin"];
const occupations = [
  "Writer",
  "Teacher",
  "Programmer",
  "Poet",
  "Musician",
  "Chef",
];
initialize();
//allows a new freelancer to be generated every 1000 ms
const intervalId = setInterval(genNewFreelancer, 1000);

//calls necessary functions, creates content, and appends all content to body at the end
function initialize() {
  //declaring text elements that wont be needed after initalization
  const header1 = document.createElement("h1");
  const header2 = document.createElement("h2");
  //adding content to all elements
  header1.textContent = "Freelancer Forum";
  avgText.textContent = "The average starting price is $" + avg + ".";
  header2.textContent = "Available Freelancers";
  //appending all text elements to body
  body.append(header1);
  body.append(avgText);
  body.append(header2);
  body.append(table);
}

//returns an html table with headers and first freelancers already set up
function getTable() {
  const tabHeadLabels = ["Name", "Occupation", "Starting Price"];
  const initialFreelancers = [
    {
      name: "Alice",
      occupation: "Writer",
      startingPrice: 30,
    },
    {
      name: "Bob",
      occupation: "Teacher",
      startingPrice: 50,
    },
    {
      name: "Carol",
      occupation: "Programmer",
      startingPrice: 70,
    },
  ];
  const tab = document.createElement("table");
  const tabHeaderRow = document.createElement("tr");
  //appending all table headers to tabHeaderRow
  for (i = 0; i < tabHeadLabels.length; i++) {
    const tabHeader = document.createElement("th");
    tabHeader.innerText = tabHeadLabels[i];
    tabHeaderRow.append(tabHeader);
  }
  //appending tabHeaderRow to our table
  tab.append(tabHeaderRow);
  //adding all freelancers in initialFreelancer array to our table
  for (i = 0; i < initialFreelancers.length; i++) {
    //letting the addFreelancer function do the work
    addFreelancer(tab, initialFreelancers[i]);
  }
  return tab;
}

//adds a new freelancer to the table
function addFreelancer(tab = table, freelancer) {
  //declaring dom elements
  const newFreeLancerRow = document.createElement("tr");
  const freelancerName = document.createElement("td");
  const freeLancerOccupation = document.createElement("td");
  const freelancerPrice = document.createElement("td");
  //adding content
  freelancerName.innerText = freelancer.name;
  freeLancerOccupation.innerText = freelancer.occupation;
  freelancerPrice.innerText = freelancer.startingPrice;
  //appending content
  newFreeLancerRow.append(freelancerName);
  newFreeLancerRow.append(freeLancerOccupation);
  newFreeLancerRow.append(freelancerPrice);
  tab.append(newFreeLancerRow);
  //updating average price
  updateAveragePrice(freelancer.startingPrice);
}

//randomly generates a new freelancer and passes it to the addFreeLancer function;
function genNewFreelancer() {
  //only generate a new freelancer is there's less than 10
  if (numFreelancers < 10) {
    const newFreelancer = {
      name: names[Math.floor(Math.random() * names.length)],
      occupation: occupations[Math.floor(Math.random() * occupations.length)],
      startingPrice: Math.floor(Math.random() * 150),
    };
    addFreelancer(table, newFreelancer);
  } else {
    //if theres more than 10 freelancers stop generating new ones
    clearInterval(intervalId);
  }
}

//updates the average
function updateAveragePrice(price) {
  avg = (avg * numFreelancers + price) / (numFreelancers + 1);
  numFreelancers++;
  avgText.innerText = "The average starting price is $" + avg + ".";
}
