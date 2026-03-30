// Variables for cost calculation questions

let yearlyCostTotal = 0;
let monthlyCostTotal = 0;
let currentCostQuestion = 1;
let costFinished = false;
let minimumPensionSavings = 100;
let minBuffertSavings = 1000;

const monthlyInput = 1;
const yearlyInput = 2;

const avgTaxRate = 0.32;
const employerFee = 0.32;

var regExZero = /^0[0-9].*$/

var costQuestions = [
  { number: 1, title: "Lön", text: "Vad VILL du ha i lön (exl. skatt) varje månad?", details: `Obs! Här kan du bortse från resultaträkningen - Fyll i vad du faktiskt VILL ha! <br/> <a href="https://advisa.se/fragor/vad-ar-medellonen-i-sverige/" alt="Medellön i Sverige" class="linkman">Lönestatistik</a>`, valueMonth: 0, valueYear: 0, requestedAnswerType: monthlyInput, answered: false },
  { number: 2, title: "Preliminärskatt", text: "Vad betalar du i Preliminärskatt per år:", details: "Preliminärskatt är skatt på överskott i företaget", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 3, title: "Bokföring", text: "Vad betalar du i Bokföringskostnad per år:", details: "Bokföringskostnad inkluderar även programvaror för bokföring (redovisningsprogram kan det stå i rapporten) (ej bankavgifter)", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 4, title: "Bokning/Kassa", text: "Vad betalar du för Bokings- och kassasystem per år:", details: "här tar du även med om du betalar för en kortterminal men inte transaktionsavgifterna ", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 5, title: "Telefon/Internet", text: "Vad betalar för Telefon/Internet per år:", details: "t.ex. Fast telefon, mobil, internetabbonemang", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 6, title: "El/Vatten", text: "Vad betalar du för El och Vatten per år:", details: "Elräkning, ev. vattenräkning, uppvärmning", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered:false },
  { number: 7, title: "Hyra", text: "Vad betalar du i Hyra per år:", details: "lokalhyra (eller om du hyr stol kan du skriva in den här)", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 8, title: "Försäkring", text: "Vad betalar du i Försäkring per år:", details: "Företagsförsäkring, sjukförsäkring, livförsäkring, pensionsförsäkring (ej pensionssparande) osv", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 9, title: "Pensionssparande", text: "Hur mycket pensionssparar du varje månad?:", details: "Jag rekommenderar att du MINST sparar 2000:-/månad. Är du över 50 år , MINST 5000. Men allt är bättre än inget.", valueMonth: 0, valueYear: 0, requestedAnswerType: monthlyInput, answered: false },
  { number: 10, title: "Buffertsparande", text: "Hur mycket sparar du för buffert varje år?:", details: "Oförutsedda händelser, framtida investeringar? buffert - en buffert bör alla företag ha. Mitt förslag är minimum 10.000. Det kan gå till oförutsedda oluyckor/skador, sjukdom, renoveringar, expansion mm.", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 11, title: "Utbildning", text: "Vad betalar du för Utbildning per år:", details: "utbildning är inspirationskvällar, visningar; klippkurs, företagskurs mm. Tänk på att det ska täcka även förlorad inkomst den tiden", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 12, title: "Fika/kaffe", text: "Vad betalar du för Fika/kaffe per månad:", details: "Bullar, kakor, mjölk, tidningar, kaffe, osv", valueMonth: 0, valueYear: 0, requestedAnswerType: monthlyInput, answered: false },
  { number: 13, title: "Bank/kortbetalning", text: "Vad betalar du i Bankkostnader (inkl.avgifter för kortbetalningar) per år:", details: "Kortavgifter, transaktionsavgifter, kontoavgifter, ränta, ", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 14, title: "Material behandlingar", text: "Vad betalar du i Materialkostnad för behandlingar per år?:", details: "Färg, folie, kappor, handdukar, penslar, skålar, väte osv. <br/>Obs! Inte inköp av stylingprodukter för försäljning. Detta kan vara svårt att avläsa ur resultaträkningen, uppskatta i så fall.", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 15, title: "Städ/Återvinning", text: "Vad betalar du för Städ och återvinning varje år?", details: "Städtjänst, återvinning, sopsortering, fönsterputs, städmedel, pappershanddukar, toapapper, skurhink, tvål osv", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 16, title: "Marknadsföring", text: "Vad betalar du för marknadsföring per år?", details: "Google ads, instagram ads, tidningar, onlinesidor mm", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 17, title: "IT-Tjänster", text: "Vad betalar du för IT-tjänster per år?", details: "Hemsidor, programvaror, dator, skrivare, tripod, mikrofon (content prylar med andra ord) osv", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 18, title: "Övrigt material", text: "Vad betalar du i Övriga materialkostnader per år:", details: "Skrivarpapper, bläck, pennor, brickor, kaffemuggar, påsar osv", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 19, title: "Resor/Transport", text: "Vad betalar du i Resekostnader/Transport per år:", details: "Reser du i jobbet? trängselskatt? förmånsbil?", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false },
  { number: 20, title: "Övrigt", text: "Övriga kostnader", details: "Alla saker du inte  över i din resultatrapport kan du föra in i den här posten", valueMonth: 0, valueYear: 0, requestedAnswerType: yearlyInput, answered: false }
];

