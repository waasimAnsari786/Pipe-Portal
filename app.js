// login page's code
let homeForm = document.querySelector("#loginForm");
let emailInp = document.querySelector("#email-inp");
let pswdInp = document.querySelector("#pswd-inp");
let formCtnr = document.querySelector(".form-ctnr");
let dbCtnr = document.querySelector("#db-ctnr");
let optShowBtn = document.querySelector("#bars-icon");
let optHideBtn = document.querySelector("#close-icon");
let printInvoiceBtn = document.querySelector(".print-invoice");

const showHideOptsCtnr = (value) => {
  requestAnimationFrame(() => {
    optCtnr.style.transition = "0.5s";
    optCtnr.style.transform = `translateX(${value}%)`;
  });
};

if (optShowBtn) {
  optShowBtn.addEventListener("click", (e) => {
    showHideOptsCtnr(0);
  });
}
if (optHideBtn) {
  optHideBtn.addEventListener("click", (e) => {
    showHideOptsCtnr(-100);
  });
}

// this function sets the currentdata in those inputs whose type is "data"
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

bringForwAni("db-ctnr");

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
  if (type === "show-data") {
    targElem.innerHTML = `
      <button class="w-100 sub-opts">
        <i class="fas fa-list-alt dshbd-icon"></i>
        <span>vendor list</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-book"></i>
        <span>vendor Ledger</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-users dshbd-icon"></i>
        <span>client list</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-file-invoice-dollar"></i>
        <span>client ledger</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-file-alt"></i>
        <span>payroll entries</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-receipt"></i>
        <span>payroll ledger</span>
      </button>`;
    addAniFunc(targElem, "30rem", 0);
  }

  let allSubOptCtrns = document.querySelectorAll(".sub-opt-ctnr");
  allSubOptCtrns.forEach((div) => {
    if (div !== targElem) {
      remAniFunc(div);
    }
  });
};

// this function is for printing the invoice
const printInvoice = () => {
  // navigateToNextPageFunc("current transaction.html");
  let getedData = JSON.parse(localStorage.getItem("formsDataAPI") || []);
  let vendorDetails = getedData["add-vendor-added-data-ctnr"];
  let vendorTransNProducts = getedData["vendor-transaction-added-data-ctnr"];
  let invoice = document.querySelector(".invoice-ctnr");
  let invClientDetailsSec = document.querySelector(".customer-details-ctnr");
  console.log(invClientDetailsSec);
};

// this variable is for getting the dashbord's page button's section
let optCtnr = document.querySelector(".opt-ctnr");

