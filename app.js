// login page's code
let homeForm = document.querySelector("#loginForm");
let emailInp = document.querySelector("#email-inp");
let pswdInp = document.querySelector("#pswd-inp");
let formCtnr = document.querySelector(".form-ctnr");
let dbCtnr = document.querySelector("#db-ctnr");
let optShowBtn = document.querySelector("#bars-icon");
let optHideBtn = document.querySelector("#close-icon");

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
  if (type === "vendor") {
    targElem.innerHTML = `
      <button class="w-100 sub-opts">
        <i class="fa-solid fa-user-plus dshbd-icon"></i>
        <span>add ${btnText}</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-cart-plus dshbd-icon"></i>
        <span>add product</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-exchange-alt dshbd-icon"></i>
        <span>${btnText}'s transaction</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-book dshbd-icon"></i>
        <span>${btnText}'s ledger</span>
      </button>`;
    addAniFunc(targElem, "20rem", 0);
  } else if (type === "client") {
    targElem.innerHTML = `
      <button class="w-100 sub-opts">
        <i class="fas fa-user-plus dshbd-icon"></i>
        <span>add ${btnText}</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-sign-in-alt dshbd-icon"></i>
        <span>${btnText}'s entry</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-address-book dshbd-icon"></i>
        <span>${btnText}'s ledger</span>
      </button>`;
    addAniFunc(targElem, "15rem", 0);
  } else if (type === "payroll") {
    targElem.innerHTML = `
      <button class="w-100 sub-opts">
        <i class="fas fa-user-plus dshbd-icon"></i>
        <span>add employee</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-hand-holding-usd dshbd-icon"></i>
        <span>advance salary</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-file-invoice-dollar dshbd-icon"></i>
        <span>${btnText} entry</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-book-open dshbd-icon"></i>
        <span>${btnText} ledger</span>
      </button>`;
    addAniFunc(targElem, "20rem", 0);
  } else if (type === "show-data") {
    targElem.innerHTML = `
      <button class="w-100 sub-opts">
        <i class="fas fa-list-alt dshbd-icon"></i>
        <span>vendor list</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="fas fa-boxes dshbd-icon"></i>
        <span>product list</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-exchange-alt"></i>
        <span>vendor Transaction</span>
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
        <i class="dshbd-icon fas fa-user-edit"></i>
        <span>client entries</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-file-invoice-dollar"></i>
        <span>client ledger</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-address-book"></i>
        <span>employees list</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-money-check-alt"></i>
        <span>advance salaries</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-file-alt"></i>
        <span>payroll entries</span>
      </button>
      <button class="w-100 sub-opts">
        <i class="dshbd-icon fas fa-receipt"></i>
        <span>payroll ledger</span>
      </button>`;
    addAniFunc(targElem, "55rem", 0);
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
    e.stopPropagation();
    let targetedBtn = e.target.closest("button");
    if (!targetedBtn) return;

    let subBtnCtnr = targetedBtn.nextElementSibling;

    if (e.target.closest("button")?.innerText.trim() === "Vendor") {
      handleOnClick(
        subBtnCtnr,
        "vendor",
        e.target.closest("button")?.innerText.trim()
      );
    } else if (e.target.closest("button")?.innerText.trim() === "Client") {
      handleOnClick(
        subBtnCtnr,
        "client",
        e.target.closest("button")?.innerText.trim()
      );
    } else if (e.target.closest("button")?.innerText.trim() === "Payroll") {
      handleOnClick(
        subBtnCtnr,
        "payroll",
        e.target.closest("button")?.innerText.trim()
      );
    } else if (e.target.closest("button")?.innerText.trim() === "Show Data") {
      handleOnClick(
        subBtnCtnr,
        "show-data",
        e.target.closest("button")?.innerText.trim()
      );
    } else if (e.target.closest("button")?.innerText.trim() === "Add Vendor") {
      bringForwAni("add-vendor-form");
    } else if (e.target.closest("button")?.innerText.trim() === "Add Product") {
      bringForwAni("add-product-form");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Vendor's Transaction"
    ) {
      bringForwAni("vendor-transaction-form");
    } else if (e.target.closest("button")?.innerText.trim() === "Add Client") {
      bringForwAni("add-client-form");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Client's Entry"
    ) {
      bringForwAni("client-entry-form");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Add Employee"
    ) {
      bringForwAni("add-employee-form");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Advance Salary"
    ) {
      bringForwAni("advance-salary-form");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Payroll Entry"
    ) {
      bringForwAni("payroll-entry-form");
    } else if (e.target.closest("button")?.innerText.trim() === "Vendor List") {
      bringForwAni("add-vendor-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Product List"
    ) {
      bringForwAni("add-product-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Vendor Transaction"
    ) {
      bringForwAni("vendor-transaction-data-ctnr");
    } else if (e.target.closest("button")?.innerText.trim() === "Client List") {
      bringForwAni("add-client-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Client Entries"
    ) {
      bringForwAni("client-entry-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Employees List"
    ) {
      bringForwAni("add-employee-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Advance Salaries"
    ) {
      bringForwAni("advance-salary-data-ctnr");
    } else if (
      e.target.closest("button")?.innerText.trim() === "Payroll Entries"
    ) {
      bringForwAni("payroll-entry-data-ctnr");
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
          const filteredArray = getedData[prElem.id].filter(
            (item) => JSON.stringify(item) !== JSON.stringify(oldData)
          );
          filteredArray.push(newObj);
          getedData[prElem.id] = filteredArray;
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
const ctnrFuncOfAddedDataFunc = (targElem, mainID, mainID2) => {
  let updatedObj = getAddedDataFunc(targElem, mainID);
  let [newObj, inpsLength, ValArrLength] = updatedObj;
  let ID = document.querySelector(mainID2).id;
  if (inpsLength === ValArrLength) {
    addDataToTable(ID, newObj);
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
    } else if (e.target.id === "vendor-transaction-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#vendor-transaction-form",
        "#vendor-transaction-added-data-ctnr"
      );
    } else if (e.target.id === "add-client-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#add-client-form",
        "#add-client-added-data-ctnr"
      );
    } else if (e.target.id === "client-entry-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#client-entry-form",
        "#client-entry-added-data-ctnr"
      );
    } else if (e.target.id === "add-employee-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#add-employee-form",
        "#add-employee-added-data-ctnr"
      );
    } else if (e.target.id === "advance-salary-save-btn") {
      e.preventDefault();
      ctnrFuncOfAddedDataFunc(
        formCtnr,
        "#advance-salary-form",
        "#advance-salary-added-data-ctnr"
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

// Initialize or retrieve data from local storage
const formsDataAPI = JSON.parse(localStorage.getItem("formsDataAPI")) || {
  "add-vendor-added-data-ctnr": [],
  "add-product-added-data-ctnr": [],
  "vendor-transaction-added-data-ctnr": [],
  "add-client-added-data-ctnr": [],
  "client-entry-added-data-ctnr": [],
  "add-employee-added-data-ctnr": [],
  "advance-salary-added-data-ctnr": [],
  "payroll-entry-added-data-ctnr": [],
};

// Function to check if new data already exists in the array
function isDataPresent(array, newData) {
  return array.some((item) => JSON.stringify(item) === JSON.stringify(newData));
}

// Function to add new data and update local storage
function addDataToTable(key, newData) {
  const formArray = formsDataAPI[key] || [];

  if (!isDataPresent(formArray, newData)) {
    formArray.push(newData);
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
function printDataToTable(key) {
  console.log("executed");

  const tbody = document.getElementById(key);
  tbody.innerHTML = ""; // Clear existing rows

  const data = formsDataAPI[key];

  data.forEach((item, index) => {
    const row = document.createElement("tr");

    // Create Serial Number TD (first column)
    const serialTd = document.createElement("td");
    serialTd.textContent = index + 1; // Serial number starting from 1
    row.appendChild(serialTd);

    // Create TDs for each property
    Object.values(item).forEach((value) => {
      const td = document.createElement("td");
      td.classList.add("added-data");
      td.textContent = value;
      row.appendChild(td);
    });

    // Create Edit and Delete buttons
    const actionsTd = document.createElement("td");
    actionsTd.classList.add("ed-dl-btn-ctnr");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = `btn btn-warning btn-lg edit-${key}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = `btn btn-danger btn-lg delete-${key}`;
    deleteButton.addEventListener("click", () => deleteData(key, index));

    actionsTd.appendChild(editButton);
    actionsTd.appendChild(deleteButton);

    row.appendChild(actionsTd);
    tbody.appendChild(row);
  });
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
printDataToTable("add-vendor-added-data-ctnr");
printDataToTable("add-product-added-data-ctnr");
printDataToTable("vendor-transaction-added-data-ctnr");
printDataToTable("add-client-added-data-ctnr");
printDataToTable("client-entry-added-data-ctnr");
printDataToTable("add-employee-added-data-ctnr");
printDataToTable("add-employee-added-data-ctnr");
printDataToTable("advance-salary-added-data-ctnr");
printDataToTable("payroll-entry-added-data-ctnr");

// pdf printing code of Jquery
$(document).ready(function () {
  $("#dnd-pdf").on("click", function () {
    $("#vendor-table").printThis({
      debug: false, // Show the iframe for debugging
      importCSS: true, // Import page CSS
      importStyle: true, // Import style tags
      printContainer: true, // Grab outer container as well as the contents of the selector
      loadCSS: "Pipe-Portal/style.css", // Path to additional CSS file
      pageTitle: "My Document", // Add title to print page
      removeInline: false, // Remove all inline styles
      copyTagClasses: true, // Copy classes from the HTML & body tag
      header: null, // Add header content to print page
      footer: null, // Add footer content to print page
    });
  });
});
