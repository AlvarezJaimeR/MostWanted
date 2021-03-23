"use strict"
//starting function
function app(people){
  let searchType = promptFor("Do you know the first and last name of the person you are searching? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let foundPerson = knowFirstOrLastName(searchType, people);
  validPerson(foundPerson, people);
  let confirmOnePerson = searchIfOne(foundPerson, people);
  confirmedIndividual(confirmOnePerson, foundPerson, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);
  switch(displayOption){
    case "info":
      displayPerson(person);
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

//valid person
function validPerson(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }else if(person.length == 0){
    return app(people);
  }
}
//function to allow to proceed
function confirmedIndividual (confirmed, foundPerson, people){
  if (confirmed == true){
    // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
    mainMenu(foundPerson, people);
  }
}

//function to check for an single person
function searchIfOne(foundPerson){
    if (foundPerson.length === 1){
      return true;
    }else{
      return false;
    }
}

//functions we might be able to use
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  firstName = firstName.charAt(0).toUpperCase()+firstName.slice(1);
  let lastName = promptFor("What is the person's last name?", chars);
  lastName = lastName.charAt(0).toUpperCase()+lastName.slice(1);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

//Know first or last name of the person
function knowFirstOrLastName(searchType, people){
  switch(searchType){
    case 'yes':
      let foundPerson = searchByName(people);
      //console.log(foundPerson);
      return foundPerson;
    case 'no':
      let userIndicate = promptFor('How would you like to search? Enter either "first name", "last name", or "by trait":', chars).toLowerCase();
      let nameBlock = noScenarioFirstOrLastName(userIndicate, people);
      console.log(nameBlock);
      return nameBlock;
    default:
      app(people); // restart app
      break;
  }
}    

<<<<<<< HEAD
// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  console.log(person);
  for (let i = 0; i<person.length; i++){
    let displayOption = promptFor("Found " + person[i].firstName + " " + person[i].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);
      switch(displayOption){
      case "info":
      displayPerson(person);
      break;
      case "family":
      displayFamily(people, person);
      // TODO: get person's family
      break;
      case "descendants":
      // TODO: get person's descendants
=======
//no switch case scenario
function noScenarioFirstOrLastName (userAnswer, people){
  switch(userAnswer){
    case 'first name': 
      let userInputFirstName = promptFor('Input the first name you would like to search: ', chars);
      userInputFirstName = userInputFirstName.charAt(0).toUpperCase()+userInputFirstName.slice(1);
      console.log(userInputFirstName);
      let firstNameBlock = searchSpecificCriteria(userInputFirstName, people, userAnswer);
      console.log(firstNameBlock);
      displayPeople(firstNameBlock);
      return firstNameBlock;
    case 'last name':
      let userInputLastName = promptFor('Input the last name you would like to search: ', chars);
      userInputLastName = userInputLastName.charAt(0).toUpperCase()+userInputLastName.slice(1);
      console.log(userInputLastName);
      let lastNameBlock = searchSpecificCriteria(userInputLastName, people, userAnswer);
      console.log(lastNameBlock);
      displayPeople(lastNameBlock);
      return lastNameBlock;
    case 'by trait':
      let searchCriteriaBlock = searchByCriteria(people);
      console.log(searchCriteriaBlock);
      return searchCriteriaBlock;
    default: 
      app(people);
>>>>>>> 259e7f679a21d197070bebc08c16d67caa95f500
      break;
  }
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
  console.log(person);
  for (let i=0; i<person.length; i++){
    let personInfo = "First Name: " + person[i].firstName + "\n";
    personInfo += "Last Name: " + person[i].lastName + "\n";
    personInfo += "Gender: " + person[i].gender + "\n";
    personInfo += "Date of Birth: " + person[i].dob + "\n";
    personInfo += "Height: " + person[i].height + " inches" + "\n";
    personInfo += "Weight: " + person[i].weight + " pounds" + "\n";
    personInfo += "Eye Color: " + person[i].eyeColor + "\n";
    personInfo += "Occupation: " + person[i].occupation + "\n";
    alert(personInfo);
  }
}



function displayFamily(people, person) {
  let result = [];
  people.forEach(p => {

    //if there is a matching spouse
    if(person[0].currentSpouse === p.id){
      result.push('Spouse: ' + ' '+ p.firstName + " " + p.lastName)
    }
     
//     //if there is anotber
    p.parents.forEach(parent => {
      if(person[0].currentSpouse === parent){
       // console.log("got here>>>>>", p)
        result.push('Parent: ' + p.firstName + " " + p.lastName)
      }
    }) 

    //the person's parent
    if(person[0].parents.length !== 0){
      person[0].parents.forEach(y => {
        if(y === p.id){
          result.push('Parent: ' + p.firstName + " " + p.lastName) 
        } 
      })

    }
  })

 alert(result.join("\n")) 



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

// helper function to pass in as default promptFor validation (characters)
function chars(input){
  var letters = /^[A-Za-z]+$/;
  if(letters.test(input) || input.includes(" ")){
  return true;
  } else{
  return false;
  }
}

//helper function to pass in as default promptFor validation (integers)
function integers(input){
  var numbers = /^-?\d+$/
  if(numbers.test(input)){
    return true;
  } else{
    return false;
  }
}

//main search by criteria function
function searchByCriteria(people){
  let userSearchCriteria = prompt('What traits do you want to search for?: Gender? Age? Height? Weight? Eye Color? Occupation? Type "exit" to quit.').toLowerCase();
  switch (userSearchCriteria){
    case 'gender':
      let genderSearchCriteria = promptFor('male or female: ', chars).toLowerCase();
      let genderList = sortByGender(genderSearchCriteria, people);
      continueSearchByTrait(genderList);
      return genderList;
    case 'age':
      let birthdayList = calculateAge(people);
      console.log(birthdayList);
      addAgeToDataSet(people, birthdayList);
      console.log(people);
      let ageList = sortByMaxMin('age', people);
      return ageList;
    case 'height':
      let heightList = sortByMaxMin('height', people);
      return heightList;
    case 'weight':
      let weightList = sortByMaxMin('weight', people);
      return weightList;
    case 'eye color':
      let eyeColorSearchCriteria = promptFor('blue, brown, black, hazel, or green', chars).toLowerCase();
      let eyeColorList = searchSpecificCriteria(eyeColorSearchCriteria, people, userSearchCriteria);
      let finalEyeColorList = continueSearchByTrait(eyeColorList);
      return finalEyeColorList;
    case 'occupation':
      let occupationSearchCriteria = promptFor('programmer, assistant, landscaper, nurse, student, architect, doctor', chars).toLowerCase();
      let occupationList = searchSpecificCriteria(occupationSearchCriteria, people, userSearchCriteria);
      let finalOccupationList = continueSearchByTrait(occupationList);
      return finalOccupationList;
    case 'exit':
      console.log('end');
      return people;
    default:
      searchByCriteria(people);
      break;
  }
}

//continue to search by trait
function continueSearchByTrait (people){
  let userContinue = promptFor('Would you like to continue to search by trait? ',yesNo).toLowerCase();
  switch (userContinue){
    case 'yes':
      searchByCriteria(people);
      break;
    case 'no':
      displayPeople(people);
      return people;
    default:
      continueSearchByTrait(people);
      break;
  }
}

//search for only a specific criteria
function searchSpecificCriteria(specificCriteria, people, userCriteria){
  switch (userCriteria){
    case 'first name':
      let firstNameBlock = people.filter(function(person){
        return (person.firstName === specificCriteria);
      });
      return firstNameBlock;
    case 'last name':
      let lastNameBlock = people.filter(function(person){
        return (person.lastName === specificCriteria);
      });
      return lastNameBlock;
    case 'occupation':
      let occupationBlock = people.filter(function(person){
        return (person.occupation === specificCriteria);
      });
      return occupationBlock;
    case 'eye color':
      let eyeBlock = people.filter(function(person){
        return (person.eyeColor === specificCriteria);
      });
      return eyeBlock;
  }
}

//search by max and min criteria
function sortByMaxMin (criteria, people){
  switch(criteria){
    case 'age':
      let ageSearchCriteriaMax = sortByMax("Input the oldest age you want to see:", 'age');
      let ageSearchCriteriaMin = sortByMin("Input the youngest age you want to see:", 'age');
      let runningAgeList = sortByAge(ageSearchCriteriaMin, ageSearchCriteriaMax, people);
      console.log(runningAgeList);
      let finalAgeList = continueSearchByTrait(runningAgeList);
      return finalAgeList;
    case 'height':
      let heightSearchCriteriaMax = sortByMax("Input the tallest height (inches) you want to see:", 'height');
      let heightSearchCriteriaMin = sortByMin("Input the smallest height (inches) you want to see:", 'height');
      let heightList = sortByHeight(heightSearchCriteriaMin, heightSearchCriteriaMax, people);
      console.log(heightList);
      let finalHeightList = continueSearchByTrait(heightList);
      return finalHeightList;
    case 'weight':
      let weightSearchCriteriaMax = sortByMax("Input the heaviest weight (pounds) you want to see:", 'weight');
      let weightSearchCriteriaMin = sortByMin("Input the lightest weight (pounds) you want to see:",'weight');
      let weightList = sortByWeight(weightSearchCriteriaMin, weightSearchCriteriaMax, people);
      console.log(weightList);
      let finalWeightList = continueSearchByTrait(weightList);
      return finalWeightList;
  }
}

//sort by max criteria
function sortByMax(question, criteria){
  switch(criteria){
    case 'age':
      let ageSearchCriteriaMax = promptFor(question, integers);
      return ageSearchCriteriaMax;
    case 'height':
      let heightSearchCriteriaMax = promptFor(question, integers);
      return heightSearchCriteriaMax;
    case 'weight':
      let weightSearchCriteriaMax = promptFor(question, integers);
      return weightSearchCriteriaMax;
  }
}

//sort by min criteria
function sortByMin(question, criteria){
  switch(criteria){
    case 'age':
      let ageSearchCriteriaMin = promptFor(question, integers);
      return ageSearchCriteriaMin;
    case 'height':
      let heightSearchCriteriaMin = promptFor(question, integers);
      return heightSearchCriteriaMin;
    case 'weight':
      let weightSearchCriteriaMin = promptFor(question, integers);
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
<<<<<<< HEAD
}


  
=======
}
>>>>>>> 259e7f679a21d197070bebc08c16d67caa95f500