var additionalCosts = [
  { name: "Skatt på lön", valueYear: 0, valueMonth: 0 },
  { name: "Arbetsgivaravgift", valueYear: 0, valueMonth: 0 },
  // { name: "Minimum semestersparande (11%)", valueYear: 0, valueMonth: 0 }
]

// Variables for price calculation questions
let hoursPerWeek = 0;
let hoursWithCustomerPerWeek = 0;
let currentPriceQuestion = 1;
let priceFinished = false;


// Questionnaire variables

let currentQuestionIndex = 0;


var priceQuestions = [
                  { number : 1, text: "Hur många timmar jobbar du per vecka?", details: "", value: 0 },
                  { number : 2, text: `Hur många av dessa ${hoursPerWeek}h är med kund?`, details: "", value: 0 },
                  ];


// ------------------- Functions ------------------- //

// Question display and navigation functions
function nextQuestion() {

    currentQuestionIndex++;

  if (currentQuestionIndex >= costQuestions.length) {
    currentQuestionIndex = costQuestions.length - 1; // Stay at last question
  }
 console.log(costQuestions);
  currentQuestion();
}

function previousQuestion() {
  if(currentQuestionIndex > 0) {
    currentQuestionIndex--;
  }
  currentQuestion();
}

function updateQuestionNumber() {
  if(!costFinished)
  {
    document.getElementById("question-number").textContent = `${currentQuestionIndex + 1} / ${costQuestions.length}`;
  }
  else if(costFinished && !priceFinished)
  {
    document.getElementById("question-number").textContent = `${currentQuestionIndex + 1} / ${priceQuestions.length}`;
  }
}

