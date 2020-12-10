const timeoutSign = document.querySelector(".timeoutSign");

// IDLE TIMEOUT - na nabidku, jestli bude pokracovat
(function() {
  const idleDurationSecs = 110;
  let redirectUrl = '../index.html';  // Redirect idle users to this URL
  let idleTimeout;
  let resetIdleTimeout = function() {
    if(idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(function(){
      // location.href = redirectUrl
      overlay2.classList.remove("hideOverlay2");
      timeoutSign.classList.remove("hideTimeoutSign");
      let timeleft = 9;
      let downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.querySelector(".timer").innerHTML = "";
        } else {
        document.querySelector(".timer").innerHTML = timeleft;
        }
        timeleft -= 1;
      }, 1000);
    }, idleDurationSecs * 1000);
  };
  resetIdleTimeout();
  ['click', 'touchstart', 'mousemove'].forEach(function(evt) {
    document.addEventListener(evt, resetIdleTimeout, false)
  });
})();

// IDLE TIMEOUT - na presmerovani na zacatek
(function() {
  const idleDurationSecs = 120;
  let redirectUrl = '../index.html';  // Redirect idle users to this URL
  let idleTimeout;
  let resetIdleTimeout = function() {
    if(idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(function(){
      location.href = redirectUrl
      // timeoutSign.classList.remove("hideTimeoutSign");
    }, idleDurationSecs * 1000);
  };
  resetIdleTimeout();
  ['click', 'touchstart', 'mousemove'].forEach(function(evt) {
    document.addEventListener(evt, resetIdleTimeout, false)
  });
})();


let strany = 0;
const allDivs = document.querySelectorAll(".parties-container div");


//CONSTANTS
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const party = document.querySelectorAll(".parties-text");
const questionContainer = document.querySelector(".question-container");
const containerIntro = document.querySelector(".container-intro");
// const explanation1 = document.querySelector("#explanation1");
// const explanation2 = document.querySelector("#explanation2");
const explanation1Flex = document.getElementById("explanation1-flex");
const explanation2Flex = document.getElementById('explanation2-flex');
const explanation0Flex = document.getElementById('explanation0-flex');
const MAX_QUESTIONS = 15;
const progressBarFull = document.getElementById('progressBarFull');
const overlay = document.getElementById("overlay");
const overlay2 = document.getElementById("overlay2");
const restartDiv = document.querySelector(".restartDiv");
const continueDiv = document.querySelector(".continue");
const changingPartiesDiv = document.querySelector(".changingTextParties");
const partiesContainerDiv = document.querySelector(".parties-container");
const lastResetButtonDiv = document.querySelector(".lastResetButtonDiv");

const chosenAnswer = document.querySelectorAll(".choice-container");
const answerContainer = document.querySelector(".answer-container")
const hiddenLast = document.querySelectorAll(".hiddenLast");


// VARIABLES
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionIndex = 0;

// PARTIES
let cssd = 0;
let ods = 0;
let oh = 0;
let lb = 0;

// OTAZKY - TEXT
let questions = [
{
  question: "The environmental protection programme has not yielded any results. <br>Do you want to continue it?",
  choice1: "Yes",
  choice2: "No",
  answer: 1,
},
{
  question: "The state should be the sole owner of the transport infrastructure, including regional lines.",
  choice1: "Yes",
  choice2: "No",
  answer: 2,
},
{
  question:
    "Some representatives are proposing an immediate privatization; that is, the transfer of property from state ownership to private ownership. <br>Do you agree with that?",
  choice1: "Yes",
  choice2: "No",
  answer: 3,
},
{
  question:
    "It is necessary to elect dissidents and strong personalities of the 1989 revolution because they are united by their resistance to communism.",
  choice1: "Yes",
  choice2: "No",
  answer: 4,
},
{
  question:
    "Do you agree with the current contents of the Charter of Fundamental Rights and Freedoms?",
  choice1: "Yes",
  choice2: "No",
  answer: 5,
},
{
  question:
    "The Lustration Act means that former members of the secret police, People’s Militias, members of the evaluation committees, and the officials of the Communist Party of Czechoslovakia are not allowed to apply for a job in state administration. Are you in favour of its introduction?",
  choice1: "Yes",
  choice2: "No",
  answer: 6,
},
{
  question:
    "International cooperation should be established primarily with Hungary and Poland.",
  choice1: "Yes",
  choice2: "No",
  answer: 7,
},
{
  question:
    "International cooperation should be established primarily with the Western European countries.",
  choice1: "Yes",
  choice2: "No",
  answer: 8,
},
{
  question:
    "The State should be the sole owner of mineral resources, even if it brings lower profit.",
  choice1: "Yes",
  choice2: "No",
  answer: 9,
},
{
  question:
    "Do you insist on preserving Czechoslovakia by any means necessary?",
  choice1: "Yes",
  choice2: "No",
  answer: 10,
},
{
  question:
    "New agricultural policy. The issue is whether the state should keep the possibility of owning unified agricultural cooperatives. Is it right to focus on private ownership and a new kind of cooperative ownership?",
  choice1: "Yes",
  choice2: "No",
  answer: 11,
},
{
  question:
    "The possibility of a referendum is an essential part of a democratic society.",
  choice1: "Yes",
  choice2: "No",
  answer: 12,
},
{
  question:
    "The economy must be:",
  choice1: "Market-oriented in a social way.",
  choice2: "Market in a socialist way, with economic democracy ensured by state regulation.",
  choice3: "Part of a free market and free ownership.",
  answer: 13,
},
{
  question:
    "Which campaign slogan do you like best?",
  choice1: "Freedom and prosperity.",
  choice2: "Democracy and human rights for all.",
  choice3: "A journey towards a modern socialist society.",
  choice4: "Apolitical politics.",
  answer: 14,
},
{
  question:
    "Which campaign slogan do you like best?",
  choice1: "Freedom and prosperity.",
  choice2: "Democracy and human rights for all.",
  choice3: "A journey towards a modern socialist society.",
  choice4: "Apolitical politics.",
  answer: 14,
},
];

// RESETBUTTON vpravo nahore
const resetButton = document.createElement("button")
resetButton.className = "resetButton";
resetButton.innerText = "< RESTART";
questionContainer.appendChild(resetButton);
resetButton.addEventListener("click", function() {
    return window.location.assign("../index.html");
});

// RESETBUTTONDIV v oznamovacim okne
const resetButtonDiv = document.createElement("button")
resetButtonDiv.className = "resetButtonDiv";
resetButtonDiv.innerText = " < RESTART";
restartDiv.appendChild(resetButtonDiv);
resetButtonDiv.addEventListener("click", function() {
    return window.location.assign("../index.html");
});

// RESETBUTTON na posledni strance
const resetButtonLast = document.createElement("button")
resetButtonLast.className = "lastResetButton";
resetButtonLast.innerText = "< RESTART";
lastResetButtonDiv.appendChild(resetButtonLast);
lastResetButtonDiv.addEventListener("click", function() {
    return window.location.assign("../index.html");
});

// TLACITKO "ANO", PRO POKRACOVANI PO NECINNOSTI
const continueButton = document.createElement("button")
continueButton.className = "continueButton";
continueButton.innerText = "YES";
continueDiv.appendChild(continueButton);
continueButton.addEventListener("click", function() {
  timeoutSign.classList.add("hideTimeoutSign");
  overlay2.classList.add("hideOverlay2");
});



// FUNKCE STARTGAME
startGame = () => {
questionCounter = 1;
availableQuestions = [...questions];

// zobrazit prvni vysvetlivku na prvni otazce
// function createButton1 (){
//   let button1 = document.createElement("button")
//   button1.className = "button1";
//   button1.innerText = "ZJISTIT VÍC"
//   questionContainer.appendChild(button1)
//   button1.addEventListener("click", function(){
//     // add class hidden na overlay element, takze kliknutim se tam ten overlay element zobrazi a udela vsechno ostatni tmavym
//     overlay.classList.remove("hidden11");
//     explanation1Flex.classList.add("translate");
//   })
// }
// createButton1();

// // zobrazi tlacitko zpet na vysvetlivce
// function createButton2 (){
//   const button2 = document.createElement("button")
//   button2.className = "button2";
//   button2.innerText = "ZPĚT"
//   explanation1Flex.appendChild(button2)
//   button2.addEventListener("click", function(){
//     overlay.classList.add("hidden11");
//     explanation1Flex.classList.remove("translate");
//   })
// }
// createButton2();

// FUNKCE GETNEWQUESTION:
getNewQuestion();
};

//FUNKCE getNewQuestion
getNewQuestion = () => {
//  if (availableQuestions.length === 0) {
// }

questionCounter++
// Update the progress bar
progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

question.classList.add("slide");
// question.classList.remove("goAway");

// prida tridu slide, diky ktere text otazek slidne doleva
function slideAway(){
  answerContainer.addEventListener("mousedown", function(){
    question.classList.remove("slide");
  })
}
slideAway();

currentQuestion = availableQuestions[0];
question.innerHTML = currentQuestion.question; //ta question na leve strane znaci ten div s tou otazkou. priradim k ni innerText, ktery si js najde tak, ze pujde podle currentQuestion a vezme si property question z te currentQuestion.
choices.forEach((choice) => {
  const number = choice.dataset["number"]; //tohle vezme to cislo z toho datasetu v html
  choice.innerHTML = currentQuestion["choice" + number]; //tomu parametru choice to priradi innerText, ktery je v currentQuestion["choice" + number]. Tohle znamena vlastne choice1, choice2 apod.
});
availableQuestions.splice(questionIndex, 1); //Tohle vyhodi tu otazku, ktera byla pouzita z obehu
acceptingAnswers = true; //tohle umozni odpovidat na otazky az tehdy, kdyz bylo vsechno nacteno (proto je na zacatku dana hodnota false)
};


// DOSTAT NOVOU OTAZKU A POCITANI BODU
choices.forEach((choice) => {
choice.addEventListener("click", (e) => {
  //kdyz kliknou na tu odpoved, tak tohle mi da reference na to, na co vlastne klikli
  if (!acceptingAnswers) return; //jestli jeste neakceptujeme odpoved, tak to budeme ignorovat

  acceptingAnswers = false; // tohle vytvori male zpozdeni, nechceme, aby na to hned kliknuli
  const selectedChoice = e.target; //timhle vyselektuju volbu, na kterou klikli
  const selectedAnswer = selectedChoice.dataset["number"]; //timhle vyselektuju odpoved, kterou ta zvolena odpoved ma

  // FUNKCE removeClassHidden - odstrani class hidden a zobrazi multiple answers na posledni otazce
  function removeClassHidden() {
    const hiddenContainer = document.querySelectorAll(".hidden");
    hiddenContainer.forEach(function (item) {
      if (
        currentQuestion.answer == 12 &&
        (selectedAnswer == 1 || selectedAnswer == 2)
      ) {
        item.classList.remove("hidden");
      }
    });
  }
  removeClassHidden();

  // Odstrani posledni dve odpovedi v posledni otazce, ktere tam jsou navic
  // function removeClassHiddenLast() {
  //   hiddenLast.forEach(function (item) {
  //     if (
  //       currentQuestion.answer == 8 &&
  //       (selectedAnswer == 1 || selectedAnswer == 2 || selectedAnswer == 3 || selectedAnswer == 4 || selectedAnswer == 5)
  //     ) {
  //       item.classList.add("hideLastTwoAnswers");
  //     }
  //   });
  // }
  // removeClassHiddenLast();

  // Obstaraji odkryti a zakryti html divu tak, aby byla videt posledni vysledkova stranka
  function removeClassHidden2() {
    const hiddenContainer2 = document.querySelectorAll(".hidden2");
    hiddenContainer2.forEach(function (item) {
      if (
        currentQuestion.answer == 14 &&
        (selectedAnswer == 1 || selectedAnswer == 2 || selectedAnswer == 3 || selectedAnswer == 4)
      ) {
        item.classList.remove("hidden2");
      }
    });
  }
  removeClassHidden2();

  function addClassHidden3() {
    const hiddenContainer3 = document.querySelectorAll(".hidden3");
    hiddenContainer3.forEach(function (item) {
      if (
        currentQuestion.answer == 14 &&
        (selectedAnswer == 1 || selectedAnswer == 2 || selectedAnswer == 3 || selectedAnswer == 4)
      ) {
        item.classList.add("hidden2");
      }
    });
  }
  addClassHidden3();

  function addClassLastQuestion() {
    const hiddenContainer3 = document.querySelectorAll("#last-answer");
    hiddenContainer3.forEach(function (item) {
      if (
        currentQuestion.answer == 12 &&
        (selectedAnswer == 1 || selectedAnswer == 2)
      ) {
        item.classList.add("last-question-container");
      }
    });
  }
  addClassLastQuestion();

  function addClassLastQuestion1() {
    const hiddenContainer3 = document.querySelectorAll(".question-container");
    hiddenContainer3.forEach(function (item) {
      if (
        currentQuestion.answer == 12 &&
        (selectedAnswer == 1 || selectedAnswer == 2)
      ) {
        item.classList.add("last-question-container1");
      }
    });
  }
  addClassLastQuestion1();

  function addClassLastAnswer() {
    const hiddenContainer4 = document.querySelectorAll(".choice-text");
    hiddenContainer4.forEach(function (item) {
      if (
        currentQuestion.answer == 12 &&
        (selectedAnswer == 1 || selectedAnswer == 2)
      ) {
        item.classList.add("last-question-text");
      }
    });
  }
addClassLastAnswer();

  function addClassLastText() {
    const hiddenContainer5 = document.querySelectorAll(".choice-container");
    hiddenContainer5.forEach(function (item) {
      if (
        currentQuestion.answer == 12 &&
        (selectedAnswer == 1 || selectedAnswer == 2)
      ) {
        item.classList.add("last-question-answer");
      }
    });
  }
  addClassLastText();

  // VYTVORIT VYSVETLIVKU cislo 1 - Button 1
  function createButton1 (){
    let button1 = document.createElement("button")
    button1.className = "button1";
    button1.innerText = "MORE INFO"
    questionContainer.appendChild(button1)
    button1.addEventListener("click", function(){
      // add class hidden na overlay element, takze kliknutim se tam ten overlay element zobrazi a udela vsechno ostatni tmavym
      overlay.classList.remove("hidden11");
      explanation1Flex.classList.add("translate");
      
    })
  }

  // VYTVORIT TLACITKO ZPET Z VYSVETLIVKY 1 - Button 2

  function createButton2 (){
    const button2 = document.createElement("button")
    button2.className = "button2";
    button2.innerText = "BACK"
    explanation1Flex.appendChild(button2)
    button2.addEventListener("click", function(){
      overlay.classList.add("hidden11");
      explanation1Flex.classList.remove("translate");
    })
  }

  // SKRYT BUTTON1
  function hideButton1(){
    let oznaceniButton1 = document.querySelector(".button1");
      oznaceniButton1.classList.add("hideButton1");;
  }




  // VYTVORIT VYSVETLIVKU cislo 0 - Button 0
  function createButton0 (){
    let button0 = document.createElement("button")
    button0.className = "button0";
    button0.innerText = "MORE INFO"
    questionContainer.appendChild(button0)
    button0.addEventListener("click", function(){
      // add class hidden na overlay element, takze kliknutim se tam ten overlay element zobrazi a udela vsechno ostatni tmavym
      overlay.classList.remove("hidden11");
      explanation0Flex.classList.add("translate");
      
    })
  }

  // VYTVORIT TLACITKO ZPET Z VYSVETLIVKY 0 - Button 

  function createButton01 (){
    const button01 = document.createElement("button")
    const backButton = document.querySelector(".backButton")
    button01.className = "button01";
    button01.innerText = "BACK"
    explanation0Flex.appendChild(button01)
    button01.addEventListener("click", function(){
      overlay.classList.add("hidden11");
      explanation0Flex.classList.remove("translate");
    })
  }

  // SKRYT BUTTON1
  function hideButton0(){
    let oznaceniButton0 = document.querySelector(".button0");
      oznaceniButton0.classList.add("hideButton1");;
  }

// VYTVORIT VYSVETLIVKU CISLO 2 - Button 3
function createButton3 (){
  let button3 = document.createElement("button")
  button3.className = "button3";
  button3.innerText = "MORE INFO"
  questionContainer.appendChild(button3)
  button3.addEventListener("click", function(){
    overlay.classList.remove("hidden11");
    explanation2Flex.classList.add("translate");
  })
}

// VYTVORIT TLACITKO ZPET Z VYSVETLIVKY - Button 2
function createButton4 (){
  const button4 = document.createElement("button")
  button4.className = "button4";
  button4.innerText = "BACK"
  explanation2Flex.appendChild(button4)
  button4.addEventListener("click", function(){
    explanation2Flex.classList.remove("translate");
    overlay.classList.add("hidden11");
  })
}

// SKRYT BUTTON3 - skryje vysvetlivku (button 3)
function hideButton3(){
  let oznaceniButton3 = document.querySelector(".button3");
    oznaceniButton3.classList.add("hideButton3");;
}
function hidden13(){
  let hidden13 = document.querySelector(".hidden13");
    hidden13.classList.add("hidden14");
}

function removeHidden13(){
  let hidden13 = document.querySelector(".hidden13");
  hidden13.classList.remove("hidden14")
}


// FUNKCE countPoints - Pocitani bodu
  function countPoints() {
     // OTAZKA 1
    if (currentQuestion.answer == 1 && selectedAnswer == 1) {
      ods++;
    }
    if (currentQuestion.answer == 1 && selectedAnswer == 2) {
      lb++;
    }
    // OTAZKA 2
    if (currentQuestion.answer == 2 && selectedAnswer == 1) {
      lb++;
      cssd++;
    }
    if (currentQuestion.answer == 2 && selectedAnswer == 2) {
      ods++;
    }
    // OTAZKA 3
    if (currentQuestion.answer == 3 && selectedAnswer == 1) {
      ods++;
    }
    if (currentQuestion.answer == 3 && selectedAnswer == 2) {
      cssd++;
      lb++;
    }
    // OTAZKA 4
    if (currentQuestion.answer == 4 && selectedAnswer == 1) {
      oh++;
      createButton0 ()
      createButton01 ()
    }
    if (currentQuestion.answer == 4 && selectedAnswer == 2) {
      ods++;
      lb++;
      cssd++;
      createButton0 ()
      createButton01 ()
    }
    // OTAZKA 5
    if (currentQuestion.answer == 5 && selectedAnswer == 1) {
      oh++;
      lb++;
      hideButton0()
    }
    if (currentQuestion.answer == 5 && selectedAnswer == 2) {
      ods++;
      hideButton0()
    }
    // OTAZKA 6
    if (currentQuestion.answer == 6 && selectedAnswer == 1) {
      ods++;  
      oh++;  
      cssd++;  
    }
    if (currentQuestion.answer == 6 && selectedAnswer == 2) {
      lb++;        
    }
    // OTAZKA 7
    if (currentQuestion.answer == 7 && selectedAnswer == 1) {
      cssd++;
    }
    if (currentQuestion.answer == 7 && selectedAnswer == 2) {
      ods++
      lb++
    }
    // OTAZKA 8
    if (currentQuestion.answer == 8 && selectedAnswer == 1) {
      ods++;
    }
    if (currentQuestion.answer == 8 && selectedAnswer == 2) {
      cssd++;
      lb++;
    }
    // OTAZKA 9
    if (currentQuestion.answer == 9 && selectedAnswer == 1) {
      lb++;
      createButton1 ()
      createButton2 ()
    }
    if (currentQuestion.answer == 9 && selectedAnswer == 2) {
      cssd++;
      ods++;
      createButton1 ()
      createButton2 ()
    }
    // OTAZKA 10
    if (currentQuestion.answer == 10 && selectedAnswer == 1) {
      lb++;
      createButton3 ()  
      createButton4 ()
      hideButton1()
    }
    if (currentQuestion.answer == 10 && selectedAnswer == 2) {
      ods++
      cssd++
      createButton3 ()  
      createButton4 ()
      hideButton1()
    }

    // OTAZKA 11
    if (currentQuestion.answer == 11 && selectedAnswer == 1) {
      cssd++
      ods++
      hideButton3()       
    }
    if (currentQuestion.answer == 11 && selectedAnswer == 2) {
      lb++
      hideButton3()       
    }

    // OTAZKA 12
    if (currentQuestion.answer == 12 && selectedAnswer == 1) {
      cssd++
      lb++
      hidden13()
    }
    if (currentQuestion.answer == 12 && selectedAnswer == 2) {
      ods++
      hidden13()
    }

    // OTAZKA 13
    if (currentQuestion.answer == 13 && selectedAnswer == 1) {
      cssd++
      removeHidden13()
    }
    if (currentQuestion.answer == 13 && selectedAnswer == 2) {
      lb++
      removeHidden13()
    }
    if (currentQuestion.answer == 13 && selectedAnswer == 3) {
      ods++
      removeHidden13()
    }

    // OTAZKA 14
    if (currentQuestion.answer == 14 && selectedAnswer == 1) {
      ods++
    }
    if (currentQuestion.answer == 14 && selectedAnswer == 2) {
      cssd++
    }
    if (currentQuestion.answer == 14 && selectedAnswer == 3) {
      lb++
    }
    if (currentQuestion.answer == 14 && selectedAnswer == 4) {
      oh++
    }
    
  }
  countPoints();

  // ARRAY OBJEKT VYSLEDKY TEXT
  let strany = [
  {
      text:
        "ČSSD",
      cislo: 2,
      strana: Math.floor((cssd / 14) * 100),
  },
  {
      text:
        "ODS-KDS",
      cislo: 3,
      strana: Math.floor((ods / 14) * 100),
  },
  {
      text:
        "CIVIC MOVEMENT",
      cislo: 4,
      strana: Math.floor((oh / 14) * 100),
  },
  {
      text:
        "LEFT BLOC",
      cislo: 5,
      strana: Math.floor((lb / 14) * 100),
    },
  ];


  // Preradi objekt strany od nejvetsiho po nejmensi pocet bodu
  const stranySorted = strany.sort((a, b) => parseFloat(b.strana) - parseFloat(a.strana));
  console.log(stranySorted);


// VEZME OBJEKT "stranySorted" A HODI HO DO DIVU
stranySorted.forEach(function(obj, index, arr) {
    allDivs[index].innerHTML = obj.strana + "% " + obj.text;
  });  

function firstPartyToSee(){
  if(allDivs[0].innerHTML.indexOf("ČSSD") !== -1) {
    changingPartiesDiv.innerHTML = "<p>ČSSD</p><br> <p>The tradition of the Czech Social Democratic Party dates back to 1893. <br>During the communist totality, it was banned and was not renewed until March 1990 under the name Czechoslovak Social Democracy. It entered the 1992 elections under the same name. Jiří Horák, a former member of the exiled ČSSD, was elected <br>its chairman. Valter Komárek, an important figure of the Velvet Revolution, became the symbol of the party. The party won 6.5% of the vote, which was a disappointment for its members.</p>";
    partiesContainerDiv.style.backgroundImage = "url(../img/cssd.jpg)";

  }
  if(allDivs[0].innerHTML.indexOf("ODS-KDS") !== -1) {
    changingPartiesDiv.innerHTML = "<p>ODS-KDS</p><br>The Civic Democratic Party was established in April 1991 by the division of the Civic Forum. It was led by the former chairman of the Civic Forum, Václav Klaus. <br>The party formed a coalition with the Christian Democratic Party with a prominent figure of Václav Benda and won 29.7% of the vote, that is, 76 seats. <br>It became an undisputable winner of the elections. Then it formed a government with KDU-ČSL and the Civic Democratic Alliance. ODS was one of the major driving forces of the dissolution of Czechoslovakia. It took major steps towards economic transformation and integration of the country into the NATO and EU structures.";
    partiesContainerDiv.style.backgroundImage = "url(../img/ods.jpg)"

  }
  if(allDivs[0].innerHTML.indexOf("CIVIC MOVEMENT") !== -1) {
    changingPartiesDiv.innerHTML = "<p>CIVIC MOVEMENT</p><br>The Civic Movement was formed by the division of the Civic Forum and was basically its successor. It was a centrist political group led by its chairman, Jiří Dienstbier. Among other important personalities were the historian and writer Petr Pithart <br>and the philosopher Jan Sokol. The romantic spirit of the Civic Movement <br>and the idea of apolitical politics brought together members of different schools <br>of thought. However, the party gained only 4.6% of the vote and became a mere reminder of the Velvet Revolution. It was unable to withstand the transformation <br>of the political scene. It existed under a different name till 1996 but did not see any major political success. ";
    partiesContainerDiv.style.backgroundImage = "url(../img/oh.jpg)";
  }
  if(allDivs[0].innerHTML.indexOf("LEFT BLOC") !== -1) {
    changingPartiesDiv.innerHTML = "<p>LEFT BLOC</p><br><p>The Left Bloc was formed to strengthen the electoral potential just before the 1992 elections. It was primarily a coalition of several small political groups and two bigger left-wing parties: <br><br>1.	The Communist Party of Bohemia and Moravia as the unofficial successor of the Communist Party of Czechoslovakia from the period before the Velvet Revolution. <br><br>2.	The Party of the Democratic Left of ČSFR. The Left Bloc gained 14% of the vote <br>in the elections, that is, 35 seats. This made it the strongest left-wing group of the time. However, the cooperation within the coalition was not ideal, which manifested by the departure of some politicians from KSČM to the Democratic Left, and also <br>by the establishment of a new independent party, the Left Bloc. The coalition officially ended in 1994. </p>";
    partiesContainerDiv.style.backgroundImage = "url(../img/lb.jpg)";
  }
}
firstPartyToSee();

//Switch color of active link
party.forEach(function (item) {
  item.addEventListener("mousedown", function (e) {
    partiesContainerDiv.querySelector(".current").classList.remove("current");
    item.classList.add("current");
  });
});

function clickOnDiv(){
allDivs.forEach((something) => {
something.addEventListener("mousedown", (e) => {
  
  const selectedDiv = e.target; 

  function changeBackground(){
    if(selectedDiv.innerHTML.indexOf("ČSSD") !== -1) {
      changingPartiesDiv.innerHTML = "<p>ČSSD</p><br> <p>The tradition of the Czech Social Democratic Party dates back to 1893. <br>During the communist totality, it was banned and was not renewed until March 1990 under the name Czechoslovak Social Democracy. It entered the 1992 elections under the same name. Jiří Horák, a former member of the exiled ČSSD, was elected <br>its chairman. Valter Komárek, an important figure of the Velvet Revolution, became the symbol of the party. The party won 6.5% of the vote, which was a disappointment for its members.</p>";
      partiesContainerDiv.style.backgroundImage = "url(../img/cssd.jpg)";
  
    }
    if(selectedDiv.innerHTML.indexOf("ODS-KDS") !== -1) {
      changingPartiesDiv.innerHTML = "<p>ODS-KDS</p><br>The Civic Democratic Party was established in April 1991 by the division of the Civic Forum. It was led by the former chairman of the Civic Forum, Václav Klaus. <br>The party formed a coalition with the Christian Democratic Party with a prominent figure of Václav Benda and won 29.7% of the vote, that is, 76 seats. <br>It became an undisputable winner of the elections. Then it formed a government with KDU-ČSL and the Civic Democratic Alliance. ODS was one of the major driving forces of the dissolution of Czechoslovakia. It took major steps towards economic transformation and integration of the country into the NATO and EU structures.";
      partiesContainerDiv.style.backgroundImage = "url(../img/ods.jpg)"
  
    }
    if(selectedDiv.innerHTML.indexOf("CIVIC MOVEMENT") !== -1) {
      changingPartiesDiv.innerHTML = "<p>CIVIC MOVEMENT</p><br>The Civic Movement was formed by the division of the Civic Forum and was basically its successor. It was a centrist political group led by its chairman, Jiří Dienstbier. Among other important personalities were the historian and writer Petr Pithart <br>and the philosopher Jan Sokol. The romantic spirit of the Civic Movement <br>and the idea of apolitical politics brought together members of different schools <br>of thought. However, the party gained only 4.6% of the vote and became a mere reminder of the Velvet Revolution. It was unable to withstand the transformation <br>of the political scene. It existed under a different name till 1996 but did not see any major political success. ";
      partiesContainerDiv.style.backgroundImage = "url(../img/oh.jpg)";
    }
    if(selectedDiv.innerHTML.indexOf("LEFT BLOC") !== -1) {
      changingPartiesDiv.innerHTML = "<p>LEFT BLOC</p><br><p>The Left Bloc was formed to strengthen the electoral potential just before the 1992 elections. It was primarily a coalition of several small political groups and two bigger left-wing parties: <br><br>1.	The Communist Party of Bohemia and Moravia as the unofficial successor of the Communist Party of Czechoslovakia from the period before the Velvet Revolution. <br><br>2.	The Party of the Democratic Left of ČSFR. The Left Bloc gained 14% of the vote <br>in the elections, that is, 35 seats. This made it the strongest left-wing group of the time. However, the cooperation within the coalition was not ideal, which manifested by the departure of some politicians from KSČM to the Democratic Left, and also <br>by the establishment of a new independent party, the Left Bloc. The coalition officially ended in 1994. </p>";
      partiesContainerDiv.style.backgroundImage = "url(../img/lb.jpg)";
    }
  }
  changeBackground();
})});
};
clickOnDiv();


getNewQuestion();
  
});
});

startGame();


