/*jslint browser:true */
"use strict";

function addMonths (elem) {
let  annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
let months = document.getElementById(elem).getElementsByTagName('input');

    for (i = 0; i<months.length; i++){
        x = Number(months[i].value);
        annualUseKw += x;
    } // end loop
    dailyUseKw = annualUseKw/365;
    return dailyUseKw;

} // end function


function sunHours() {
let hrs;
let theZone = document.forms.solarForm.zone.selectedIndex;
theZone +=1;
switch(theZone) {
    case 1:
        hrs = 6;
        break;
    case 2:
        hrs = 5.5;
        break;
    case 3:
        hrs = 5;
        break;
    case 4:
        hrs = 4.5;
        break;
    case 5:
        hrs = 4.2;
        break;    
    case 6:
        hrs = 3.5;
        break;
    default:
        hrs = 0;
    } // end of switch
return hrs;
} // End function

function calculatePanel () {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let panelName = panelOptions[userChoice].text;
    let x = [power, panelName];
    return x;

} // end of function


function calculateSolar() {
    let dailyUseKw = addMonths('mpc');
   // console.log(dailyUseKw);

    let sunHoursPerDay = sunHours();
    //console.log(sunHoursPerDay);

    let minKwNeeds = dailyUseKw/sunHoursPerDay;
    //console.log(minKwNeeds);

    let realKwNeeds = minKwNeeds * 1.25;
    //console.log(realKwNeeds);

    let realWattNeeds = realKwNeeds * 1000;
   //console.log(realWattNeeds);

    let panelInfo = calculatePanel();
    let panelOutput = panelInfo[0];
    let panelChoice = panelInfo[1];
    //console.log(panelOutput);
    //console.log(panelChoice);

    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
    //console.log(panelsNeeded);


    let feedback = "";
    feedback += "<p> Based on your average daily use of "+ Math.round(dailyUseKw)+" kWh, you will need to purchase "+ panelsNeeded +" "+ panelChoice +" brand solar panels to offest 100% of your eletricity bill.</p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: "+Math.round(dailyUseKw)+" Kwh per day.</p>";
    feedback += "<p>Average sunshine hours per day: "+sunHoursPerDay+" hours </p>";
    feedback += "<p>Realistic watts needed per hour: "+Math.round(realWattNeeds)+" watts/hour.</p>";
    feedback += "<p>The "+panelChoice+" panel you selected generates about "+panelOutput+" watts per hour.</p>";

    document.getElementById('feedback').innerHTML = feedback;

} //end function