let optCtnr = document.querySelector(".opt-ctnr");
let num = 0;
let logInBtn = document.querySelector("#login-btn");
let topBar = document.querySelector("#navbarSupportedContent");
let loginPgForm = document.querySelector(".login-pg-form");
let loginPgBtn = document.querySelector(".login-pg-btn");

if (optCtnr) {
  for (let index = 0; index <= 6; index++) {
    let btn = document.createElement("button");
    btn.innerText = `Button ${index}`;
    btn.classList.add("opts", "w-100");
    optCtnr.append(btn);
  }
}

let optBtns = document.querySelectorAll(".opts");
let inpCtnr = document.querySelector(".inp-cntr");

const navigateToNextPage = (page) => {
  window.location.href = page
};

const addClassFunc = (elem, className) => {
  elem.classList.add(className);
};

const remClassFunc = (elem, className) => {
  elem.classList.remove(className);
};

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

topBar.addEventListener("click" , (e) => {
  if (e.target.id === 'login-btn' || e.target.id === 'signin-btn') {
    navigateToNextPage('login.html');
    console.log('clicked');
  }
});

if (loginPgForm) {
  loginPgForm.addEventListener("submit" , (e) => {
    e.preventDefault();
  });

  loginPgForm.addEventListener("click" , (e) => {
    if (e.target.classList.contains("login-pg-btn")) {
      navigateToNextPage("dashbord.html")
    }  
  });
}