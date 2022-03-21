// @ts-check

/**
 * Shortcut for querySelector(All)
 * @param {*} elem
 * @returns
 */
function $(elem) {
  var res = document.querySelectorAll(elem);
  return res.length > 1 ? res : res[0];
}

/**
 * Shortcut for addEventListener
 * @param {string} event
 * @param {()=>{}} cb
 */
Object.prototype.on = function (event, cb) {
  if (Array.from(this).length > 0) {
    Array.from(this).forEach(function (elem) {
      elem.addEventListener(event, cb);
    });
  } else {
    this.addEventListener(event, cb);
  }
};

// keyboard management
const keyboard = $("#keyboard");

let isUpperCaseMode = false;
/**
 * Allows to build or rebuild the keyboard interface
 */
function buildKeyboard() {
  keyboard.innerHTML = "";
  if (isUpperCaseMode) {
    keyboard.classList.add("uppercase");
  } else {
    keyboard.classList.remove("uppercase");
  }
  const keyLines = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "erase"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
    ["space"],
  ];

  keyLines.forEach((keyLine) => {
    const line = document.createElement("div");
    line.classList.add("keyboard_line");
    keyLine.forEach((key) => {
      const button = document.createElement("button");

      const isChar = key.length === 1;
      if (isChar) {
        button.innerHTML = isUpperCaseMode ? String(key).toUpperCase() : key;
      } else {
        const img = document.createElement("img");
        img.src = `./img/${key}.png`;
        button.appendChild(img);
      }
      button.id = `key-${key}`;
      line.appendChild(button);
    });

    keyboard.appendChild(line);
  });

  const inputs = $("#keyboard button");
  inputs.on("click", insertInput);
}

buildKeyboard();

// area management
const area = $("#area");
area.on("focus", () => keyboard.classList.add("active"));

// inputs management
function insertInput() {
  const currentValue = this.innerHTML;
  const currentId = this.id;
  switch (currentId) {
    case "key-enter":
      area.value += "\n";
      break;
    case "key-erase":
      area.value = area.value.substr(0, area.value.length - 1);
      break;
    case "key-space":
      area.value += " ";
      break;
    case "key-shift":
      isUpperCaseMode = !isUpperCaseMode;
      buildKeyboard();
      break;
    default:
      area.value += currentValue;
  }
}
