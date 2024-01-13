import { guests, loggedInUsers, pages } from "./app.js";
import { displayShoes } from "./details.js";

let main = document.querySelector("main");

export async function register(e){
    e.preventDefault();
    let form = e.target;
    let data = new FormData(form);

    let email = data.get("email");
    let password = data.get("password");
    let repass = data.get("re-password");
    console.log(repass);
    console.log(password);

    let url = "http://localhost:3030/users/register";

    if(password !== repass){
        alert("Passwords need to match!");
        throw new Error("Passwords need to match!");
    }
    
    let response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ email: email, pass: password, repass: repass})
    })
    
    let result = await response.json();
    console.log(result);
    
    if(result.code !== 200){
      alert(result.message)
      throw new Error(result.message);
    }
    
    sessionStorage.setItem("accessToken", result.accessToken);

    main.innerHTML = "";
    main.appendChild(pages.dashboard);
    //console.log(displayShoes())
    displayShoes();

    guests.innerHTML = "";
    loggedInUsers.innerHTML = `<div class="user">
    <a href="/add">Add Pair</a>
    <a href="/logout">Logout</a>
  </div>`;

}