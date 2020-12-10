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
  question: "Program na ochranu životního prostředí doposud nepřinesl žádné výsledky. <br>Chcete v něm pokračovat?",
  choice1: "Ano",
  choice2: "Ne",
  answer: 1,
},
{
  question: "Stát má být jediným vlastníkem dopravní infrastruktury, a to včetně oblastních tratí",
  choice1: "Ano",
  choice2: "Ne",
  answer: 2,
},
{
  question:
    "Někteří poslanci navrhují okamžitou privatizaci, tedy převedení majetku z vlastnictví státu do vlastnictví soukromých subjektů. <br>Souhlasíte s tím?",
  choice1: "Ano",
  choice2: "Ne",
  answer: 3,
},
{
  question:
    "Je třeba volit disidenty a silné osobnosti roku 1989, protože je spojuje odpor vůči komunismu.",
  choice1: "Ano",
  choice2: "Ne",
  answer: 4,
},
{
  question:
    "Souhlasíte se současným vyzněním Listiny základních práv a svobod?",
  choice1: "Ano",
  choice2: "Ne",
  answer: 5,
},
{
  question:
    "Lustrační zákon znamená, že se bývalí příslušníci StB, Lidových milicí, členové prověrkových komisí a funkcionáři Komunistické strany Československa, nemohou ucházet o práci ve státní správě. <br>Jste pro jeho zavedení?",
  choice1: "Ano",
  choice2: "Ne",
  answer: 6,
},
{
  question:
    "Mezinárodní spolupráci je třeba navázat především s Maďarskem a Polskem.",
  choice1: "Ano",
  choice2: "Ne",
  answer: 7,
},
{
  question:
    "Mezinárodní spolupráci je třeba navázat zejména se státy západní Evropy.",
  choice1: "Ano",
  choice2: "Ne",
  answer: 8,
},
{
  question:
    "Stát má být jediným vlastníkem nerostných surovin, i kdyby to přinášelo nižší zisk.",
  choice1: "Ano",
  choice2: "Ne",
  answer: 9,
},
{
  question:
    "Trváte na bezpodmínečném zachování Československa?",
  choice1: "Ano",
  choice2: "Ne",
  answer: 10,
},
{
  question:
    "Nová zemědělská politika. Řeší se, zda si má stát ponechat možnost vlastnictví jednotných zemědělských družstev. Je správné soustředit se na soukromé vlastnictví a novou formu družstevního vlastnictví?",
  choice1: "Ano",
  choice2: "Ne",
  answer: 11,
},
{
  question:
    "Možnost referenda je nezbytnou součástí demokratické společnosti.",
  choice1: "Ano",
  choice2: "Ne",
  answer: 12,
},
{
  question:
    "Ekonomika musí být:",
  choice1: "Sociálně orientovaná na tržní hospodářství.",
  choice2: "Socialisticky tržní, hospodářskou demokratičnost zajišťuje regulace státem.",
  choice3: "Součástí svobodného trhu a svobodného vlastnictví.",
  answer: 13,
},
{
  question:
    "Které volební heslo je vám nejbližší?",
  choice1: "Svoboda a prosperita.",
  choice2: "Demokracie a lidská práva pro všechny.",
  choice3: "Cesta k moderní socialistické společnosti.",
  choice4: "Apolitická politika.",
  answer: 14,
},
{
  question:
    "Které volební heslo je vám nejbližší?",
  choice1: "Svoboda a prosperita.",
  choice2: "Demokracie a lidská práva pro všechny.",
  choice3: "Cesta k moderní socialistické společnosti.",
  choice4: "Apolitická politika. ",
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
continueButton.innerText = "ANO";
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
    button1.innerText = "ZJISTIT VÍC"
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
    button2.innerText = "ZPĚT"
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
    button0.innerText = "ZJISTIT VÍC"
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
    button01.innerText = "ZPĚT"
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
  button3.innerText = "ZJISTIT VÍC"
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
  button4.innerText = "ZPĚT"
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
        "OBČANSKÉ HNUTÍ",
      cislo: 4,
      strana: Math.floor((oh / 14) * 100),
  },
  {
      text:
        "LEVÝ BLOK",
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
    changingPartiesDiv.innerHTML = "<p>ČSSD</p><br> <p>Tradice České strany sociální demokracie sahá do roku 1893. Během rudé totality byla však zakázána a obnovy se dočkala až v březnu 1990 pod názvem Československá sociální demokracie. Pod stejným názvem také vstoupila do voleb 1992. Jejím předsedou byl zvolen Jiří Horák, bývalý člen exilové ČSSD. Symbolem strany se stal Valtr Komárek, významná osobnost sametové revoluce. Strana získala ve volbách 6,5 % hlasů, tedy 16 mandátů, což pro ni bylo zklamáním.</p>";
    partiesContainerDiv.style.backgroundImage = "url(../img/cssd.jpg)";

  }
  if(allDivs[0].innerHTML.indexOf("ODS-KDS") !== -1) {
    changingPartiesDiv.innerHTML = "<p>ODS-KDS</p><br>Občanská demokratická strana vznikla v dubnu 1991 rozpadem Občanského fóra. <br>V jejím čele stanul bývalý předseda OF, Václav Klaus. Strana uzavřela koalici <br>s Křesťansko-demokratickou stranou s výraznou osobností Václava Bendy a pod zkratkou ODS-KDS získala ve volbách 29,7 % hlasů, tedy 76 mandátů. <br>Byla jednoznačným vítězem voleb. Poté přistoupila k sestavení vlády s KDU-ČSL <br>a Občanskou demokratickou aliancí. ODS měla velkou zásluhu na rozdělení Československa. Podnikala zásadní kroky k ekonomické transformaci a začlenění <br>do struktur NATO a EU.";
    partiesContainerDiv.style.backgroundImage = "url(../img/ods.jpg)"

  }
  if(allDivs[0].innerHTML.indexOf("OBČANSKÉ HNUTÍ") !== -1) {
    changingPartiesDiv.innerHTML = "<p>OBČANSKÉ HNUTÍ</p><br>Občanské hnutí vzniklo rozkolem Občanského fóra a v zásadě bylo jeho pokračovatelem. Šlo o středové politické uskupení v čele s předsedou Jiřím Dienstbierem. Dalšími významnými osobnostmi byl historik a spisovatel Petr Pithart nebo filozof Jan Sokol. Romantický duch Občanského hnutí a představa apolitické politiky v sobě snoubila členy různých názorových proudů. Strana však ve volbách získala pouhých 4,6 % hlasů a stala se spíš jakousi připomínkou sametové revoluce. Nebyla schopna ustát proměnu politické scény. Pod jiným názvem existovala <br>až do roku 1996, ale větších politických úspěchů se nedočkala.";
    partiesContainerDiv.style.backgroundImage = "url(../img/oh.jpg)";
  }
  if(allDivs[0].innerHTML.indexOf("LEVÝ BLOK") !== -1) {
    changingPartiesDiv.innerHTML = "<p>LEVÝ BLOK</p><br><p>Levý blok vznikl za účelem posílení volebního potenciálu těsně před volbami 1992. Primárně šlo o koalici několika menších politických uskupení a dvou větších levicových stran: <br><br>1.	Komunistická strana Čech a Moravy, coby neoficiální nástupce Komunistické strany Československa z období před sametovou revolucí. <br><br>2.	Demokratická levice ČSFR. Ve volbách získal Levý blok 14 % hlasů, tedy <br>35 mandátů, což z něj udělalo nejsilnější levicové uskupení tehdejší doby. Spolupráce uvnitř koalice však nebyla ideální, což se projevilo odchodem politiků z KSČM <br>do Demokratické levice a také založením nové samostatné strany Levý blok. Koalice oficiálně zanikla v polovině roku 1994.</p>";
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
      changingPartiesDiv.innerHTML = "<p>ČSSD</p><br> <p>Tradice České strany sociální demokracie sahá do roku 1893. Během rudé totality byla však zakázána a obnovy se dočkala až v březnu 1990 pod názvem Československá sociální demokracie. Pod stejným názvem také vstoupila do voleb 1992. Jejím předsedou byl zvolen Jiří Horák, bývalý člen exilové ČSSD. Symbolem strany se stal Valtr Komárek, významná osobnost sametové revoluce. Strana získala ve volbách 6,5 % hlasů, tedy 16 mandátů, což pro ni bylo zklamáním.</p>";
      partiesContainerDiv.style.backgroundImage = "url(../img/cssd.jpg)";
  
    }
    if(selectedDiv.innerHTML.indexOf("ODS-KDS") !== -1) {
      changingPartiesDiv.innerHTML = "<p>ODS-KDS</p><br>Občanská demokratická strana vznikla v dubnu 1991 rozpadem Občanského fóra. <br>V jejím čele stanul bývalý předseda OF, Václav Klaus. Strana uzavřela koalici <br>s Křesťansko-demokratickou stranou s výraznou osobností Václava Bendy a pod zkratkou ODS-KDS získala ve volbách 29,7 % hlasů, tedy 76 mandátů. <br>Byla jednoznačným vítězem voleb. Poté přistoupila k sestavení vlády s KDU-ČSL <br>a Občanskou demokratickou aliancí. ODS měla velkou zásluhu na rozdělení Československa. Podnikala zásadní kroky k ekonomické transformaci a začlenění <br>do struktur NATO a EU.";
      partiesContainerDiv.style.backgroundImage = "url(../img/ods.jpg)"
  
    }
    if(selectedDiv.innerHTML.indexOf("OBČANSKÉ HNUTÍ") !== -1) {
      changingPartiesDiv.innerHTML = "<p>OBČANSKÉ HNUTÍ</p><br>Občanské hnutí vzniklo rozkolem Občanského fóra a v zásadě bylo jeho pokračovatelem. Šlo o středové politické uskupení v čele s předsedou Jiřím Dienstbierem. Dalšími významnými osobnostmi byl historik a spisovatel Petr Pithart nebo filozof Jan Sokol. Romantický duch Občanského hnutí a představa apolitické politiky v sobě snoubila členy různých názorových proudů. Strana však ve volbách získala pouhých 4,6 % hlasů a stala se spíš jakousi připomínkou sametové revoluce. Nebyla schopna ustát proměnu politické scény. Pod jiným názvem existovala <br>až do roku 1996, ale větších politických úspěchů se nedočkala.";
      partiesContainerDiv.style.backgroundImage = "url(../img/oh.jpg)";
    }
    if(selectedDiv.innerHTML.indexOf("LEVÝ BLOK") !== -1) {
      changingPartiesDiv.innerHTML = "<p>LEVÝ BLOK</p><br><p>Levý blok vznikl za účelem posílení volebního potenciálu těsně před volbami 1992. Primárně šlo o koalici několika menších politických uskupení a dvou větších levicových stran: <br><br>1.	Komunistická strana Čech a Moravy, coby neoficiální nástupce Komunistické strany Československa z období před sametovou revolucí. <br><br>2.	Demokratická levice ČSFR. Ve volbách získal Levý blok 14 % hlasů, tedy <br>35 mandátů, což z něj udělalo nejsilnější levicové uskupení tehdejší doby. Spolupráce uvnitř koalice však nebyla ideální, což se projevilo odchodem politiků z KSČM <br>do Demokratické levice a také založením nové samostatné strany Levý blok. Koalice oficiálně zanikla v polovině roku 1994.</p>";
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


