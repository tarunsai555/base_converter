var currentColorScheme = localStorage.getItem("colorScheme")
localStorage.setItem("colorScheme", currentColorScheme)



const container = document.getElementById('container')
const submitBtn = document.getElementById('submitBtn');

var displayScreen = document.getElementById('screen');

const inputValFirstBase = document.getElementById('val_first_base')

const inputFirstBase = document.getElementById('firstBase');

const inputNewBase = document.getElementById('newBase');
const btnToggleMode = document.getElementById('colorSchemeBtn')

//Custom property Object 
var rt = {
  "--dark-mode": "rgb(45,45,45)",
  "--light-mode": "white",
  "--container-dark-surface": "rgba(black,0.7)",
  "--dark-box-shadow": "1px 1px 5px yellow,1px 1px 10px lime, 1px 1px 15px deepskyblue",
  "--light-box-shadow": "1px 1px 10px grey",
  "--dark-mode-border": "solid lime 3px",
  "--dark-mode-color": "lime",
  "--light-mode-color": "black"
}

//Base dictionary 
const alphaObj = {
  "A": 10,
  "B": 11,
  "C": 12,
  "D": 13,
  "E": 14,
  "F": 15,
  "G": 16,
  "H": 17,
  "I": 18,
  "J": 19,
  "K": 20,
  "L": 21,
  "M": 22,
  "N": 23,
  "O": 24,
  "P": 25,
  "Q": 26,
  "R": 27,
  "S": 28,
  "T": 29,
  "U": 30,
  "V": 31,
  "W": 32,
  "X": 33,
  "Y": 34,
  "Z": 35
}

//Options array: list of text input/html input Element
var options = [inputValFirstBase, inputFirstBase, inputNewBase]

//function to convert from one base to another
function ToBase(val_intial_base, initial_base, final_base) {


  val_intial_base = inputValFirstBase.value; // Value in the initial base;
  initial_base = inputFirstBase.value; //The initial base
  final_base = inputNewBase.value; // The final base
  var t;
  var u = new Array, v = new Array;

  var w = val_intial_base.toString().toUpperCase().split("").reverse()
  t = w.splice(w.indexOf('.') + 1)
  console.log(t)

  t.reverse()

  v = w.splice(0, w.indexOf('.'));
  v.reverse()

  console.log(v)
  console.log(t)
  //multiplies the values in array t by the power
  //of their index (a x b^0 + cxb^-1...)
  for (var x = 0; x < t.length; x++) {
    var r;
    if (Object.keys(alphaObj).includes(t[x])) {
      r = parseInt(alphaObj[t[x]]) * initial_base ** (t.length - 1 - x);
      u.push(r)
    } else {
      r = parseInt(t[x]) * initial_base ** (t.length - 1 - x);
      console.log(r)
      u.push(r)
      console.log(u)
    }
  }

  for (var x = 0; x < v.length; x++) {
    var r;
    if (Object.keys(alphaObj).includes(v[x])) {
      r = parseInt(alphaObj[v[x]]) * initial_base ** (- 1 - x);
      u.push(r)
    } else {
      r = parseInt(v[x]) * initial_base ** (- 1 - x);
      console.log(r)
      u.push(r)
      console.log(u)
    }
    //r= parseInt(v[x]) * initial_base ** (-1 - x);

  }

  console.log(u)


  //sum up values stored in array u
  var p = u.reduce(function (a, b) {
    return a + b
  })

  return parseFloat(p).toString(final_base).toUpperCase()

}





/*********************************************************************
              Adding eventListener to htmlElements
/*********************************************************************/