function currentQuestion() {

  if(!costFinished)
  {
    if(costQuestions[currentQuestionIndex].requestedAnswerType === 1)
    {
      document.getElementById("question-container").innerHTML =
      `      
      <div class="headline">          
      <h4>${costQuestions[currentQuestionIndex].text}</h4>
      <span class="details-mark">
        <span class="details-text">${costQuestions[currentQuestionIndex].details}</span>
        ?
      </span>


      </div>
      <div class="form-group">
      <input type="number" id="answer" name="answer" value="${costQuestions[currentQuestionIndex].valueMonth}">
      </div>
      `
    }
    else if(costQuestions[currentQuestionIndex].requestedAnswerType === 2)
    {  
      document.getElementById("question-container").innerHTML =
      `     
      <div class="headline">          <span class="details-mark">
      <span class="details-text">${costQuestions[currentQuestionIndex].details}</span>
      ?
      </span>
      <h4>${costQuestions[currentQuestionIndex].text}</h4>

      
      </div>
      <div class="form-group">
      <input type="number" id="answer" name="answer" value="${costQuestions[currentQuestionIndex].valueYear}">
      </div>
      `
    }
  } 

  else if(costFinished && !priceFinished)
  {
    if(currentQuestionIndex > 1) {
      moveToResults();
    }
    else
    {
      
      document.getElementById("question-container").innerHTML =
      `
      <h4>${priceQuestions[currentQuestionIndex].text}</h4>
      <div class="form-group">
      <input type="number" id="answer" name="answer" placeholder=0 value="${priceQuestions[currentQuestionIndex].value}">
      </div>
      `
    }
  }

  if(!costFinished || !priceFinished) {

    if (!costFinished && currentQuestionIndex <= 0) {
      // First cost question: disable prev
      document.getElementById("prev-button").innerHTML = "<button disabled>&#10094; Föregående</button>";
    } else if (costFinished && !priceFinished && currentQuestionIndex === 0) {
      // First price question: go back to last cost question
      document.getElementById("prev-button").innerHTML = "<button onClick='backToCostQuestions()'>&#10094; Föregående</button>";
    } else {
      // All other cases: enable prev
      document.getElementById("prev-button").innerHTML = `<button onClick="previousQuestion()">&#10094; Föregående</button>`;
    }

    if(!costFinished) {

      if(currentQuestionIndex >= costQuestions.length - 1) {
            document.getElementById("next-button").innerHTML = `<button onClick="addToValue(document.getElementById('answer').value)">Fortsätt till nästa steg &#10095;</button>`;
            
          }
      else {
        document.getElementById("next-button").innerHTML = `<button onClick="addToValue(document.getElementById('answer').value)">Nästa &#10095;</button>`;
      }
    }
    else if(costFinished && !priceFinished && currentQuestionIndex < priceQuestions.length -1) {
      
        document.getElementById("next-button").innerHTML = `<button onClick="addPriceAnswer(document.getElementById('answer').value)">Nästa &#10095;</button>`;
      }
    else if(costFinished && !priceFinished && currentQuestionIndex === priceQuestions.length -1) {
      document.getElementById("next-button").innerHTML = `<button onClick="addPriceAnswer(document.getElementById('answer').value)">Se resultat &#10095;</button>`;
    }


  updateQuestionNumber();
    }

    // if(costFinished && priceFinished) {
    //   document.getElementById("prev-button").innerHTML = "<button onClick=\"previousQuestion()\">&#10094; Föregående</button>";
    //   document.getElementById("next-button").innerHTML = "";
    //   document.getElementById("question-container").innerHTML = "";
    // }
}

function backToCostQuestions() {
  costFinished = false;
  currentQuestionIndex = costQuestions.length - 1;
  currentQuestion();
}

function moveToPriceQuestions() {
  costFinished = true;

  currentQuestionIndex = 0;
  currentQuestion();
}

function moveToResults() {
  priceFinished = true;
  presentPricing();
  document.getElementById("question-number").innerHTML = "Resultat";
  document.getElementById("question-container").innerHTML = 
  "<div class=\"after-result\"><h4>Har du frågor om hur du kan få din verksamhet att blomstra?<br/> Ta kontakt nedan!</h4> <button><a href=\"http://www.mittdromhar.se\">Mitt Drömhår länk</a></button> <button onclick='presentPricing()'>Visa resultatet igen</button></div> <p>Psst! Du kan också bläddra tillbaka och ändra dina svar om något blev fel!</p>";
  document.getElementById("prev-button").innerHTML = "<button onClick='backToLastPriceQuestion()'>&#10094; Föregående</button>";
  document.getElementById("next-button").innerHTML = "<button disabled>Slutförd</button>";
}

// Answer handling functions

