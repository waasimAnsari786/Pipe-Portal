let homeForm = document.querySelector(".home-f");
let graphCtnr = document.querySelector(".graph-ctnr");
let graphCtnr2 = document.querySelector(".graph-ctnr-2");

// this function is for navigate new page
const navigateToNextPageFunc = (page) => {
  window.location.href = page;
};


// remove the class function
const addClassFunc = (elem, className) => {
  elem.classList.add(className);
};

// add the class function
const remClassFunc = (elem, className) => {
  elem.classList.remove(className);
};


// these 2 funtions "addAniFunc" and "remAniFunc" are for toggling the sub buttons div on dashboard
const addAniFunc = (targElem, myHeight , num) => {
  requestAnimationFrame(() => {
    targElem.style.height = myHeight;
    targElem.style.marginBottom = "2.5rem";
    if (num === 0) {
      setTimeout(() => {
        targElem.style.opacity = "1";
      }, 600);
    } else {
      targElem.style.opacity = "1";
    }
  });
};
const remAniFunc = (targElem) => {
  targElem.style.height = "0rem";
  targElem.style.opacity = "0";
  targElem.style.marginBottom = "0";
  targElem.innerHTML = "";
};


// this function is for showing and hidding each form of every sub button
const showHideInpCtnrFunc = (targElem) => {
  if (targElem) {
    if (num2 === 0) {
      remClassFunc(targElem, "hide");
      num2 = 1;
    } else {
      addClassFunc(targElem, "hide");
      num2 = 0;
    }
  }
};


// this is "Chart.Js" library's code for inserting charts
if (graphCtnr) {
  const ctx = document.getElementById("barchart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
if (graphCtnr2) {
  const ctx = document.getElementById("doughnut");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


// this is for prevnting the submit functionality of forms
if (homeForm) {
  homeForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  homeForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("sub-btn")) {
      navigateToNextPageFunc("dashbord.html");
    }
  });
}

let optCtnr = document.querySelector(".opt-ctnr");
let dbFormCtnr = document.querySelector(".inp-ctnr");
let num = 0;
let num2 = 0;
let subBtnCtnr;



// all the sub buttons and their forms targeted in this function.
optCtnr.addEventListener("click", (e) => {
  if (
    e.target.id === "vendor-btn" ||
    e.target.innerText === "Vendor" ||
    e.target.id === "vendor-icon"
  ) {
    if (!subBtnCtnr) {
      subBtnCtnr = document.createElement("div");
      addClassFunc(subBtnCtnr, "sub-opt-ctnr");
    }

    if (num === 0) {
      subBtnCtnr.innerHTML = `<button class="w-100 sub-opts">add ${e.target.innerText}</button>
                            <button class="w-100 sub-opts">add product</button>
                            <button class="w-100 sub-opts">${e.target.innerText}'s transaction</button>
                            <button class="w-100 sub-opts">${e.target.innerText}'s ledger</button>`;
      e.target.closest(".opt-ctnr-inner").append(subBtnCtnr);
      addAniFunc(subBtnCtnr , '20rem' , 0)
      num = 1;
    } else {
      remAniFunc(subBtnCtnr)
      num = 0;
    }
  } else if (e.target.classList.contains("sub-opts")) {
    showHideInpCtnrFunc(dbFormCtnr)
  }

  if (
    e.target.id === "client-btn" ||
    e.target.innerText === "Client" ||
    e.target.id === "client-icon"
  ) {
    if (!subBtnCtnr) {
      subBtnCtnr = document.createElement("div");
    }

    if (num === 0) {
      addClassFunc(subBtnCtnr, "sub-opt-ctnr");
      subBtnCtnr.innerHTML = `<button class="w-100 sub-opts">add ${e.target.innerText}</button>
                            <button class="w-100 sub-opts">${e.target.innerText}'s entry</button>
                            <button class="w-100 sub-opts">${e.target.innerText}'s ledger</button>`;
      e.target.closest(".opt-ctnr-inner").append(subBtnCtnr);
      addAniFunc(subBtnCtnr , '15rem' , 0)
      num = 1;
    } else {
      remAniFunc(subBtnCtnr)
      num = 0;
    }
  }

  if (
    e.target.id === "payroll-btn" ||
    e.target.innerText === "Payroll" ||
    e.target.id === "payroll-icon"
  ) {
    if (!subBtnCtnr) {
      subBtnCtnr = document.createElement("div");
    }

    if (num === 0) {
      addClassFunc(subBtnCtnr, "sub-opt-ctnr");
      subBtnCtnr.innerHTML = `<button class="w-100 sub-opts">add employee</button>
                            <button class="w-100 sub-opts">advance salary</button>
                            <button class="w-100 sub-opts">${e.target.innerText} entry</button>
                            <button class="w-100 sub-opts">${e.target.innerText} ledger</button>`;
      e.target.closest(".opt-ctnr-inner").append(subBtnCtnr);
      addAniFunc(subBtnCtnr , '20rem' , 1)
      num = 1;
    } else {
      remAniFunc(subBtnCtnr)
      num = 0;
    }
  }
});