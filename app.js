// import forms data API for printing the forms
import { formsDataAPI } from "./formAPI.js";

// login page's code
let homeForm = document.querySelector("#loginForm");
let emailInp = document.querySelector("#email-inp");
let pswdInp = document.querySelector("#pswd-inp");

// this function is for navigate new page
const navigateToNextPageFunc = (page) => {
  window.location.href = page;
};

// this function is for validating user's Email
const validateEmailFunc = (userEmail) => {
  return /^[\da-zA-Z]+(?:[+%._-][\da-zA-Z]+)*@[a-zA-Z\d]+(?:[-])*\.[A-Za-z]{2,}$/.test(
    userEmail
  );
};

// this function is for validating user's password
const validatePswdfunc = (userPswd) => {
  return /^((?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[\d]+)(?=.*[\W_]+)).{8,}$/.test(
    userPswd
  );
};

// this function if for subit button of login page
const chkEmailPswdOnClick = (CBEmailFunc, CBPswdFunc, a, b) => {
  let checkedEmail = CBEmailFunc(a);
  let checkedPswd = CBPswdFunc(b);
  return [checkedEmail, checkedPswd, a, b];
};

// this is for prevnting the submit functionality of forms
if (homeForm) {
  homeForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // this event listener is for targeting the submit button of login page and then check user's email and password through the function which are defined at above
  homeForm.addEventListener("click", (e) => {
    if (e.target.id === "submit-btn") {
      // i used callback hell in this line of code
      let [finalValue1, finalValue2, emInpVal, psInpVal] = chkEmailPswdOnClick(
        validateEmailFunc,
        validatePswdfunc,
        emailInp.value,
        pswdInp.value
      );

      // these are the conditions for alerting the user that what mistake is he doing at the time of login
      if (emInpVal && psInpVal) {
        if (finalValue1 && finalValue2) {
          navigateToNextPageFunc("dashbord.html");
        } else if (!finalValue1 && !finalValue2) {
          alert("Both email and password are incorrect!");
        } else if (!finalValue1) {
          alert("Your email is incorrect!");
        } else if (!finalValue2) {
          alert("Your password is incorrect!");
        }
      } else {
        alert("You can't login without enter your email and password!");
      }
    }
  });
}
// login page's code end

// dashboard start
let graphCtnr = document.querySelector(".graph-ctnr");
let graphCtnr2 = document.querySelector(".graph-ctnr-2");

// remove the class function
const addClassFunc = (elem, className) => {
  elem.classList.add(className);
};

// add the class function
const remClassFunc = (elem, className) => {
  elem.classList.remove(className);
};

