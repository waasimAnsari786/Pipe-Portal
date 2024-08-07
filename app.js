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

// const createDiv = () => {
//   num++;
//   let mainDiv = document.createElement("div");
//   mainDiv.classList.add("added-data-ctnr-inner", "row", "py-2");
//   mainDiv.innerHTML = `
//   <div class='col-11'>
//     <p class='added-data'>${num}.</p>
//   </div>
//   <div class='col-1 p-0'>
//     <button id="edit-data-btn">edit</button>
//     <button id="delete-data-btn">delete</button>
//   </div>`;
//   return mainDiv;
// };

const createDiv = () => {
  num++;
  let mainDiv = document.createElement("tr");
  mainDiv.classList.add("added-data-ctnr-inner");
  mainDiv.innerHTML = `
  <td class='p-0 text-center added-data' width='20rem'>
    ${num}.
  </td>
  <td class='p-0' width='100rem'>
  <button id="edit-data-btn">edit</button>
  <button id="delete-data-btn">delete</button>
  </td>`;
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
      let pera = document.createElement("td");
      pera.innerText = ValArr[index];
      pera.classList.add("added-data");
      addedDataDiv.insertBefore(pera, addedDataDiv.lastElementChild);
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
  let peras = prElem.querySelectorAll("td");

  inps.forEach((inp, i) => {
    inp.value = peras[i + 1].innerText;
  });
};

//this function is being used in functions below for fething targeted variables for calculating he values.
const fetchVariables = (targElem, mainID, IDsArr) => {
  let arr = [];
  for (let index = 0; index < IDsArr.length; index++) {
    arr.push(targElem.closest(mainID).querySelector(IDsArr[index]));
  }
  return arr;
};

// this function is used for calculating outstanding payablles and receievables with the help of a callback function named "fetchVariables()"
const findOutstandingAmt = (targElem, mainID, elemID, elemID2, elemID3) => {
  let [inpAdv, inpTotalPrice, inpOutPbl] = fetchVariables(targElem, mainID, [
    elemID,
    elemID2,
    elemID3,
  ]);
  let totalVal = inpTotalPrice.value - inpAdv.value;
  inpOutPbl.value = totalVal;
};

// this function is used for calculating total prices and print it in amount payables as well with the help of a callback function named "fetchVariables()"
const findTotalPrice = (
  targElem,
  mainID,
  elemID,
  elemID2,
  elemID3,
  elemID4
) => {
  let [inpPrice, inpBundles, inpTotalPrice, inpAmtPbl] = fetchVariables(
    targElem,
    mainID,
    [elemID, elemID2, elemID3, elemID4]
  );
  let totalVal = inpPrice.value * inpBundles.value;
  inpTotalPrice.value = totalVal;
  inpAmtPbl ? (inpAmtPbl.value = totalVal) : "";
};

// this function is used for calculating leaves of employees with the help of a callback function named "fetchVariables()"
const findLeaves = (targElem, mainID, elemID, elemID2, elemID3) => {
  let [inpEmpDays, inpMonDays, inpLeaves] = fetchVariables(targElem, mainID, [
    elemID,
    elemID2,
    elemID3,
  ]);
  let totalDays = inpMonDays.value - inpEmpDays.value;
  inpLeaves.value = totalDays;
};

// this function is used for calculating Net Salaries of employees with the help of a callback function named "fetchVariables()"
const findNetSalary = (targElem, mainID, elemID, elemID2, elemID3) => {
  let [inpEmpAdv, inpSalary, inpNetSalary] = fetchVariables(targElem, mainID, [
    elemID,
    elemID2,
    elemID3,
  ]);
  let netSalary = inpSalary.value - inpEmpAdv.value;
  inpNetSalary.value = netSalary;
};

// this function holds all functions for calculating all the values (salaries , leaves and so on) at time of input in targeted input based on targeted ID's or elements
const ctnrFuncOfTotalPriceFunc = (targElem, targID) => {
  // those strings which i used in this function with "#", they al are "IDs" of required input elements
  // if i have need of calculate total price, i passed the "IDs" of ("total price" , "price" , "num of bundles")'s input
  // with their targeted elements to the desired function then that unction is passing these arguments to the function named "fetchVariables()"
  // for fetching the targeted inputs

  if (targID === "add-product-price") {
    findTotalPrice(
      targElem,
      "#add-product-form",
      `#${targID}`,
      "#add-product-num-of-bundles",
      "#add-product-total-price",
      // i used "undefined" here fr controlling the error because here is one argument is missing
      undefined
    );
  } else if (targID === "vendor-transaction-price") {
    findTotalPrice(
      targElem,
      "#vendor-transaction-form",
      `#${targID}`,
      "#vendor-transaction-bags",
      "#vendor-transaction-total-price",
      "#vendor-transaction-amount-payable"
    );
  } else if (targID === "client-entry-price") {
    findTotalPrice(
      targElem,
      "#client-entry-form",
      `#${targID}`,
      "#client-entry-bundles",
      "#client-entry-total-price",
      "#client-entry-amount-receivable"
    );
  } else if (targID === "vendor-transaction-advance-payment") {
    findOutstandingAmt(
      targElem,
      "#vendor-transaction-form",
      `#${targID}`,
      "#vendor-transaction-total-price",
      "#vendor-transaction-outstanding-payable"
    );
  } else if (targID === "client-entry-received-by-client") {
    findOutstandingAmt(
      targElem,
      "#client-entry-form",
      `#${targID}`,
      "#client-entry-total-price",
      "#client-entry-outstanding-amount"
    );
  } else if (targID === "payroll-entry-emp-working-days") {
    findLeaves(
      targElem,
      "#payroll-entry-form",
      `#${targID}`,
      "#payroll-entry-month-working-days",
      "#payroll-entry-leaves"
    );
  } else if (targID === "payroll-entry-advance") {
    findNetSalary(
      targElem,
      "#payroll-entry-form",
      `#${targID}`,
      "#payroll-entry-salary",
      "#payroll-entry-net-salary"
    );
  }
};

// these event listeners are for printing forms data on click of "save" button, edit data on click on "edit" button and delete data on click on "delete" button of each form
if (subForm) {
  // this event listener  hold "save" , "delete" , "edit" data function on click on desired buttons
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

  // this event listener holds the main fuction which holds the funtions for calculating salaries, leaves , net salary , total prices , outstanding payables, receivables and so on
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
