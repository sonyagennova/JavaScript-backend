import { guests, loggedInUsers, pages } from "./app.js";
import { displayShoes } from "./details.js";

let main = document.querySelector("main");
export let res;

export async function login(e){
    e.preventDefault();
    let form = e.target;
    let data = new FormData(form);

    let email = data.get("email");
    let password = data.get("password");

    let url = "http://localhost:3030/users/login";

    let response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ email: email, pass: password})
    })

    res = await response.json();
    console.log(res);
    
    // if(result.code !== 200){
    //      alert(result.message)
    //      throw new Error(result.message);
    // }

    sessionStorage.setItem("accessToken", res.accessToken);

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