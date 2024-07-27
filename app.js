let optCtnr = document.querySelector(".opt-ctnr");

for (let index = 0; index <= 6; index++) {
  let btn = document.createElement("button");
  btn.innerText = `Button ${index}`;
  btn.classList.add("opts", "w-100");
  optCtnr.append(btn);
}

let optBtns = document.querySelectorAll(".opts");
let inpCtnr = document.querySelector(".inp-cntr");

const addClassFunc = (elem, className) => {
  elem.classList.add(className);
};

const remClassFunc = (elem, className) => {
  elem.classList.remove(className);
};

let num = 0;

optBtns.forEach((element) => {
  element.addEventListener("click", () => {
    if (num === 0) {
        remClassFunc(inpCtnr , "hide");
        num = 1;
    }

    else{
        addClassFunc(inpCtnr , "hide");
        num = 0;
    }
  });
});
