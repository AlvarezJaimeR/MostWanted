"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

searchByCriteria(data);

//main search by criteria function
function searchByCriteria(people){
  let userSearchCriteria = prompt('What characteristics do you want to search for?: Gender? Age? ').toLowerCase();
  switch (userSearchCriteria){
    case 'gender':
      let genderSearchCriteria = prompt('male or female: ').toLowerCase();
      let genderList = sortByGender(genderSearchCriteria, people);
      outputTheNames(genderList);
      break;
    case 'age':
      let birthdayList = calculateAge(people);
      console.log(birthdayList);
      let ageArray = addAgeToDataSet(people, birthdayList);
      console.log(people);
      console.log(ageArray);
      let ageSearchCriteriaMax = prompt("Input the oldest age you want to see? ");
      let ageSearchCriteriaMin = prompt("Input the youngest age you want to see? ");
      let sampleAgeList = sortByAge(ageSearchCriteriaMin, ageSearchCriteriaMax, birthdayList);
      console.log(sampleAgeList);
/*       let ageList = sortByMinAge(ageSearchCriteriaMin, people);
      console.log(ageList);
      finalAgeList = sortyByMaxAge(ageSearchCriteriaMax, ageList)
      console.log(finalAgeList); */
      outputTheNames(finalAgeList);
      break;
  }
}

//add the birthday list to the data 
function addAgeToDataSet(people, ageArray){
  for (let i = 0; i<people.length; i++){
    if (i<people.length){
      people[i].age = ageArray[i];
    }
  }
}

//search by age group
function sortByAge (minAge, maxAge, people){
  let ageBlock = people.filter(function(person){
    return (minAge < person && person < maxAge);
  });
  return ageBlock;
}

/* function sortByMinAge(minAge, people){
  let count = 0;
  let ageBlockMin = people.filter(calculateAge(people, count));
  count ++;
  return (ageBlockMin > minAge);
}
function sortByMaxAge(maxAge, people){  
  let count = 0;
let ageBlockFinal = people.filter(calculateAge(people, count));
  count ++; 
  return (ageBlockFinal < maxAge);
} */

  /* for (let i = 0; i < people.data; i++){
    let currentPersonAge = calculateAge(people, i);
    if (minAge < currentPersonAge && currentPersonAge < maxAge){
      let ageBlock = people.filter(function(person){
        return (minAge < person.dob && person.dob < maxAge);
      });
      return ageBlock;
    }
  }
} */

//search by gender
function sortByGender(genderSearchCriteria, people){
  switch (genderSearchCriteria){
    case 'male':
      let maleBlock = people.filter(function(person){
        return (person.gender === 'male');
      });
      return maleBlock;
    case 'female':
      let femaleBlock = people.filter(function(person){
        return (person.gender === 'female');
      });
      return femaleBlock;
  }
}

//output the names of the people after the search criteria
function outputTheNames(people){
  for (let i = 0; i < people.length; i++){
    if (i<people.length){
      let firstName = people[i].firstName;
      let lastName = people[i].lastName;
      console.log(firstName + " " + lastName);
    }
  }
}

function calculateAge(dob) {
  let arrayOfAges = [];
  for (let i = 0; i<dob.length; i++){
    let dateOfBirth = dob[i].dob.split("/");
    console.log(dateOfBirth);
    let dobMonth = dateOfBirth[0];
    let dobDay = dateOfBirth[1];
    let dobYear = dateOfBirth[2];

    //store today's date
    let dateOfToday = new Date();
    //console.log(dateOfToday);
    let currentMonth = dateOfToday.getMonth()+1;
    //console.log(currentMonth);
    let currentDay = dateOfToday.getDate();
    //console.log(currentDay);
    let currentYear = dateOfToday.getFullYear();
    //console.log(currentYear);

    //calculate current age 
    let currentAge = (currentYear - dobYear);
    //console.log(currentAge);
    if((currentMonth < dobMonth) || ((currentMonth == dobMonth) && currentDay < dobDay)){
      currentAge--;
      console.log(currentAge);
      arrayOfAges.push(currentAge);
    }
    else{
      console.log(currentAge);
      arrayOfAges.push(currentAge);
    }
  }
  return arrayOfAges;
}
