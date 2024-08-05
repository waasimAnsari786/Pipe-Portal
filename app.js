// login page's code
let homeForm = document.querySelector("#loginForm");
let emailInp = document.querySelector("#email-inp");
let pswdInp = document.querySelector("#pswd-inp");
let subForm = document.querySelector("form");

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
      navigateToNextPageFunc("add vendor.html");
    } else if (e.target.innerText === "Add Product") {
      navigateToNextPageFunc("add product.html");
    } else if (e.target.innerText === "Vendor's Transaction") {
      navigateToNextPageFunc("vendor's transaction.html");
    } else if (e.target.innerText === "Add Client") {
      navigateToNextPageFunc("add client.html");
    } else if (e.target.innerText === "Client's Entry") {
      navigateToNextPageFunc("client's entry.html");
    } else if (e.target.innerText === "Add Employee") {
      navigateToNextPageFunc("add employee.html");
    } else if (e.target.innerText === "Advance Salary") {
      navigateToNextPageFunc("advance salary.html");
    } else if (e.target.innerText === "Payroll Entry") {
      navigateToNextPageFunc("payroll entry.html");
    }
  });
}
// dashboard end









// form controlling of all pages's forms
const obj = {};
let num = 0;
// <div class='col-1'>
//   <p class='added-data'>${num}.</p>
// </div>
// <div class='col-9'></div>
// <div class='col-2'>
//   <button id="edit-data">edit</button>
//   <button id="delete-data">delete</button>
// </div>`

const createDiv = () => {
  num++;
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("added-data-ctnr-inner" ,"col-12");
  mainDiv.innerHTML = `
    <p class='added-data'>${num}.</p>
  <div></div>
  <div>
    <button id="edit-data">edit</button>
    <button id="delete-data">delete</button>
  </div>`
  return mainDiv;
}

const printAddedDataFun = (updatedObj) => {
  let addedDataDivMain = subForm.querySelector(".added-data-ctnr");
  let addedDataDiv = createDiv();
  let ValArr = Object.values(updatedObj);
  for (let index = 0; index < ValArr.length ; index++) {
    let pera = document.createElement("p");
    pera.innerText = ValArr[index];
    pera.classList.add("added-data");
    addedDataDiv.children[1].append(pera);
  }
  addedDataDivMain.append(addedDataDiv);  
  return ValArr;
};

const getAddedDataFunc = (targForm) => {
  let inps = targForm.querySelectorAll("input , select");
  inps.forEach((inp, i) => {
    obj[inp.id] = inp.value;
    inp.value = '';
  });
  return obj;
};

const ctnrOfAddedDataFunc = (targElem) => {
  let updatedObj = getAddedDataFunc(targElem);
  let ValArr = printAddedDataFun(updatedObj);
  return [updatedObj, ValArr];
};

if (subForm) {
  subForm.addEventListener("click", (e) => {
    if (e.target.closest("button")) {
      e.preventDefault();
      ctnrOfAddedDataFunc(subForm)
    }
  });
}