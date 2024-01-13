let main = document.querySelector("main");
let url = "http://localhost:3030";

export async function add(e) {
    e.preventDefault();
    let response = await fetch(url + "/data/shoes",{
        method: "POST",
        headers: {"Content-Type": "application/json", "X-Authorization" : sessionStorage.getItem("accessToken")},
        body: JSON.stringify({
            brand: document.getElementById("shoe-brand").textContent,
            model: document.getElementById("shoe-model").textContent,
            imageUrl: document.getElementById("shoe-img").textContent,
            release: document.getElementById("shoe-release").textContent,
            designer: document.getElementById("shoe-designer").textContent,
            value: document.getElementById("shoe-value").textContent
        })
    })

    let result = await response.json();
    console.log(result)
}