let display = document.getElementById("display");

let shouldResetDisplay = false;
let history = [];
let isDark = false;

/* =========================
   INPUT HANDLING (FIXED)
========================= */

function append(value) {

    // CASE 1: after "=" result state
    if (shouldResetDisplay) {

        // number starts fresh
        if (!isNaN(value)) {
            display.innerText = value;
        }
        // bracket after result → implicit multiplication
        else if (value === "(") {
            display.innerText += "*(";
        }
        // operator after result continues expression
        else {
            display.innerText += value;
        }

        shouldResetDisplay = false;
        return;
    }

    // CASE 2: normal input
    if (display.innerText === "0") {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

/* =========================
   BRACKETS (SAFE)
========================= */

function appendBracket(bracket) {

    if (shouldResetDisplay) {

        if (bracket === "(") {
            display.innerText = bracket;
        } else {
            display.innerText = bracket;
        }

        shouldResetDisplay = false;
        return;
    }

    if (display.innerText === "0") {
        display.innerText = bracket;
    } else {
        display.innerText += bracket;
    }
}

/* =========================
   SANITIZER (FIXED EDGE CASES)
========================= */

function sanitizeExpression(expr) {

    // fix implicit multiplication
    expr = fixImplicitMultiplication(expr);

    // remove trailing operators
    expr = expr.replace(/[+\-*/.]+$/, "");

    // fix empty brackets like ()
    expr = expr.replace(/\(\s*\)/g, "");

    return expr;
}

/* =========================
   DELETE / CLEAR
========================= */

function clearDisplay() {
    display.innerText = "0";
}

function clearAll() {
    display.innerText = "0";
    history = [];
    renderHistory();
}

function deleteLast() {
    if (display.innerText.length === 1) {
        display.innerText = "0";
    } else {
        display.innerText = display.innerText.slice(0, -1);
    }
}

/* =========================
   CALCULATION (FIXED)
========================= */

function calculateResult() {
    try {
        let expression = display.innerText;

        expression = sanitizeExpression(expression);

        let result = new Function("return " + expression)();

        history.push({
            expression,
            result
        });

        display.innerText = result;
        shouldResetDisplay = true;

        renderHistory();

    } catch (error) {
        display.innerText = "Error";
        shouldResetDisplay = true;
    }
}

/* =========================
   IMPLICIT MULTIPLICATION
========================= */

function fixImplicitMultiplication(expr) {
    return expr
        .replace(/\)\(/g, ")*(")
        .replace(/(\d)\(/g, "$1*(")
        .replace(/\)(\d)/g, ")*$1");
}

/* =========================
   HISTORY SYSTEM
========================= */

function renderHistory() {
    let panel = document.getElementById("historyPanel");
    if (!panel) return;

    panel.innerHTML = "";

    history.forEach(item => {
        let div = document.createElement("div");
        div.className = "history-item";
        div.innerText = `${item.expression} = ${item.result}`;

        div.onclick = () => {
            display.innerText = item.result;
            shouldResetDisplay = true;
        };

        panel.appendChild(div);
    });
}

function toggleHistory() {
    let panel = document.getElementById("historyPanel");
    panel.classList.toggle("show");
}

/* =========================
   THEME TOGGLE
========================= */

function toggleTheme() {
    isDark = !isDark;

    document.body.classList.toggle("dark");

    document.querySelector(".calculator").classList.toggle("dark");

    let panel = document.getElementById("historyPanel");
    if (panel) panel.classList.toggle("dark");
}