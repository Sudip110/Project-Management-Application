

const signUp_top = document.getElementById("signUp_top");
const signin_main = document.getElementById("signin_main");
const input = document.querySelector(".input");
const userName = document.querySelector("#user_name");
const passwored = document.querySelector("#password");
const login_tagline = document.querySelector("#login_tagline");
const sigin_tag = document.querySelector(".sigin_tag");
const confirmPassword = document.createElement("input");
const addAdditionalInput = () => {
  confirmPassword.setAttribute("id", "confirm_password");
  confirmPassword.setAttribute("class", "input_items");
  confirmPassword.setAttribute("type", "password");
  confirmPassword.setAttribute("placeholder", "Confirm Password");
  input.appendChild(confirmPassword);
};

console.log(confirmPassword);
let signUpDisplayed = false;
// this function is supposed to clear the input fieds everytime the sign up or sign in button is clicked on top right corner
const clearInputFields = () => {
  confirmPassword.value = "";
  userName.value = "";
  passwored.value = "";
};

const displaySignup = () => {
  console.log("clicked SignUp");
  clearInputFields();
  if (signUpDisplayed) {
    signUp_top.innerHTML = "Sign Up";
    signin_main.innerHTML = "Sign in";
    login_tagline.innerHTML =
      "Hey, enter your details to sign in to your account";
    sigin_tag.innerHTML = "-or sign in with-";
    input.removeChild(confirmPassword);
    signUpDisplayed = false;
    console.log("signUpDisplayed");
  } else {
    signUp_top.innerHTML = "Sign in";
    signin_main.innerHTML = "Sign Up";
    login_tagline.innerHTML =
      "Hey, enter your details so we could sign you up!";
    sigin_tag.innerHTML = "-or sign up with-";
    addAdditionalInput();
    signUpDisplayed = true;
    console.log("signUpNotDisplayed");
  }
};
// Logs the user in when correct user and password are entered
const login = () => {
  console.log(userName.value);
  if(userName.value==="Harris0214" && passwored.value === 'HARRIS123')
  {
    alert('Login successful!');
    window.location.href="index.html";
  }
  else
  alert ('Invalid username or Pa');
};

signUp_top.addEventListener("click", (e) => {
  displaySignup();
});

signin_main.addEventListener("click", (e) => {
  login();
});

