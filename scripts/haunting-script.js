// title: Spirit Haunting Calculator
// author: Campbell Kramer
// date: 23 Nov 2024

// declare constant values
const DEFAULT_CHARGES = 5;
const DEFAULT_ACTIVATION = 1.5;
const DEFAULT_MOVEMENT_SPEED = 7.04;
const DEFAULT_RECHARGE = 1 / 3;

const select1 = document.getElementById("addon1");
const select2 = document.getElementById("addon2");

// main calculation function
function main() {
  let addon1 = select1.value;
  let addon2 = select2.value;

  let addons = [addon1, addon2];

  let movementSpeed = getMovementSpeed(addons).toFixed(2);
  let maxDuration = getMaxDuration(addons);
  let rechargeTime = getRechargeTime(addons, maxDuration).toFixed(2);
  let maxDistance = (movementSpeed * maxDuration).toFixed(2);
  let activationTime = getActivationTime(addons).toFixed(2);

  // display results
  document.getElementById("movement-speed").innerHTML = `${movementSpeed}`;
  document.getElementById("recharge-time").innerHTML = `${rechargeTime}`;
  document.getElementById("max-distance").innerHTML = `${maxDistance}`;
  document.getElementById("max-duration").innerHTML = `${maxDuration}`;
  document.getElementById("activation-time").innerHTML = `${activationTime}`;
}

function getMovementSpeed(addons) {
  let movementSpeedModifier = 1;
  if (addons.includes("ring")) {
    movementSpeedModifier += 0.25;
  }
  if (addons.includes("cap")) {
    movementSpeedModifier += 0.1;
  }
  if (addons.includes("zori")) {
    movementSpeedModifier += 0.05;
  }
  if (addons.includes("yakuyoke")) {
    movementSpeedModifier *= 0.85;
  }
  return movementSpeedModifier * DEFAULT_MOVEMENT_SPEED;
}

function getMaxDuration(addons) {
  let maxDurationModifier = 1;
  if (addons.includes("yakuyoke")) {
    maxDurationModifier += 0.7;
  }
  if (addons.includes("talisman")) {
    maxDurationModifier += 0.2;
  }
  if (addons.includes("shiawase")) {
    maxDurationModifier += 0.1;
  }
  return DEFAULT_CHARGES * maxDurationModifier;
}

function getRechargeTime(addons, maxDuration) {
  let rechargeSpeedModifier = 1;
  if (addons.includes("flute")) {
    rechargeSpeedModifier += 0.4;
  }
  if (addons.includes("watch")) {
    rechargeSpeedModifier += 0.3;
  }
  if (addons.includes("crane")) {
    rechargeSpeedModifier += 0.2;
  }
  return maxDuration / (rechargeSpeedModifier * DEFAULT_RECHARGE);
}

function getActivationTime(addons) {
  activationModifier = 0;
  if (addons.includes("ribbon")) {
    activationModifier += 0.2;
  }
  if (addons.includes("comb")) {
    activationModifier += 0.15;
  }
  return 1.5 - 1.5 * activationModifier;
}

// reset button
function resetAddOns() {
  document.getElementById("addon-form").reset();
  main();
}

// Event listeners to update variables when select tags change
select1.addEventListener("change", () => {
  main();
});

select2.addEventListener("change", () => {
  main();
});

document.addEventListener("DOMContentLoaded", () => {
  main();
});
