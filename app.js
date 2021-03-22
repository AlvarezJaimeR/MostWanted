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
  let userSearchCriteria = prompt('What characteristics do you want to search for?: Gender? Age? Height? Weight? Eye Color? Occupation? Type "exit" if finished').toLowerCase();
  switch (userSearchCriteria){
    case 'gender':
      let genderSearchCriteria = prompt('male or female: ').toLowerCase();
      let genderList = sortByGender(genderSearchCriteria, people);
      outputTheNames(genderList);
      break;
    case 'age':
      let birthdayList = calculateAge(people);
      console.log(birthdayList);
      addAgeToDataSet(people, birthdayList);
      console.log(people);
      sortByMaxMin('age', people);
      break;
    case 'height':
      sortByMaxMin('height', people);
      break;
    case 'weight':
      sortByMaxMin('weight', people);
      break;
    case 'eye color':
      let eyeColorSearchCriteria = prompt('blue, brown, black, hazel, or green').toLowerCase();
      let eyeColorList = sortByEyeColor(eyeColorSearchCriteria, people);
      outputTheNames(eyeColorList);
      break;
    case 'occupation':
      let occupationSearchCriteria = prompt('programmer, assistant, landscaper, nurse, student, architect, doctor').toLowerCase();
      let occupationList = sortByOccupation(occupationSearchCriteria, people);
      outputTheNames(occupationList);
      break;
    case 'exit':
      console.log('end');
      break;
  }
}

//search by occupation
function sortByOccupation(occupationSearchCriteria, people){
  let occupationBlock = people.filter(function(person){
    return (person.occupation === occupationSearchCriteria);
  });
  return occupationBlock;
}

//search by eye color
function sortByEyeColor(eyeColorSearchCriteria, people){
  //let flag = false;
  let eyeBlock = people.filter(function(person){
    //console.log(person.eyeColor.includes(eyeColorSearchCriteria));
    /*if (person.eyeColor.includes(eyeColorSearchCriteria)){
      console.log("Passed");
    }else{
      if(!flag){
        console.log("Color not found");
        flag = true;
      }
    }*/
    return (person.eyeColor === eyeColorSearchCriteria);
  });
  return eyeBlock;
}

//search by max and min criteria
function sortByMaxMin (criteria, people){
  switch(criteria){
    case 'age':
      let ageSearchCriteriaMax = sortByMax("Input the oldest age you want to see:", 'age');
      let ageSearchCriteriaMin = sortByMin("Input the youngest age you want to see:", 'age');
      let finalAgeList = sortByAge(ageSearchCriteriaMin, ageSearchCriteriaMax, people);
      console.log(finalAgeList);
      outputTheNames(finalAgeList);
      break;
    case 'height':
      let heightSearchCriteriaMax = sortByMax("Input the tallest height you want to see:", 'height');
      let heightSearchCriteriaMin = sortByMin("Input the smallest height you want to see:", 'height');
      let finalHeightList = sortByHeight(heightSearchCriteriaMin, heightSearchCriteriaMax, people);
      console.log(finalHeightList);
      outputTheNames(finalHeightList);
      break;
    case 'weight':
      let weightSearchCriteriaMax = sortByMax("Input the heaviest weight you want to see:", 'weight');
      let weightSearchCriteriaMin = sortByMin("Input the lightest weight you want to see:",'weight');
      let finalWeightList = sortByWeight(weightSearchCriteriaMin, weightSearchCriteriaMax, people);
      console.log(finalWeightList);
      outputTheNames(finalWeightList);
      break;
  }
}

//sort by max criteria
function sortByMax(question, criteria){
  switch(criteria){
    case 'age':
      let ageSearchCriteriaMax = prompt(question);
      return ageSearchCriteriaMax;
    case 'height':
      let heightSearchCriteriaMax = prompt(question);
      return heightSearchCriteriaMax;
    case 'weight':
      let weightSearchCriteriaMax = prompt(question);
      return weightSearchCriteriaMax;
  }
}

//sort by min criteria
function sortByMin(question, criteria){
  switch(criteria){
    case 'age':
      let ageSearchCriteriaMin = prompt(question);
      return ageSearchCriteriaMin;
    case 'height':
      let heightSearchCriteriaMin = prompt(question);
      return heightSearchCriteriaMin;
    case 'weight':
      let weightSearchCriteriaMin = prompt(question);
      return weightSearchCriteriaMin;
  }
}

//sort by weight group
function sortByWeight (minWeight, maxWeight, people){
  let weightBlock = people.filter(function(person){
    return (minWeight < person.weight && person.weight < maxWeight);
  })
  return weightBlock;
}

//sort by height group
function sortByHeight (minHeight, maxHeight, people){
  let heightBlock = people.filter(function(person){
    return (minHeight < person.height && person.height < maxHeight);
  })
  return heightBlock;
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
    return (minAge < person.age && person.age < maxAge);
  });
  return ageBlock;
}

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
  searchByCriteria(people);
}

//calculate the age from the dob
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
