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

// i used this object below for handling the values of all forms's inputs
const obj = {};

// this variable is for printing the serial numbers in all forms
let num = 0;

// this function creates a div for taking all the printed data of inputs of all forms
const createDiv = () => {
  num++;
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("added-data-ctnr-inner", "row", "py-2");
  mainDiv.innerHTML = `
  <div class='col-11'>
    <p class='added-data'>${num}.</p>
  </div>
  <div class='col-1 p-0'>
    <button id="edit-data-btn">edit</button>
    <button id="delete-data-btn">delete</button>
  </div>`;
  return mainDiv;
};

// this fucntion prints peragraph tags according to the presented quantity of inputs in each form by getting some returned values from the function named "getAddedDataFunc()" which invoked below.
const printAddedDataFun = (updatedObj) => {
  let [inpsObj, inpsLength] = updatedObj;
  let addedDataDivMain = subForm.querySelector(".added-data-ctnr");
  let ValArr = Object.values(inpsObj);

  if (inpsLength === ValArr.length) {
    let addedDataDiv = createDiv();
    for (let index = 0; index < ValArr.length; index++) {
      let pera = document.createElement("p");
      pera.innerText = ValArr[index];
      pera.classList.add("added-data");
      addedDataDiv.children[0].append(pera);
    }
    addedDataDivMain.append(addedDataDiv);
    return ValArr;
  } else {
    alert("You can't save empty data!");
    return;
  }
};

// this function gets the vlaues of all inputs on click on "save" button of each form and retuns getted data to the function named "printAddedDataFun()" wich invoked above
const getAddedDataFunc = (targForm) => {
  let inps = targForm.querySelectorAll("input , select");
  inps.forEach((inp) => {
    if (inp.value !== "") {
      obj[inp.id] = inp.value;
      inp.value = "";
    } else {
      return;
    }
  });
  return [obj, inps.length];
};

// this function holds 2 functions which involed above. i created this function for enhancing the readability
const ctnrFuncOfAddedDataFunc = (targElem) => {
  let updatedObj = getAddedDataFunc(targElem);
  let ValArr = printAddedDataFun(updatedObj);
  return [updatedObj, ValArr];
};

// printed data of forms is removed through this function
const deleteDataFunc = (targElem) => {
  num--;
  let targDelElem = targElem.closest(".added-data-ctnr-inner");
  targDelElem.remove();
};

// printed data of forms is edited through this function. this function fetchs the printed data then print it in inputs for editting
const editDataFunc = (targElem) => {
  let prElem = targElem.closest(".added-data-ctnr-inner");
  let inps = subForm.querySelectorAll("input , select");
  let peras = prElem.querySelectorAll("p");

  inps.forEach((inp, i) => {
    inp.value = peras[i + 1].innerText;
  });
};

const findOutstandingAmt = (targElem, mainID, elemID, elemID2) => {
  let inpAdv = targElem;
  let inpTotalPrice = targElem.closest(mainID).querySelector(elemID);
  let inpOutPbl = targElem.closest(mainID).querySelector(elemID2);
  let totalVal = inpTotalPrice.value - inpAdv.value;
  inpOutPbl.value = totalVal;
};

const findTotalPrice = (targElem, mainID, elemID, elemID2, elemID3) => {
  let inpPrice = targElem;
  let inpBundles = targElem.closest(mainID).querySelector(elemID);
  let inpTotalPrice = targElem.closest(mainID).querySelector(elemID2);
  let inpAmtPbl = targElem.closest(mainID).querySelector(elemID3);
  let totalVal = inpPrice.value * inpBundles.value;
  inpTotalPrice.value = totalVal;
  inpAmtPbl ? (inpAmtPbl.value = totalVal) : "";
};

const findLeaves = (targElem, mainID, elemID, elemID2) => {
  let inpEmpDays = targElem;
  let inpMonDays = targElem.closest(mainID).querySelector(elemID);
  let inpLeaves = targElem.closest(mainID).querySelector(elemID2);
  let totalDays = inpMonDays.value - inpEmpDays.value;
  inpLeaves.value = totalDays;
};

const findNetSalary = (targElem, mainID, elemID, elemID2) => {
  let inpEmpAdv = targElem;
  let inpSalary = targElem.closest(mainID).querySelector(elemID);
  let inpNetSalary = targElem.closest(mainID).querySelector(elemID2);
  let netSalary = inpSalary.value - inpEmpAdv.value;
  inpNetSalary.value = netSalary;
};

const ctnrFuncOfTotalPriceFunc = (targElem, targID) => {
  if (targID === "add-product-price") {
    findTotalPrice(
      targElem,
      "#add-product-form",
      "#add-product-num-of-bundles",
      "#add-product-total-price",
      undefined
    );
  } else if (targID === "vendor-transaction-price") {
    findTotalPrice(
      targElem,
      "#vendor-transaction-form",
      "#vendor-transaction-bags",
      "#vendor-transaction-total-price",
      "#vendor-transaction-amount-payable"
    );
  } else if (targID === "client-entry-price") {
    findTotalPrice(
      targElem,
      "#client-entry-form",
      "#client-entry-bundles",
      "#client-entry-total-price",
      "#client-entry-amount-receivable"
    );
  } else if (targID === "vendor-transaction-advance-payment") {
    findOutstandingAmt(
      targElem,
      "#vendor-transaction-form",
      "#vendor-transaction-total-price",
      "#vendor-transaction-outstanding-payable"
    );
  } else if (targID === "client-entry-received-by-client") {
    findOutstandingAmt(
      targElem,
      "#client-entry-form",
      "#client-entry-total-price",
      "#client-entry-outstanding-amount"
    );
  } else if (targID === "payroll-entry-emp-working-days") {
    findLeaves(
      targElem,
      "#payroll-entry-form",
      "#payroll-entry-month-working-days",
      "#payroll-entry-leaves"
    );
  } else if (targID === "payroll-entry-advance") {
    findNetSalary(
      targElem,
      "#payroll-entry-form",
      "#payroll-entry-salary",
      "#payroll-entry-net-salary"
    );
  }
};

if (subForm) {
  subForm.addEventListener("click", (e) => {
    if (e.target.id === "delete-data-btn") {
      e.preventDefault();
      deleteDataFunc(e.target);
    } else if (e.target.id === "edit-data-btn") {
      e.preventDefault();
      editDataFunc(e.target);
    } else if (e.target.closest("button")) {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(subForm);
    }
  });

  subForm.addEventListener("input", (e) => {
    if (e.target.id === "add-product-price") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "vendor-transaction-price") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "client-entry-price") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "vendor-transaction-advance-payment") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "client-entry-received-by-client") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "payroll-entry-emp-working-days") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "payroll-entry-advance") {
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    }
  });
}
