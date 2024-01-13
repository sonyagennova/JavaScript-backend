import { guests, loggedInUsers, pages } from "./app.js";
import { displayShoes } from "./details.js";
let url = "http://localhost:3030/";
let main = document.querySelector("main");

export async function logout(){
    //e.preventDefault();

    let response = await fetch(url + "users/logout", {
        method: "GET",
        //headers: {'X-Authorization': authToken}
    })

    let result = await response.json();
    console.log(result);

    sessionStorage.clear();

    main.innerHTML = "";
    main.appendChild(pages.dashboard);
    //console.log(displayShoes())
    displayShoes();

    guests.innerHTML = `<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`;
    loggedInUsers.innerHTML = ``;
}