const display = document.getElementById("display");

// Add value to display
function append(value) {
  display.value += value;
}

// Clear all
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Safe Calculation (without eval)
function calculate() {
  try {
    let expression = display.value;

    // Replace symbols
    expression = expression.replace(/÷/g, "/").replace(/×/g, "*");

    // Basic validation
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
      display.value = "Invalid";
      return;
    }

    // Calculate using Function constructor (safer than eval)
    let result = new Function("return " + expression)();

    // Limit decimal length
    display.value = Number.isInteger(result) ? result : result.toFixed(2);

  } catch (error) {
    display.value = "Error";
  }
}

// Dark Mode Toggle
function toggleMode() {
  document.body.classList.toggle("dark");
}

// Keyboard Support
document.addEventListener("keydown", function (e) {
  if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});