// all the sub buttons and all forms will be printed through this function
if (optCtnr) {
  optCtnr.addEventListener("click", (e) => {
    e.stopPropagation();
    let targetedBtn = e.target.closest("button");
    if (!targetedBtn) return;

    let subBtnCtnr = targetedBtn.nextElementSibling;

    if (e.target.closest("button")?.innerText.trim() === "Show Data") {
      handleOnClick(
        subBtnCtnr,
        "show-data",
        e.target.closest("button")?.innerText.trim()
      );
    } else if (e.target.closest("button")?.innerText.trim() === "Add Vendor") {
      bringForwAni("add-vendor-and-product-form");
    } else if (e.target.closest("button")?.innerText.trim() === "Add Client") {
      bringForwAni("add-client-form");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Add Employee"
    ) {
      bringForwAni("add-employee-form");
    } else if (e.target.closest("button")?.innerText.trim() === "Vendor List") {
      bringForwAni("add-vendor-data-ctnr");
    } else if (e.target.closest("button")?.innerText.trim() === "Client List") {
      bringForwAni("add-client-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Payroll Entries"
    ) {
      bringForwAni("payroll-entry-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Current Invoice"
    ) {
      navigateToNextPageFunc("current transaction.html");
    }
  });
}
// dashboard end

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
      "#add-product-amount-payable"
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
  } else if (targID === "add-product-advance-payment") {
    findOutstandingAmt(
      targElem,
      "#add-product-form",
      `#${targID}`,
      "#add-product-total-price",
      "#add-product-outstanding-payable"
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

// this variable is for printing the serial numbers in all forms
let num = 0;

// this function gets the vlaues of all inputs on click on "save" button of each form and retuns getted data to the function named "printAddedDataFun()" wich invoked above
const getAddedDataFunc = (targElem, mainID) => {
  let inps = targElem.querySelector(mainID).querySelectorAll("input , select");
  let newObj = new Object();
  inps.forEach((inp) => {
    if (inp.value !== "") {
      newObj[inp.id] = inp.value
        .split(/\s+/)
        .filter((char) => char !== "")
        .join(" ")
        .toLowerCase();
      if (inp.getAttribute("type") !== "date") {
        inp.value = "";
      } else {
        setCurDate();
      }
    } else {
      return;
    }
  });
  let ValArr = Object.values(newObj);
  return [newObj, inps.length, ValArr.length];
};

// printed data of forms is edited through this function. this function fetchs the printed data then print it in inputs for editting
const editDataFunc = (targElem, mainID, btnID) => {
  const oldData = {};
  let prElem = targElem.closest("tbody");
  let prElem2 = targElem.closest("tr");

  let inps = document
    .querySelector(`#${mainID}`)
    .querySelectorAll("input , select");
  let peras = prElem2.querySelectorAll(".added-data");

  inps.forEach((inp, i) => {
    inp.value = peras[i].innerHTML;
    oldData[inp.id] = peras[i].innerHTML;
  });

  let btn = document.querySelector(`#${mainID}`).querySelector(`#${btnID}`);
  btn.setAttribute("id", `${btn.id}-1`);
  if (btn.id === `${btnID}-1`) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let [newObj, inpsLength, ValArrLength] = getAddedDataFunc(
        formCtnr,
        `#${mainID}`
      );

      if (inpsLength === ValArrLength) {
        let getedData = JSON.parse(localStorage.getItem("formsDataAPI"));
        if (!isDataPresent(getedData[prElem.id], newObj)) {
          let oneValue = Object.entries(oldData)[1][1];
          let indexOfOldData = getedData[prElem.id].findIndex((curObj) => {
            return Object.entries(curObj)[1][1] === oneValue;
          });
          getedData[prElem.id].splice(indexOfOldData, 1, newObj);
          // const filteredArray = getedData[prElem.id].filter(
          //   (item) => JSON.stringify(item) !== JSON.stringify(oldData)
          // );
          // filteredArray.push(newObj);
          // getedData[prElem.id] = filteredArray;
          localStorage.setItem("formsDataAPI", JSON.stringify(getedData));
          navigateToNextPageFunc("dashbord.html");
          printDataToTable(prElem.id);
        } else {
          alert("This entry is exist in your saved data!");
          navigateToNextPageFunc("dashbord.html");
        }
      } else {
        alert("You can't save empty data");
        return;
      }
    });
  }
};
// this function holds 2 functions which involed above. i created this function for enhancing the readability
const ctnrFuncOfAddedDataFunc = (targElem, mainID, mainID2, mainID3) => {
  let updatedObj = getAddedDataFunc(targElem, mainID);
  let updatedObj2 = getAddedDataFunc(targElem, mainID2);

  let [newObj, inpsLength, ValArrLength] = updatedObj;
  let [newObj2, inpsLength2, ValArrLength2] = updatedObj2;

  let ID = document.querySelector(mainID3).id;
  if (inpsLength === ValArrLength && inpsLength2 === ValArrLength2) {
    addDataToTable(ID, [newObj, newObj2]);
  } else {
    alert("You can't save empty data!");
    return;
  }
  return updatedObj;
};