//1. Input First base
inputFirstBase.addEventListener('keyup', () => {

  let g = [], h = [];
  g = inputValFirstBase.value.toString().toUpperCase().split("");
  h = inputFirstBase.value.toString().toUpperCase().split("");
  //checks for alphabets
  //if true, returns a false and throws an error.
  for (i = 0; i < h.length; i++) {
    if (Object.keys(alphaObj).includes(h[i])){
      displayScreen.value = "Base inputted is not a number. only numbers are allowed!";
      throw Error("Base inputted is not a number. only numbers are allowed!")
    } else {
      displayScreen.value = ""
      //checks whether inputted value is greater than the values in inputValFirstBase
      //if true, returns a false and throws an error.
      for (var l = 0; l < g.length; l++) {
        console.log((alphaObj[g[l]]))
        if (parseInt(g[l]) >= inputFirstBase.value || alphaObj[g[l]] >= inputFirstBase.value && inputFirstBase.value !== "") {
          displayScreen.value = "Error. The base is incorrect! try bases >" + alphaObj[g[l]];
          console.log('1. ' + g[l] + '===>' + inputFirstBase.value)
          inputFirstBase.style.borderColor = "red";
          submitBtn.style.pointerEvents = "none";
          return false
        }
        //checks whether input is blank or less than 2  or greater than 36
        //if true, returns a false and throws an error.
        else if (parseInt(inputFirstBase.value) < 2 || parseInt(inputFirstBase.value) > 36) {
          console.log('2. ' + g[l] + '===>' + inputFirstBase.value)
          displayScreen.value = "Error! Bases must be between and including 2 and 36."
          throw Error("Error! Bases must be between and including 2 and 36.")
        } else {
          displayScreen.value = "";
          if (document.body.style.background !== rt["--light-mode"]) {
            inputFirstBase.style.borderColor = rt["--dark-mode-color"];
          }
          else { inputFirstBase.style.borderColor = rt["--light-mode-color"]; }
          submitBtn.style.pointerEvents = "auto";
        }
      }
    }
  }
})

//2. Input new base
inputNewBase.addEventListener('keyup', () => {
   h = inputNewBase.value.toString().toUpperCase().split("");
  //checks for alphabets
  //if true, returns a false and throws an error.
  for (i = 0; i < h.length; i++) {
    if (Object.keys(alphaObj).includes(h[i])) {
      displayScreen.value = "Base inputted is not a number. only numbers are allowed!";
      throw Error("Base inputted is not a number. only numbers are allowed!")
    } else {
      displayScreen.value = ""
      //checks whether inputted value is greater than the values in inputValFirstBase
      //if true, returns a false and throws an error.
      if (parseInt(inputNewBase.value) < 2 || parseInt(inputNewBase.value) > 36) {
        displayScreen.value = "Error! Bases must be between and including 2 and 36."
        throw Error("Error! Bases must be between and including 2 and 36.")
      }
      else {
        displayScreen.value = "";
        if (document.body.style.background !== rt["--light-mode"]) {
          inputNewBase.style.borderColor = rt["--dark-mode-color"];
        }
        else { inputNewBase.style.borderColor = rt["--light-mode-color"]; }
        submitBtn.style.pointerEvents = "auto";
      }
    }
  }
})

//3. Submit Btn
submitBtn.addEventListener('click', function () {
  if (inputValFirstBase.value == "" || inputFirstBase.value == "" || inputNewBase.value == "") {
    console.log("One or more textboxes are blank!")
    displayScreen.value = "Error. One or more textboxes are blank!"
    options.forEach(el => {
      if (el.value == "") {
        el.style.borderColor = "red";
      } else {
        if (document.body.style.background !== rt["--light-mode"]) {
          el.style.borderColor = rt["--dark-mode-color"];
        }
        else { el.style.borderColor = rt["--light-mode-color"]; }
      }
    }
    )
  }
  else if (inputValFirstBase.value == "" && inputFirstBase.value == "" && inputNewBase.value == "") {
    console.log("One or more textboxes are blank!")
    displayScreen.value = "Error. One or more textboxes are blank!"
    options.forEach(el => {
      if (el.value == "") {
        el.style.borderColor = "red";
      } else {
        if (document.body.style.background !== rt["--light-mode"]) {
          el.style.borderColor = rt["--dark-mode-color"];
        }
        else { el.style.borderColor = rt["--light-mode-color"]; }
      }
    }
    )
  }
  else {
    options.forEach(el => {
      if (document.body.style.background !== rt["--light-mode"]) {
        el.style.borderColor = rt["--dark-mode-color"];
      }
      else { el.style.borderColor = rt["--light-mode-color"]; }
    })

    displayScreen.value = ToBase(inputValFirstBase.value, inputFirstBase.value, inputNewBase.value)
  }
}
)


