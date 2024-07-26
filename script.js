// General elements
const passGenerator = document.querySelector(".password-generator");
const copyIcon = document.querySelector(".copy-icon");
const createIcon = document.querySelector(".create-icon");
const range = document.querySelector(".range-input");
const rangeValue = document.getElementById("range-value");
const menuIcon = document.querySelector(".menu-icon");
const menuBar = document.querySelector(".menu-bar");
const upperCheckbox = document.getElementById("uppercase");
const lowerCheckbox = document.getElementById("lowercase");
const numberCheckbox = document.getElementById("numbers");
const symbolCheckbox = document.getElementById("symbols");
const passwordInput = document.getElementById("password");
const copyMainBtn = document.querySelector(".copy-btn-main");
const copyNavBtn = document.querySelector(".nav-copy-btn");

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-center",
  timeOut: "3000",
};

// Function to create and attach tooltips
function createTooltip(element, text, tooltipClass) {
  const tooltip = document.createElement("span");
  tooltip.textContent = text;
  tooltip.classList.add(tooltipClass, "hidden");
  passGenerator.insertAdjacentElement("afterbegin", tooltip);

  element.addEventListener("mouseover", () => {
    tooltip.classList.add("visible");
  });

  element.addEventListener("mouseout", () => {
    tooltip.classList.remove("visible");
  });
}

// Create tooltips for icons
createTooltip(copyIcon, "Copy", "copy-tooltip");
createTooltip(createIcon, "Create", "create-tooltip");

// Display menubar on menu icon click
menuIcon.addEventListener("click", () => {
  menuBar.classList.remove("hidden");
});

// Hide menubar when clicking outside of menu icon
window.addEventListener("click", (e) => {
  if (!menuIcon.contains(e.target) && e.target !== menuIcon) {
    menuBar.classList.add("hidden");
  }
});

// Update range value display
range.addEventListener("change", () => {
  rangeValue.textContent = range.value;
});

// Arrays for different character sets
const upperLetters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
const smallLetters = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "'," | ",",
  "]",
  "}",
  "[",
  "{",
  '"',
  ";",
  ":",
  ",",
  "<",
  ">",
  "/",
  "?",
];

// Function to generate a single password from an array
const generatePassword = (arr, length = 16) => {
  let password = "";
  const arrLength = arr.length;
  let i = 1;
  while (i <= length) {
    const randomNum = Math.floor(Math.random() * arrLength);
    password += arr[randomNum];
    i++;
  }
  return password;
};

// Function to generate a complex password from multiple arrays
const generateComplexPassword = (
  length,
  arr1 = [],
  arr2 = [],
  arr3 = [],
  arr4 = []
) => {
  const multiArr = [...arr1, ...arr2, ...arr3, ...arr4];
  return generatePassword(multiArr, length);
};

// Event listener for password creation
createIcon.addEventListener("click", () => {
  const checkboxes = [
    upperCheckbox,
    lowerCheckbox,
    numberCheckbox,
    symbolCheckbox,
  ];
  const checkboxValues = checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => {
      if (checkbox.value === "upperLetters") return upperLetters;
      if (checkbox.value === "smallLetters") return smallLetters;
      if (checkbox.value === "numbers") return numbers;
      if (checkbox.value === "symbols") return symbols;
    })
    .filter(Boolean); // Remove any undefined values

  if (checkboxValues.length === 0) {
    toastr.warning(
      "Please select at least one option to generate a secure password."
    );
    return;
  }

  const password = generateComplexPassword(
    range.value,
    checkboxValues[0],
    checkboxValues[1],
    checkboxValues[2],
    checkboxValues[3]
  );

  passwordInput.value = password;

  // Copy password to clipboard and show a success message
  const copyPassword = () => {
    toastr.remove();
    passwordInput.select();
    document.execCommand("copy");
    toastr.success("Copied!");
  };

  // Attach copy event listeners
  [copyIcon, copyMainBtn, copyNavBtn].forEach((btn) =>
    btn.addEventListener("click", copyPassword)
  );
});