function addPriceAnswer(value) {
  if(currentQuestionIndex === 0) {
    hoursPerWeek = Number(value);
    priceQuestions[0].value = hoursPerWeek;
    priceQuestions[1].text = `Hur många av dessa ${hoursPerWeek}h är med kund?`;
  }
  else if(currentQuestionIndex === 1) {
    hoursWithCustomerPerWeek = Number(value);
    priceQuestions[1].value = hoursWithCustomerPerWeek;
    priceFinished = true;
    saveToLocalStorage();
    moveToResults();
    return;
  }
  saveToLocalStorage();
  updateCalculations();
  nextQuestion();
}

function addToValue(value) {

  if(regExZero.test(value)) {
    alert("Värdet kan inte börja med 0!");
    return;
  }
  if(isNaN(value) || value < 0) {
    alert("Vänligen ange ett giltigt nummer större än eller lika med 0.");
    return;
  }



    costQuestions[currentQuestionIndex].answered = true;

    if(costQuestions[currentQuestionIndex].requestedAnswerType === 1)
    {
      costQuestions[currentQuestionIndex].valueMonth = Number(value);
      costQuestions[currentQuestionIndex].valueYear = Number(value) * 12;
    }
    else if(costQuestions[currentQuestionIndex].requestedAnswerType === 2)
    {
      costQuestions[currentQuestionIndex].valueMonth = Number(value) / 12;
      costQuestions[currentQuestionIndex].valueYear = Number(value);
    }

    answerAlert(costQuestions[currentQuestionIndex]);

    updateCalculations();
    saveToLocalStorage();

    
    if(currentQuestionIndex === costQuestions.length -1) {
      showPopupAlert("Du har nått slutet av kostnadsfrågorna. Nästa del handlar om hur mycket tid du arbetar! Om du vill ändra något svar kan du navigera tillbaka med knappen \"Föregående\".");
      moveToPriceQuestions();
      return;
    }
    nextQuestion();

    if(costFinished && !priceFinished && currentQuestionIndex === priceQuestions.length) {
    }


  
}

// Calculation and result display functions

function backToLastPriceQuestion() {
  // Hide the result popup
  closeResultPopup();
  // Set state to show the last price question
  priceFinished = false;
  currentQuestionIndex = 1; // index of the last price question
  currentQuestion();
}

function updateCalculations() {
yearlyCostTotal = 0;
  
costQuestions.forEach(question => {
    yearlyCostTotal += parseFloat(question.valueYear);
  });

  monthlyCostTotal = yearlyCostTotal / 11;
  additionalCosts[0].valueYear = costQuestions[0].valueYear * avgTaxRate;
  additionalCosts[0].valueMonth = costQuestions[0].valueMonth * avgTaxRate;
  additionalCosts[1].valueYear = (costQuestions[0].valueYear + costQuestions[0].valueYear) * employerFee;
  additionalCosts[1].valueMonth = (costQuestions[0].valueMonth + costQuestions[0].valueMonth) * employerFee;
  // additionalCosts[2].valueYear = monthlyCostTotal;
  // additionalCosts[2].valueMonth = monthlyCostTotal / 11;

additionalCosts.forEach(cost => {
    yearlyCostTotal += parseFloat(cost.valueYear);
  });

console.log("Yearly cost total: " + yearlyCostTotal);
monthlyCostTotal = yearlyCostTotal / 11;
console.log("Monthly cost total: " + monthlyCostTotal);
updateCostTable();
updatePriceTable();
}

