const searchButton = document.querySelector("#search-button");
const findButton = document.querySelector(".find-button");
const inputBox = document.querySelector("#input-box");
const crossButton = document.querySelector("#cross-button");
const notesCount = document.querySelector("#notes-count");
const plusButton = document.querySelector(".plus-button");
const content = document.querySelector(".content");
const textArea = document.querySelector(".text-area");
const checkButton = document.querySelector(".check-button");

searchButton.addEventListener("click", () => {
  inputBox.classList.toggle("d-none");
  crossButton.classList.toggle("d-none");
  findButton.classList.toggle("d-none");
});

crossButton.addEventListener("click", () => {
  inputBox.classList.add("d-none");
  crossButton.classList.add("d-none");
  findButton.classList.add("d-none");
});

plusButton.addEventListener("click", () => {
  // content.innerHTML += `<div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">hii</div>`;
  textArea.classList.remove("d-none");
  checkButton.classList.remove("d-none");
  textArea.value = "";
});

checkButton.addEventListener("click", () => {
  textArea.classList.add("d-none");
  checkButton.classList.add("d-none");
  content.innerHTML += `<div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">${textArea.value}</div>`;
  // console.log(textArea.value);

  async function sendData(data) {
    const myData = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(myData);
  }

  let notes = [];
  notes.push(textArea.value);
  // console.log(notes);
  sendData(notes);

  async function receiveData() {
    const data = await fetch(`http://127.0.0.1:5000/`)
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
    console.log(data.data);
    content.addEventListener("click", () => {
      textArea.classList.remove("d-none");
      checkButton.classList.remove("d-none");
      content.innerHTML = `<div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">
      ${data.data}
      </div>`;
    });
  }

  receiveData();

  findButton.addEventListener("click", () => {
    if (inputBox.value === notes[0]) {
      console.log(notes);
      content.innerHTML = `<div class="w-100 bg-white">
      <div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">
      ${notes}
      </div>
      </div>`;
    }
  });
});