// these 2 funtions "addAniFunc" and "remAniFunc" are for toggling the sub buttons div on dashboard
const addAniFunc = (targElem, myHeight, num) => {
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

const handleOnClick = (targElem, type, btnText) => {
  if (type === "vendor") {
    targElem.innerHTML = `<button class="w-100 sub-opts">add ${btnText}</button>
      <button class="w-100 sub-opts">add product</button>
      <button class="w-100 sub-opts">${btnText}'s transaction</button>
      <button class="w-100 sub-opts">${btnText}'s ledger</button>`;
    addAniFunc(targElem, "20rem", 0);
  } else if (type === "client") {
    targElem.innerHTML = `<button class="w-100 sub-opts">add ${btnText}</button>
                            <button class="w-100 sub-opts">${btnText}'s entry</button>
                            <button class="w-100 sub-opts">${btnText}'s ledger</button>`;
    addAniFunc(targElem, "15rem", 0);
  } else if (type === "payroll") {
    targElem.innerHTML = `<button class="w-100 sub-opts">add employee</button>
      <button class="w-100 sub-opts">advance salary</button>
      <button class="w-100 sub-opts">${btnText} entry</button>
      <button class="w-100 sub-opts">${btnText} ledger</button>`;
    addAniFunc(targElem, "20rem", 1);
  }

  let allSubOptCtrns = document.querySelectorAll(".sub-opt-ctnr");
  allSubOptCtrns.forEach((div) => {
    if (div !== targElem) {
      remAniFunc(div);
    }
  });
};

// this variable is g=for getting the dashbord's page button's section
let optCtnr = document.querySelector(".opt-ctnr");

// all the sub buttons and all forms will be printed through this function
if (optCtnr) {
  optCtnr.addEventListener("click", (e) => {
    let targetedBtn = e.target.closest("button");
    if (!targetedBtn) return;

    let subBtnCtnr = targetedBtn.nextElementSibling;
    if (
      e.target.id === "vendor-btn" ||
      e.target.innerText === "Vendor" ||
      e.target.id === "vendor-icon"
    ) {
      handleOnClick(subBtnCtnr, "vendor", e.target.innerText);
    } else if (
      e.target.id === "client-btn" ||
      e.target.innerText === "Client" ||
      e.target.id === "client-icon"
    ) {
      handleOnClick(subBtnCtnr, "client", e.target.innerText);
    } else if (
      e.target.id === "payroll-btn" ||
      e.target.innerText === "Payroll" ||
      e.target.id === "payroll-icon"
    ) {
      handleOnClick(subBtnCtnr, "payroll", e.target.innerText);
    } else if (e.target.innerText === "Add Vendor") {
      navigateToNextPageFunc('add vendor.html');
      // formsDataAPI.forEach((element) => {
      //   if (element.hasOwnProperty("Add Vendor")) {
      //     dbFormCtnr.innerHTML = "";
      //     element["Add Vendor"].forEach((innElem) => {
      //       printForms(dbFormCtnr, innElem);
      //     });
      //   }
      // });
      // dbFormCtnr.previousElementSibling.innerText = `${e.target.innerText}'s form`;
    } else if (e.target.innerText === "Add Product") {
      formsDataAPI.forEach((element) => {
        if (element.hasOwnProperty("Add Product")) {
          dbFormCtnr.innerHTML = "";
          element["Add Product"].forEach((innElem) => {
            printForms(dbFormCtnr, innElem);
          });
        }
      });
      dbFormCtnr.previousElementSibling.innerText = `${e.target.innerText}'s form`;
    } else if (e.target.innerText === "Add Client") {
      formsDataAPI.forEach((element) => {
        if (element.hasOwnProperty("Add Client")) {
          dbFormCtnr.innerHTML = "";
          element["Add Client"].forEach((innElem) => {
            printForms(dbFormCtnr, innElem);
          });
        }
      });
      dbFormCtnr.previousElementSibling.innerText = `${e.target.innerText}'s form`;
    } else if (e.target.innerText === "Client's Entry") {
      formsDataAPI.forEach((element) => {
        if (element.hasOwnProperty("Client's Entry")) {
          dbFormCtnr.innerHTML = "";
          element["Client's Entry"].forEach((innElem) => {
            printForms(dbFormCtnr, innElem);
          });
        }
      });
      dbFormCtnr.previousElementSibling.innerText = `${e.target.innerText}'s form`;
    } else if (e.target.innerText === "Add Employee") {
      formsDataAPI.forEach((element) => {
        if (element.hasOwnProperty("Add Employee")) {
          dbFormCtnr.innerHTML = "";
          element["Add Employee"].forEach((innElem) => {
            printForms(dbFormCtnr, innElem);
          });
        }
      });
      dbFormCtnr.previousElementSibling.innerText = `${e.target.innerText}'s form`;
    } else if (e.target.innerText === "Advance Salary") {
      formsDataAPI.forEach((element) => {
        if (element.hasOwnProperty("Advance Salary")) {
          dbFormCtnr.innerHTML = "";
          element["Advance Salary"].forEach((innElem) => {
            printForms(dbFormCtnr, innElem);
          });
        }
      });
      dbFormCtnr.previousElementSibling.innerText = `employee's ${e.target.innerText}'s form`;
    } else if (e.target.innerText === "Payroll Entry") {
      formsDataAPI.forEach((element) => {
        if (element.hasOwnProperty("Payroll Entry")) {
          dbFormCtnr.innerHTML = "";
          element["Payroll Entry"].forEach((innElem) => {
            printForms(dbFormCtnr, innElem);
          });
        }
      });
      dbFormCtnr.previousElementSibling.innerText = `${e.target.innerText}'s form`;
    }
  });
}
// dashboard end
