let homeForm = document.querySelector(".home-f");

const navigateToNextPage = (page) => {
  window.location.href = page;
};

const addClassFunc = (elem, className) => {
  elem.classList.add(className);
};

const remClassFunc = (elem, className) => {
  elem.classList.remove(className);
};

if (homeForm) {
  homeForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  homeForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("sub-btn")) {
      navigateToNextPage("dashbord.html");
    }
  });
}

let optCtnr = document.querySelector(".opt-ctnr");
let dbFormCtnr = document.querySelector(".inp-ctnr");
let num = 0;
let num2 = 0;
let subBtnCtnr;

let inpCtnr = document.querySelector(".inp-ctnr");

optCtnr.addEventListener("click", (e) => {
  if (e.target.classList.contains("opts")) {
    if (!subBtnCtnr) {
      subBtnCtnr = document.createElement("div");
    }

    if (num === 0) {
      subBtnCtnr.classList.add("col-8" , "sub-opt-ctnr");
      subBtnCtnr.innerHTML = `<button class="w-100 sub-opts">add ${e.target.innerText}</button>
                            <button class="w-100 sub-opts">add product</button>
                            <button class="w-100 sub-opts">transaction</button>
                            <button class="w-100 sub-opts">ledger</button>`;
      e.target.parentElement.append(subBtnCtnr);
      num = 1;
    } else {
      subBtnCtnr.innerHTML = "";
      num = 0;
    }
  } else if (e.target.classList.contains("sub-opts")) {
    if (dbFormCtnr) {
      if (num2 === 0) {
        remClassFunc(dbFormCtnr, "hide");
        num2 = 1;
      } else {
        addClassFunc(dbFormCtnr, "hide");
        num2 = 0;
      }
    }
  }
});