// these event listeners are for printing forms data on click of "save" button, edit data on click on "edit" button and delete data on click on "delete" button of each form
if (formCtnr) {
  // this event listener  hold "save" , "delete" , "edit" data function on click on desired buttons
  formCtnr.addEventListener("click", (e) => {
    if (e.target.innerText === "View Vendors") {
      e.preventDefault();
      bringForwAni("add-vendor-data-ctnr");
    } else if (e.target.innerText === "View Clients") {
      e.preventDefault();
      bringForwAni("add-client-data-ctnr");
    } else if (e.target.innerText === "View Payroll Entries") {
      e.preventDefault();
      bringForwAni("payroll-entry-data-ctnr");
    } else if (e.target.id === "add-vendor-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#add-vendor-form",
        "#add-product-form",
        "#add-vendor-data-ctnr"
      );
    } else if (e.target.id === "add-client-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#add-client-form",
        "#add-client-added-data-ctnr"
      );
    } else if (e.target.id === "payroll-entry-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#payroll-entry-form",
        "#payroll-entry-added-data-ctnr"
      );
    } else if (e.target.classList.contains("edit-add-vendor-added-data-ctnr")) {
      bringForwAni("add-vendor-form");
      editDataFunc(e.target, "add-vendor-form", "add-vendor-save-btn");
    } else if (
      e.target.classList.contains("edit-add-product-added-data-ctnr")
    ) {
      bringForwAni("add-product-form");
      editDataFunc(e.target, "add-product-form", "add-product-save-btn");
    } else if (
      e.target.classList.contains("edit-vendor-transaction-added-data-ctnr")
    ) {
      bringForwAni("vendor-transaction-form");
      editDataFunc(
        e.target,
        "vendor-transaction-form",
        "vendor-transaction-save-btn"
      );
    } else if (e.target.classList.contains("edit-add-client-added-data-ctnr")) {
      bringForwAni("add-client-form");
      editDataFunc(e.target, "add-client-form", "add-client-save-btn");
    } else if (
      e.target.classList.contains("edit-client-entry-added-data-ctnr")
    ) {
      bringForwAni("client-entry-form");
      editDataFunc(e.target, "client-entry-form", "client-entry-save-btn");
    } else if (
      e.target.classList.contains("edit-add-employee-added-data-ctnr")
    ) {
      bringForwAni("add-employee-form");
      editDataFunc(e.target, "add-employee-form", "add-employee-save-btn");
    } else if (
      e.target.classList.contains("edit-advance-salary-added-data-ctnr")
    ) {
      bringForwAni("advance-salary-form");
      editDataFunc(e.target, "advance-salary-form", "advance-salary-save-btn");
    } else if (
      e.target.classList.contains("edit-payroll-entry-added-data-ctnr")
    ) {
      bringForwAni("payroll-entry-form");
      editDataFunc(e.target, "payroll-entry-form", "payroll-entry-save-btn");
    }
  });

  // this event listener holds the main fuction which holds the funtions for calculating salaries, leaves , net salary , total prices , outstanding payables, receivables and so on
  formCtnr.addEventListener("input", (e) => {
    if (e.target.id === "add-product-price") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "client-entry-price") {
      e.preventDefault();
      ctnrFuncOfTotalPriceFunc(e.target, e.target.id);
    } else if (e.target.id === "add-product-advance-payment") {
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

// Initialize or retrieve data from local storage
const formsDataAPI = JSON.parse(localStorage.getItem("formsDataAPI")) || {
  "add-vendor-data-ctnr": [],
  "add-client-added-data-ctnr": [],
  "payroll-entry-added-data-ctnr": [],
};

// Function to check if new data already exists in the array
function isDataPresent(array, newData) {
  return array.some((item) => JSON.stringify(item) === JSON.stringify(newData));
}

// Function to add new data and update local storage
function addDataToTable(key, newDataArr) {
  const formArray = formsDataAPI[key] || [];
  let newArr = [];
  let results = [];

  for (let index = 0; index < newDataArr.length; index++) {
    let result = isDataPresent(formArray, newDataArr[index]);
    results.push(result);
    newArr.push(newDataArr[index]);
  }

  if (results.every((result) => result === false)) {
    formArray.push(newArr);
    formsDataAPI[key] = formArray;
    // Save updated data to local storage
    localStorage.setItem("formsDataAPI", JSON.stringify(formsDataAPI));
    // Print the updated data to the table
    printDataToTable(key);
  } else {
    alert("This entry is already exist in your saved data!");
    return;
  }
}

// Function to print data to the table

// Function to print data to the table
function printDataToTable(key) {
  console.log();

  const prDiv = document.getElementById(key);
  if (prDiv) {
    const tbodies = prDiv.querySelectorAll("tbody");
    tbodies[0].innerHTML = ""; // Clear existing rows
    tbodies[1].innerHTML = ""; // Clear existing rows

    const data = formsDataAPI[key];

    // Create a Serial Number TD (first column)
    const row = document.createElement("tr");
    const serialTd = document.createElement("td");
    serialTd.textContent = data.length; // Serial number based on length of data array
    row.appendChild(serialTd);

    // Loop through the first object and print it in the first table
    data.forEach((curArr, index) => {
      curArr.forEach((curObj, i) => {
        Object.values(curObj).forEach((element) => {
          const td = document.createElement("td");
          td.classList.add("added-data");
          td.textContent = element;
          row.appendChild(td);
          tbodies[i].appendChild(row);
        });
      });
    });

    // Create Edit and Delete buttons
    const actionsTr = document.createElement("tr");
    actionsTr.classList.add("ed-dl-btn-ctnr");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = `btn btn-warning btn-lg edit-${key}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = `btn btn-danger btn-lg delete-${key}`;
    deleteButton.addEventListener("click", () => deleteData(key));

    actionsTr.appendChild(editButton);
    actionsTr.appendChild(deleteButton);

    // Append the action buttons to the first row (since buttons are shared)
    prDiv.appendChild(actionsTr);
  }
}

// Function to handle deleting data
function deleteData(key, index) {
  const formArray = formsDataAPI[key];
  formArray.splice(index, 1);

  // Save updated data to local storage
  formsDataAPI[key] = formArray;
  localStorage.setItem("formsDataAPI", JSON.stringify(formsDataAPI));

  // Reprint the updated table
  printDataToTable(key);
}

// // Initial table population (optional)
printDataToTable("add-vendor-data-ctnr");
// printDataToTable("add-client-added-data-ctnr");
// printDataToTable("payroll-entry-added-data-ctnr");

// pdf printing code of Jquery
// $(document).ready(function () {
//   $("#dnd-pdf").on("click", function () {
//     $("#vendor-table").printThis({
//       debug: false, // Show the iframe for debugging
//       importCSS: true, // Import page CSS
//       importStyle: true, // Import style tags
//       printContainer: true, // Grab outer container as well as the contents of the selector
//       loadCSS: "Pipe-Portal/style.css", // Path to additional CSS file
//       pageTitle: "My Document", // Add title to print page
//       removeInline: false, // Remove all inline styles
//       copyTagClasses: true, // Copy classes from the HTML & body tag
//       header: null, // Add header content to print page
//       footer: null, // Add footer content to print page
//     });
//   });
// });