function updateCostTable()
{


    document.getElementById("costs-table").innerHTML =
      `
        <tr>
          <td>Utgifter</td>
          <td>Per år</td>
          <td>Per månad</td>
        </tr>
        
        ${costQuestions.map(question => `
          <tr>
            <td>${question.title}</td>
            <td>${Number(question.valueYear).toFixed(0)} kr</td>
            <td>${Number(question.valueMonth).toFixed(0)} kr</td>
          </tr>
        `).join('')}
        
        <tr>
          <td>Skatt på lön</td>
          <td>${Number(additionalCosts[0].valueYear).toFixed(0)} kr</td>
          <td>${Number(additionalCosts[0].valueMonth).toFixed(0)} kr</td>
        </tr>
        <tr>
          <td>Arbetsgivaravgift</td>
          <td>${Number(additionalCosts[1].valueYear).toFixed(0)} kr</td>
          <td>${Number(additionalCosts[1].valueMonth).toFixed(0)} kr</td>
        </tr>

        <tr>
          <td><strong>Totalt</strong></td>
          <td><strong>${Number(yearlyCostTotal).toFixed(0)} kr</strong></td>
          <td><strong>${Number(monthlyCostTotal).toFixed(0)} kr</strong></td>
        </tr>
      `;
}

        // <tr>
        //   <td>Minimum semestersparande <br/>(4 veckors semester)</td>
        //   <td>${Number(additionalCosts[2].valueYear).toFixed(0)} kr</td>
        //   <td>${Number(additionalCosts[2].valueMonth).toFixed(0)} kr</td>
        // </tr>

function updatePriceTable()
{
    document.getElementById("price-table").innerHTML =
      `
        <tr>
          <td>Arbetad tid per vecka: </td>
          <td>${priceQuestions[0].value}</td>
        </tr>
        <tr>
          <td>Arbetad tid med kund per vecka: </td>
          <td>${priceQuestions[1].value}</td>
        </tr>
      `;
}

function presentPricing() {

  const resultSummary = `<h4 class="result-title">Ditt Resultat</h4>
  <h5> Din årskostnad är <br/><strong class="result-focus">${yearlyCostTotal.toFixed(0)} kr</strong> </h5>
  <h5> Det betyder att din månadskostnad är<br/> <strong class="result-focus">${monthlyCostTotal.toFixed(0)} kr</strong> </h5>
  <h5> Du har betalande kunder i genomsnitt <br/><strong class="result-focus">${priceQuestions[1].value} timmar</strong> per vecka </h5>
    <p>Baserat på dina svar behöver du ta ut följande timpris för att täcka dina kostnader och önskad lön:</p>
  `;

  const resultTable = 
  `<table class="result-table">
    <tr>

        <th>Utan moms</th>
        <th>Med moms</th>
        <th>30h med kunder</th>
    </tr>
    <tr>
      <td><strong class="result-focus">${calculatePricePerHour()} kr</strong></td>
      <td><strong class="result-focus">${calculatePricePerHourWithTax(calculatePricePerHour())} kr</strong></td>
      <td><strong class="result-focus">${calculatePricePer40HourWithTax()} kr</strong></td>
    </tr>
    <tr>
      <td colspan="3" class="tip"><p class="result-title-small">Tips!</p> Varje månad för du över <strong>${(monthlyCostTotal.toFixed(0) / 11).toFixed(0)} kr.</strong> till ett semestersparkonto för att täcka inkomstbortfall för en månads semester.</td>
    </tr>

</table>`



  showResultPopup(resultSummary + resultTable);
};

function calculatePricePerHour() {

  return (yearlyCostTotal / 11 / (priceQuestions[1].value * 4)).toFixed(0);

}

function calculatePricePerHourWithTax(salary) {

return (salary * 1.25).toFixed(0);
}


function calculatePricePer40HourWithTax() {

  let price40hr = (((yearlyCostTotal / 11) / (30 * 4)) * 1.25).toFixed(0);
return price40hr;

}


// Local storage functions

function saveToLocalStorage() {

  let savePrices = [];
  priceQuestions.forEach(question => {
    savePrices.push( {number: question.number, value: question.value} );
  });

  let saveCosts = [];

costQuestions.forEach(question => {
    saveCosts.push( {number: question.number, value: question.value, valueYear: question.valueYear, valueMonth: question.valueMonth} );
  });

  localStorage.setItem("prices", JSON.stringify(savePrices));
  localStorage.setItem("costs", JSON.stringify(saveCosts));

}

