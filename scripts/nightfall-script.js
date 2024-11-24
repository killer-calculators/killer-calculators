// title: Dredge Nightfall Calculator
// author: Campbell Kramer
// date: 01 Nov 2024

// declare constant values
const NIGHTFALL_CHARGES_REQ = 300;
const BASE_CHARGE_PER_SEC = 0.25;
const LOCKER_CHARGE_PER_SEC = 6;
const CHARGES_PER_TELEPORT = 10;
const CHARGES_PER_ATTACK = 20;
const CHARGES_PER_HOOK = 20;
const PLANK_MODIFIER = 1.25;
const LETTERS_MODIFIER = 1.25;
const SHINGLE_MODIFIER = 1.15;
const SKULL_MODIFIER = 1.25;

// main calculation function
function calculateNightfall() {
  // get checkbox values for add-ons
  let hasWoodenPlank = document.getElementById("wooden-plank").checked;
  let hasBurntLetters = document.getElementById("burnt-letters").checked;
  let hasFallenShingle = document.getElementById("fallen-shingle").checked;
  let hasMalthinkersSkull = document.getElementById("malthinkers-skull").checked;

  // get player match data
  let teleports = parseInt(document.getElementById("teleports").value) || 0;
  let attacks = parseInt(document.getElementById("attacks").value) || 0;
  let hooks = parseInt(document.getElementById("hooks").value) || 0;
  let lockerTime = parseInt(document.getElementById("locker-time").value) || 0;
  let injured = parseInt(document.getElementById("injured").value) || 0;
  let injuredChargesTotal = 0;
  let seconds = 0;

  // calculate charges
  let remnantCharges = teleports * CHARGES_PER_TELEPORT;
  let attackCharges = hasBurntLetters
    ? attacks * CHARGES_PER_ATTACK * LETTERS_MODIFIER
    : attacks * CHARGES_PER_ATTACK;
  let hookCharges = hasWoodenPlank
    ? hooks * CHARGES_PER_HOOK * PLANK_MODIFIER
    : hooks * CHARGES_PER_HOOK;
  let lockerCharges = hasFallenShingle
    ? lockerTime * LOCKER_CHARGE_PER_SEC * SHINGLE_MODIFIER
    : lockerTime * LOCKER_CHARGE_PER_SEC;
  lockerCharges = Math.round(lockerCharges * 100) / 100;
  let injuredCharges = hasMalthinkersSkull ? injured * SKULL_MODIFIER : injured;

  // calculate initial charges
  let charges = remnantCharges + attackCharges + hookCharges + lockerCharges;

  // check if Nightfall is charged immediately
  let resultText = "";
  if (charges >= NIGHTFALL_CHARGES_REQ) {
    let resultText = "Nightfall is already charged from match activity alone!";
    document.getElementById("main-result").innerHTML = `${resultText}`;
  } else {
    // calculate the time required to reach Nightfall charge
    while (charges < NIGHTFALL_CHARGES_REQ) {
      injuredChargesTotal += injuredCharges;
      charges += BASE_CHARGE_PER_SEC + injuredCharges;
      seconds++;
    }

    let passiveCharges = seconds * BASE_CHARGE_PER_SEC;

    if (charges > NIGHTFALL_CHARGES_REQ) {
      let difference = charges - NIGHTFALL_CHARGES_REQ;
      injuredChargesTotal -= difference;
    }
    injuredChargesTotal = Math.round(injuredChargesTotal * 100) / 100;

    resultText = `it would take <span class="big data">${seconds}</span> seconds to
          charge nightfall`;

    // display result
    document.getElementById("main-result").innerHTML = `${resultText}`;
    document.getElementById("passive-charges").innerHTML = `${passiveCharges}`;
    document.getElementById("remnant-charges").innerHTML = `${remnantCharges}`;
    document.getElementById("attacks-charges").innerHTML = `${attackCharges}`;
    document.getElementById("hook-charges").innerHTML = `${hookCharges}`;
    document.getElementById("locker-charges").innerHTML = `${lockerCharges}`;
    document.getElementById("injured-charges").innerHTML = `${injuredChargesTotal}`;
  }
}

// function for match data reset button
function resetMatchData() {
  document.getElementById("match-form").reset();
  calculateNightfall();
}

// function for add-on reset button
function resetAddOns() {
  document.getElementById("addon-form").reset();
  calculateNightfall();
}

// cleares number field when field is clicked
function clearInputOnFocus(event) {
  event.target.value = "";
}

// replaces empty number field with 0
function setDefaultValueOnBlur(event) {
  if (event.target.value === "") {
    event.target.value = 0;
    calculateNightfall();
  }
}

// function to increment value for number input
function incrementValue(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
  calculateNightfall(); // Update calculation if needed
}

// function to decrement value for number input
function decrementValue(id) {
  const input = document.getElementById(id);
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
  calculateNightfall(); // Update calculation if needed
}

// uses blur method to fill in emptied number fields after they've been de-selected
document.querySelectorAll("#match-form input[type='number']").forEach((input) => {
  input.addEventListener("blur", setDefaultValueOnBlur);
});

// uses focus method to clear number field upon click
document.querySelectorAll("#match-form input[type='number']").forEach((input) => {
  input.addEventListener("focus", clearInputOnFocus);
});

// add event listeners to run calculateNightfall() automatically on input change
document.querySelectorAll("#match-form input, #addon-form input").forEach((input) => {
  input.addEventListener("input", calculateNightfall);
});

// Run calculation when the page loads
document.addEventListener("DOMContentLoaded", calculateNightfall);