//Color Scheme
//change color-mode on windows load
if (localStorage.getItem("colorScheme") == "white") {
  options.forEach(el => {
    el.style.borderColor = rt["--light-mode-color"];
    el.style.color = "black";
    el.style.background = "white"

  })
  document.body.style.background = rt["--light-mode"]

  container.style.boxShadow = rt["--light-box-shadow"]
  container.style.background = "rgb(253,255,120)"

  displayScreen.style["background"] = "whitesmoke";
  displayScreen.style.borderColor = "grey"

  document.querySelectorAll('.lb')[0].style.color = rt["--light-mode-color"]
  document.querySelectorAll('.lb')[1].style.color = rt["--light-mode-color"]
  document.querySelectorAll('.lb')[2].style.color = rt["--light-mode-color"]

  btnToggleMode.innerHTML = "Day Mode";
  currentColorScheme = rt["--light-mode"];
  localStorage.setItem("colorScheme", currentColorScheme)
}
else {
  document.body.style.background = rt["--dark-mode"]
  options.forEach(el => {
    el.style.borderColor = rt["--dark-mode-color"];
    el.style.color = "lime";
    el.style.background = "transparent";
  })

  container.style.boxShadow = rt["--dark-box-shadow"];
  container.style.background = "transparent";

  displayScreen.style.background = rt["--dark-mode-color"];
  displayScreen.style.borderColor = rt["--dark-mode-color"];

  btnToggleMode.innerHTML = "Night Mode";

  currentColorScheme = rt["--dark-mode"];
  localStorage.setItem("colorScheme", currentColorScheme)

  document.querySelectorAll('.lb')[0].style.color = rt["--dark-mode-color"];
  document.querySelectorAll('.lb')[1].style.color = rt["--dark-mode-color"];
  document.querySelectorAll('.lb')[2].style.color = rt["--dark-mode-color"];
}


function changeScheme() {
  if (document.body.style.background !== rt["--light-mode"]) {
    options.forEach(el => {
      el.style.borderColor = rt["--light-mode-color"];
      el.style.color = "black";
      el.style.background = "white"

    })
    document.body.style.background = rt["--light-mode"]

    container.style.boxShadow = rt["--light-box-shadow"]
    container.style.background = "rgb(253,255,120)"

    displayScreen.style["background"] = "whitesmoke";
    displayScreen.style.borderColor = "grey"

    document.querySelectorAll('.lb')[0].style.color = rt["--light-mode-color"]
    document.querySelectorAll('.lb')[1].style.color = rt["--light-mode-color"]
    document.querySelectorAll('.lb')[2].style.color = rt["--light-mode-color"]

    btnToggleMode.innerHTML = "Day Mode";
    currentColorScheme = rt["--light-mode"];
    localStorage.setItem("colorScheme", currentColorScheme)
    console.log(currentColorScheme)

  }
  else {
    document.body.style.background = rt["--dark-mode"]
    options.forEach(el => {
      el.style.borderColor = rt["--dark-mode-color"];
      el.style.color = "lime";
      el.style.background = "transparent";
    })

    container.style.boxShadow = rt["--dark-box-shadow"];
    container.style.background = "transparent";

    displayScreen.style.background = rt["--dark-mode-color"];
    displayScreen.style.borderColor = rt["--dark-mode-color"];

    btnToggleMode.innerHTML = "Night Mode";

    currentColorScheme = rt["--dark-mode"];
    localStorage.setItem("colorScheme", currentColorScheme)
    console.log(currentColorScheme)

    document.querySelectorAll('.lb')[0].style.color = rt["--dark-mode-color"];
    document.querySelectorAll('.lb')[1].style.color = rt["--dark-mode-color"];
    document.querySelectorAll('.lb')[2].style.color = rt["--dark-mode-color"];
  }
}


//menuBar
const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");
const closeMenuBtn = document.querySelector("#closeMenu");
const quitApp = document.querySelector("#quitApp");

menuBtn.addEventListener("click", () => {
  navMenu.classList.add("active")
})

closeMenuBtn.addEventListener("click", () => {
  navMenu.classList.remove("active")
})

quitApp.addEventListener("click", () => {
  window.close()
  console.log('clicked')
})