function loadFromLocalStorage() {

  costStorage = JSON.parse(localStorage.getItem("prices"));
  priceStorage = JSON.parse(localStorage.getItem("costs"));

  costQuestions.forEach(question => {
    let storedQuestion = costStorage.find(q => q.number === question.number);
    if(storedQuestion) {
      question.valueYear = storedQuestion.valueYear;
      question.valueMonth = storedQuestion.valueMonth;
      question.answered = true;
    }
  });

  priceQuestions.forEach(question => {
    let storedQuestion = priceStorage.find(q => q.number === question.number);
    if(storedQuestion) {
      question.value = storedQuestion.value;
      question.answered = true;
    }
  });

}

function clearAnswers() {

  localStorage.removeItem("prices");
  localStorage.removeItem("costs");
  hoursPerWeek = 0;  
  hoursWithCustomerPerWeek = 0;
  location.reload();

}


// Initial call to display the first question

document.addEventListener('DOMContentLoaded', function() {

  if(localStorage.getItem("costQs"))
 {
    loadFromLocalStorage();
 }
    updateCalculations();
    updateCostTable();
    updatePriceTable();
    currentQuestion();

});

// Popup alert functions

function answerAlert(question) {

  if(!costFinished)
  {

    switch(question.number)
    {
    case 1:
      showPopupAlert('Är du helt säker på att du fyllt den lön du faktiskt vill ha? Kom ihåg att detta i så fall är lönen du betalar ut till dig själv, exklusive skatt!');
      break;
    case 9:
      if(question.valueMonth < minimumPensionSavings)
        {
          costQuestions[currentQuestionIndex].valueMonth = minimumPensionSavings;
          costQuestions[currentQuestionIndex].valueYear = minimumPensionSavings * 11;
          showPopupAlert(`Du MÅSTE spara minst ${minimumPensionSavings} kr i månaden för din pension!`);
        }
        break;
      case 10:
        if(question.valueMonth < minBuffertSavings)
          {
            costQuestions[currentQuestionIndex].valueMonth = minBuffertSavings;
        costQuestions[currentQuestionIndex].valueYear = minBuffertSavings * 11;
        showPopupAlert(`Du MÅSTE spara minst ${minBuffertSavings} kr i månaden för oförutsedda händelser och framtida investeringar!`);
          }
          break;
      case 11:
        showPopupAlert('Jag rekommenderar MINST 20.000 kr per år för att kontinuerligt utvecklas och hålla dig uppdaterad inom ditt yrke!');
        break;
      default:
        break;
      }
    }
}

function showPopupAlert(message) {
  console.log("show popup");
  document.getElementById('popup-alert-message').textContent = message;
  document.getElementById('popup-alert-overlay').style.display = 'flex';
}

function closePopupAlert() {
  document.getElementById('popup-alert-overlay').style.display = 'none';
}

// Close popup when clicking outside the box
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('popup-alert-overlay');
  const box = document.querySelector('.popup-alert-box');
  if (
    overlay.style.display === 'flex' &&
    overlay === e.target // Only close if clicking the overlay itself, not any child
  ) {
    closePopupAlert();
  }
});

function showAreYouSurePopupAlert(message) {
  document.getElementById('popup-sure-message').textContent = message;
  document.getElementById('popup-sure-overlay').style.display = 'flex';
}

function closeSureAlert() {
  document.getElementById('popup-sure-overlay').style.display = 'none';

}

function confirmSureAlert() {
  document.getElementById('popup-sure-overlay').style.display = 'none';
  if(!costFinished && !priceFinished) {
    moveToPriceQuestions();
  }
}

document.addEventListener('click', function(e) {
  const overlay = document.getElementById('popup-sure-overlay');
  const box = document.querySelector('.popup-sure-box');
  if (
    overlay.style.display === 'flex' &&
    overlay === e.target // Only close if clicking the overlay itself, not any child
  ) {
   closeSureAlert();
  } 
});

// Result popup functions

function closeResultPopup() {
  document.getElementById('result-popup-overlay').style.display = 'none';
} 
function showResultPopup(content) {
  document.getElementById('result-content').innerHTML = content;
    document.getElementById('result-popup-overlay').style.display = 'flex';

}

