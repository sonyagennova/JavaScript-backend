import { res } from "./login.js";

let url = "http://localhost:3030";
let main = document.querySelector("main");
export let image;
export let alt;
export let brand;
export let model;
export let value;
export let releaseDate;
export let designer;
export let id;

export let result;

let htmlTemplate;
let arr = [];


let cardWrapper = document.querySelector(".card-wrapper")

export async function displayShoes(){
    arr = [];
    let response = await fetch(url + "/data/shoes?sortBy=_createdOn%20desc")

    result = await response.json();
    console.log(result)

    if(result.length == 0){
        cardWrapper.innerHTML = "<h2>There are no items added yet.</h2>";
    }
    cardWrapper.innerHTML = "";

    for(let i = 0; i < result.length; i++){
        let objResult = {};
        image = result[i].imageUrl;
        brand = result[i].brand;
        model = result[i].model;
        value = result[i].value;
        releaseDate = result[i].release;
        designer = result[i].designer;
        id = result[i]._id;

        let altForImage = image.split("/");
        let altForImageName = altForImage[2].split(".");
        alt = altForImageName[0];


        htmlTemplate = `<li class="card">
<img src="${image}" alt="${alt}" />
<p>
  <strong>Brand: </strong><span class="brand">${brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${model}</span>
</p>
<p><strong>Value:</strong><span class="value">${value}</span>$</p>
<text id="${id}"></text>
<a class="details-btn" href="">Details</a>
</li>`;
       
        objResult.image = image;
        objResult.brand = brand;
        objResult.model = model;
        objResult.value = value;
        objResult.release = releaseDate;
        objResult.designer = designer;
        objResult.alt = alt;
        objResult.id = id;

        arr.push(objResult);
        cardWrapper.innerHTML += htmlTemplate;
    }

    document.querySelectorAll(".details-btn").forEach(x => x.addEventListener("click", (e) => {
        e.preventDefault();
        let rectangle = e.target;
    
        if(rectangle == x){
            for(let i = 0; i < arr.length; i++){
                if(arr[i].id === x.parentNode.querySelector("text").id){
                    main.innerHTML = "";
    let template = `<div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
    <img src=${arr[i].image} alt=${arr[i].alt} />
    </div>
    <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${arr[i].brand}</span></p>
    <p>
    Model: <span id="details-model">${arr[i].model}</span>
    </p>
    <p>Release date: <span id="details-release">${arr[i].release}</span></p>
    <p>Designer: <span id="details-designer">${arr[i].designer}</span></p>
    <p>Value: <span id="details-value">${arr[i].value}</span></p>
    <text id="${arr[i].id}"></text>
    </div>
    </div>`;
    
    
    main.innerHTML = template;
    if(sessionStorage.getItem("accessToken")){
        document.getElementById("details-wrapper").innerHTML += `<!--Edit and Delete are only for creator-->
        <div id="action-buttons">
        <a href="/edit" id="edit-btn">Edit</a>
        <a href="" id="delete-btn">Delete</a>
        </div>`;

        document.querySelectorAll("#edit-btn").forEach(x => x.addEventListener("click", async (e) => {
            e.preventDefault();
            history.pushState({}, '', "/edit");

            //let response = await fetch(url + "/data/shoes/:id")

            main.innerHTML = "";
            main.innerHTML = `<section id="edit">
            <div class="form">
              <h2>Edit item</h2>
              <form class="edit-form">
                <input
                  type="text"
                  name="brand"
                  id="shoe-brand"
                  placeholder="Brand"
                />
                <input
                  type="text"
                  name="model"
                  id="shoe-model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="shoe-img"
                  placeholder="Image url"
                />
                <input
                  type="text"
                  name="release"
                  id="shoe-release"
                  placeholder="Release date"
                />
                <input
                  type="text"
                  name="designer"
                  id="shoe-designer"
                  placeholder="Designer"
                />
                <input
                  type="text"
                  name="value"
                  id="shoe-value"
                  placeholder="Value"
                />
  
                <button type="submit">post</button>
              </form>
            </div>
          </section>`

          document.getElementById("shoe-brand").value = x.parentNode.parentNode.querySelector("#details-brand").textContent;
          document.getElementById("shoe-model").value = x.parentNode.parentNode.querySelector("#details-model").textContent;
          document.getElementById("shoe-img").value = x.parentNode.parentNode.querySelector("img").src;
          document.getElementById("shoe-release").value = x.parentNode.parentNode.querySelector("#details-release").textContent;
          document.getElementById("shoe-designer").value = x.parentNode.parentNode.querySelector("#details-designer").textContent;
          document.getElementById("shoe-value").value = x.parentNode.parentNode.querySelector("#details-value").textContent;


          document.querySelector("button").addEventListener("click", async (e) => {
              for(let i = 0; i < result.length; i++){
                  if(x.parentNode.parentNode.querySelector("text").id == result[i]._id){
                    e.preventDefault();
                    console.log(result[i]._id)
                    await fetch(url + `/data/shoes/${result[i]._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Authorization": sessionStorage.getItem("accessToken")
                        },
                        body: JSON.stringify({
                            brand: document.getElementById("shoe-brand").value,
                            model: document.getElementById("shoe-model").value,
                            imageUrl: document.getElementById("shoe-img").value,
                            release: document.getElementById("shoe-release").value,
                            designer: document.getElementById("shoe-designer").value,
                            value: document.getElementById("shoe-value").value
                        })
                    })

                }
            }
          })
        }));
    }
                }
            }
        }

    }))
}