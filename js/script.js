const searchButton = document.querySelector("#search-button");
const inputBox = document.querySelector("#input-box");
const crossButton = document.querySelector("#cross-button");
const notesCount = document.querySelector("#notes-count");
const plusButton = document.querySelector("#plus-button");

searchButton.addEventListener("click", () => {
  inputBox.classList.toggle("d-none");
  crossButton.classList.toggle("d-none");
});

crossButton.addEventListener("click", () => {
  inputBox.classList.add("d-none");
  crossButton.classList.add("d-none");
});

async function getData() {
  const response = await fetch("http://127.0.0.1:5000/").then((data) => {
    return data.json()
  });
}

getData();
// plusButton.addEventListener("click",()=>{
//     notesCount.innerHTML += 1;

// })