// Close popup when clicking outside the box
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('result-popup-overlay');
  const box = document.querySelector('.result-popup-box');
  if (
    overlay.style.display === 'flex' &&
    overlay === e.target // Only close if clicking the overlay itself, not any child
  ) {
    closeResultPopup();
  } 
});

// Print popup functions


function buildPrintableReport() {

}
// Print Elements

// var PrintElements = (function () {
//     "use strict";

//     var hideFromPrintClass = "pe-no-print";
//     var preservePrintClass = "pe-preserve-print";
//     var preserveAncestorClass = "pe-preserve-ancestor";
//     var bodyElementName = "BODY";

//     var _hide = function (element) {
//         if (!element.classList.contains(preservePrintClass)) {
//             element.classList.add(hideFromPrintClass);
//         }
//     };

//     var _preserve = function (element, isStartingElement) {
//         element.classList.remove(hideFromPrintClass);
//         element.classList.add(preservePrintClass);
//         if (!isStartingElement) {
//             element.classList.add(preserveAncestorClass);
//         }
//     };

//     var _clean = function (element) {
//         element.classList.remove(hideFromPrintClass);
//         element.classList.remove(preservePrintClass);
//         element.classList.remove(preserveAncestorClass);
//     };

//     var _walkSiblings = function (element, callback) {
//         var sibling = element.previousElementSibling;
//         while (sibling) {
//             callback(sibling);
//             sibling = sibling.previousElementSibling;
//         }
//         sibling = element.nextElementSibling;
//         while (sibling) {
//             callback(sibling);
//             sibling = sibling.nextElementSibling;
//         }
//     };

//     var _attachPrintClasses = function (element, isStartingElement) {
//         _preserve(element, isStartingElement);
//         _walkSiblings(element, _hide);
//     };

//     var _cleanup = function (element, isStartingElement) {
//         _clean(element);
//         _walkSiblings(element, _clean);
//     };

//     var _walkTree = function (element, callback) {
//         var currentElement = element;
//         callback(currentElement, true);
//         currentElement = currentElement.parentElement;
//         while (currentElement && currentElement.nodeName !== bodyElementName) {
//             callback(currentElement, false);
//             currentElement = currentElement.parentElement;
//         }
//     };

//     var _print = function (elements) {
//         for (var i = 0; i < elements.length; i++) {
//             _walkTree(elements[i], _attachPrintClasses);
//         }
//         window.print();
//         for (i = 0; i < elements.length; i++) {
//             _walkTree(elements[i], _cleanup);
//         }
//     };

//     return {
//         print: _print
//     };
// })();

// New print section

// const printButton = document.getElementById('print-button');

// const printPage = () => {
//   const printFrame = document.createElement('iframe');
//   printFrame.style.display = 'none';
//   printFrame.src = 'start.html';

//   document.body.appendChild(printFrame);

//   printFrame.contentWindow.focus();
//   printFrame.contentWindow.print();
// }

// printButton.addEventListener('click', printPage);

const printButton = document.getElementById('print-button');

const printPage = () => {
  // Get the content you want to print (e.g., the result popup)
  const content = document.getElementById('result-content').innerHTML;

  const table = document.getElementById('report-calc').innerHTML;

  // Open a new window for printing
  const printWindow = window.open('', '', 'width=1200,height=800');

  // Write the content and styles to the new window
  printWindow.document.write(`
    <html>
      <head>
        <title>Skriv ut resultat</title>
        <link rel="stylesheet" href="simple.css">
      </head>
      <body>
      <div class="print-window-section">
        <div class="print-window-content">
          ${content}
        </div>
        <div class="print-window-table">
          ${table}
        </div>
      </div>
      </body>
    </html>
  `);

  // Wait for the content and styles to load, then print
  printWindow.document.close();
  printWindow.onload = function() {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
};

printButton.addEventListener('click', printPage);