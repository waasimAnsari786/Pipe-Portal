// login page's code
let homeForm = document.querySelector("#loginForm");
let emailInp = document.querySelector("#email-inp");
let pswdInp = document.querySelector("#pswd-inp");
let formCtnr = document.querySelector(".form-ctnr");
let dbCtnr = document.querySelector("#db-ctnr");

const setCurDate = () => {
  let dateInps = document.querySelectorAll("input[type='date']");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  dateInps.forEach((dateInp) => {
    dateInp.value = formattedDate;
  });
};
setCurDate();

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

// this is the ripple effect's funcion
const createRipple = (event) => {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height); // Use the larger dimension for the ripple size
  const x = event.clientX - rect.left - size / 2; // Center the ripple
  const y = event.clientY - rect.top - size / 2; // Center the ripple

  ripple.classList.add("ripple");
  ripple.style.position = "absolute";
  ripple.style.zIndex = "-1";
  ripple.style.width = ripple.style.height = `${size / 25}rem`;
  ripple.style.left = `${x / 25}rem`;
  ripple.style.top = `${y / 25}rem`;

  button.querySelector("#submit-btn").appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
};

// this is for prevnting the submit functionality of forms
if (homeForm) {
  homeForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // this event listener is for targeting the submit button of login page and then check user's email and password through the function which are defined at above
  homeForm.addEventListener("click", (e) => {
    if (e.target.id === "submit-btn") {
      navigateToNextPageFunc("dashbord.html");
      // // i used callback hell in this line of code
      // let [finalValue1, finalValue2, emInpVal, psInpVal] = chkEmailPswdOnClick(
      //   validateEmailFunc,
      //   validatePswdfunc,
      //   emailInp.value,
      //   pswdInp.value
      // );

      // // these are the conditions for alerting the user that what mistake is he doing at the time of login
      // if (emInpVal && psInpVal) {
      //   if (finalValue1 && finalValue2) {
      //     navigateToNextPageFunc("dashbord.html");
      //   } else if (!finalValue1 && !finalValue2) {
      //     alert("Both email and password are incorrect!");
      //   } else if (!finalValue1) {
      //     alert("Your email is incorrect!");
      //   } else if (!finalValue2) {
      //     alert("Your password is incorrect!");
      //   }
      // } else {
      //   alert("You can't login without enter your email and password!");
      // }
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
  targElem.innerHTML = "";
};

const showDiv = (targElem) => {
  targElem.style.transition = "1s";
  targElem.style.transform = "translateX(0rem)";
  targElem.style.opacity = "1";
};

dbCtnr ? showDiv(dbCtnr) : "";

const bringForwAni = (targId) => {
  let slides = document.querySelectorAll(".slide-ctnr");
  slides.forEach((slide) => {
    requestAnimationFrame(() => {
      if (slide.id === targId) {
        setTimeout(() => {
          slide.style.transition = "1s";
          slide.style.transform = "translateX(0%)";
          slide.style.opacity = "1";
          slide.style.zIndex = "2";
          slide.style.visibility = "visible";
        }, 1000);
      } else {
        slide.style.transition = "1s";
        slide.style.transform = "translateX(-100%)";
        slide.style.opacity = "0";
        slide.style.zIndex = "-2";
        slide.style.visibility = "hidden";
        setTimeout(() => {
          slide.style.transform = "translateX(100%)";
          slide.style.opacity = "0";
          slide.style.zIndex = "-2";
          slide.style.visibility = "hidden";
        }, 1100);
      }
    });
  });
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
    targElem.innerHTML = `
      <button class="w-100 sub-opts">add ${btnText}</button>
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

// this variable is for getting the dashbord's page button's section
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
      bringForwAni("add-vendor-form");
    } else if (e.target.innerText === "Add Product") {
      bringForwAni("add-product-form");
    } else if (e.target.innerText === "Vendor's Transaction") {
      bringForwAni("vendor-transaction-form");
    } else if (e.target.innerText === "Add Client") {
      bringForwAni("add-client-form");
    } else if (e.target.innerText === "Client's Entry") {
      bringForwAni("client-entry-form");
    } else if (e.target.innerText === "Add Employee") {
      bringForwAni("add-employee-form");
    } else if (e.target.innerText === "Advance Salary") {
      bringForwAni("advance-salary-form");
    } else if (e.target.innerText === "Payroll Entry") {
      bringForwAni("payroll-entry-form");
    }
  });
}
// dashboard end

// printed data of forms is removed through this function

const deleteDataFunc = (targElem) => {
  let targDelElem = targElem.closest(".added-data-ctnr-inner");
  targDelElem.remove();
};

// printed data of forms is edited through this function. this function fetchs the printed data then print it in inputs for editting
const editDataFunc = (targElem, mainID) => {
  let prElem = targElem.closest("tbody");
  let inps = document.querySelector(mainID).querySelectorAll("input , select");
  let peras = prElem.querySelectorAll("td");
  inps.forEach((inp, i) => {
    inp.value = peras[i + 1].innerText;
  });

  formsDataAPI.find((curObj) => curObj["add-vendor-added-data-ctnr"]);
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

// form controlling of all pages's forms

// i used this object below for handling the values of all forms's inputs
const obj = {};

// this variable is for printing the serial numbers in all forms
let num = 0;

let formsDataAPI = [
  {
    "add-vendor-added-data-ctnr": [],
  },
  {
    "add-product-added-data-ctnr": [],
  },
];

// this function creates a div for taking all the printed data of inputs of all forms
const createDiv = (SNo) => {
  let mainDiv = document.createElement("tr");
  mainDiv.classList.add("added-data-ctnr-inner");
  mainDiv.innerHTML = `
  <td class='text-center p-0 added-data s-no-ctnr' width='20rem'>
  <p class='s-no'>${SNo}</p>
  </td>
  <td class='text-end p-0 ed-dl-btn-ctnr'>
  <button id="edit-data-btn">edit</button>
  <button id="delete-data-btn">delete</button>
  </td>`;
  return mainDiv;
};

// this fucntion prints peragraph tags according to the presented quantity of inputs in each form by getting some returned values from the function named "getAddedDataFunc()" which invoked below.
const printAddedDataFun = (updatedObj, mainID) => {
  let [inpsObj, inpsLength] = updatedObj;
  let addedDataDivMain = document.querySelector(mainID);
  let ID = addedDataDivMain.id;
  let ValArr = Object.values(inpsObj);
  if (inpsLength === ValArr.length) {
    let matchVal = formsDataAPI.find((curObj) => {
      return curObj.hasOwnProperty(ID);
    });

    if (matchVal[ID].length <= 0) {
      matchVal[ID].push(inpsObj);
    } else {
      let arr = matchVal[ID].map((curObj) => {
        return Object.values(curObj);
      });

      let checking = arr.map((curELem) => {
        return curELem.map((innElem, i) => {
          return innElem !== ValArr[i];
        });
      });

      let finalCheck = checking[checking.length - 1].some(
        (curElem) => curElem !== false
      );

      if (finalCheck) {
        matchVal[ID].push(inpsObj);
      }
    }

    addedDataDivMain.innerHTML = "";
    matchVal[ID].forEach((curObj, i) => {
      let vals = Object.values(curObj);
      let addedDataDiv = createDiv(i + 1);
      for (let index = 0; index < vals.length; index++) {
        let pera = document.createElement("td");
        pera.innerText = vals[index];
        pera.classList.add("added-data");
        addedDataDiv.insertBefore(pera, addedDataDiv.lastElementChild);
      }
      addedDataDivMain ? addedDataDivMain.append(addedDataDiv) : "";
    });
    return ValArr;
  } else {
    alert("You can't save empty data!");
    return;
  }
};

// this function gets the vlaues of all inputs on click on "save" button of each form and retuns getted data to the function named "printAddedDataFun()" wich invoked above
const getAddedDataFunc = (targElem, mainID) => {
  let inps = targElem.querySelector(mainID).querySelectorAll("input , select");
  let newObj = new Object();
  inps.forEach((inp) => {
    if (inp.value !== "") {
      inp.value = inp.value.split(" ").join("").toLowerCase();
      newObj[inp.id] = inp.value;
      if (inp.getAttribute("type") !== "date") {
        inp.value = "";
      } else {
        setCurDate();
      }
    } else {
      return;
    }
  });
  return [newObj, inps.length];
};

// this function holds 2 functions which involed above. i created this function for enhancing the readability
const ctnrFuncOfAddedDataFunc = (targElem, mainID, mainID2) => {
  let updatedObj = getAddedDataFunc(targElem, mainID);
  let ValArr = printAddedDataFun(updatedObj, mainID2);
  return [updatedObj, ValArr];
};

// these event listeners are for printing forms data on click of "save" button, edit data on click on "edit" button and delete data on click on "delete" button of each form
if (formCtnr) {
  // this event listener  hold "save" , "delete" , "edit" data function on click on desired buttons
  formCtnr.addEventListener("click", (e) => {
    if (e.target.innerText === "View Vendor") {
      e.preventDefault();
      bringForwAni("add-vendor-data-ctnr");
    } else if (e.target.innerText === "View Products") {
      e.preventDefault();
      bringForwAni("add-product-data-ctnr");
    } else if (e.target.innerText === "View Transactions") {
      e.preventDefault();
      bringForwAni("vendor-transaction-data-ctnr");
    } else if (e.target.innerText === "View Clients") {
      e.preventDefault();
      bringForwAni("add-client-data-ctnr");
    } else if (e.target.innerText === "View Clients Entries") {
      e.preventDefault();
      bringForwAni("client-entry-data-ctnr");
    } else if (e.target.innerText === "View Employees") {
      e.preventDefault();
      bringForwAni("add-employee-data-ctnr");
    } else if (e.target.innerText === "View Advance Salaries") {
      e.preventDefault();
      bringForwAni("advance-salary-data-ctnr");
    } else if (e.target.innerText === "View Payroll Entries") {
      e.preventDefault();
      bringForwAni("payroll-entry-data-ctnr");
    } else if (e.target.id === "add-vendor-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#add-vendor-form",
        "#add-vendor-added-data-ctnr"
      );
    } else if (e.target.id === "add-product-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#add-product-form",
        "#add-product-added-data-ctnr"
      );
    }
    //  else if (e.target.id === "vendor-transaction-save-btn") {
    //   e.preventDefault();
    //   ctnrFuncOfAddedDataFunc(
    //     formCtnr,
    //     "#vendor-transaction-form",
    //     "#vendor-transaction-added-data-ctnr"
    //   );
    // } else if (e.target.id === "add-client-save-btn") {
    //   e.preventDefault();
    //   ctnrFuncOfAddedDataFunc(
    //     formCtnr,
    //     "#add-client-form",
    //     "#add-client-added-data-ctnr"
    //   );
    // }
    else if (e.target.innerText === "Edit") {
      bringForwAni("add-vendor-form");
      editDataFunc(e.target, "#add-vendor-form");
    } else if (e.target.innerText === "Delete") {
      deleteDataFunc(e.target);
    }
  });

  // this event listener holds the main fuction which holds the funtions for calculating salaries, leaves , net salary , total prices , outstanding payables, receivables and so on
  formCtnr.addEventListener("input", (e) => {
    if (e.target.id === "add-product-price") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "vendor-transaction-price") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "client-entry-price") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "vendor-transaction-advance-payment") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "client-entry-received-by-client") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "payroll-entry-emp-working-days") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "payroll-entry-advance") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    }
  });
}
