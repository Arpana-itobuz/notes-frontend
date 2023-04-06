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
  textArea.classList.remove("d-none");
  checkButton.classList.remove("d-none");
  textArea.value = "";
});

checkButton.addEventListener("click", () => {
  textArea.classList.add("d-none");
  checkButton.classList.add("d-none");
  content.innerHTML += `<i class="fa-sharp fa-solid fa-trash bg-white position-absolute end-0 me-4 mt-2 p-1 rounded-circle delete-button"></i><div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">${textArea.value}</div>`;

  async function sendData(data) {
    const myData = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      body: JSON.stringify({ name: data[0] }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  let notes = [];
  notes.push(textArea.value);
  // receiveData();
  sendData(notes);
});

async function receiveData() {
  const data = await fetch(`http://127.0.0.1:5000/`)
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(data);

  for (let i = 0; i < data.data.length; i++) {
    findButton.addEventListener("click", () => {
      if (inputBox.value === data.data[i].name) {
        content.innerHTML = `<div class="w-100 bg-white">
        <div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">
        ${data.data[i].name}
        </div>
        </div>`;
      } else {
        alert("No such note found!!");
      }
    });
  }

  for (let i = 0; i < data.data.length; i++) {
    content.innerHTML += `<i class="fa-sharp fa-solid fa-trash bg-white position-absolute end-0 me-4 mt-2 p-1 rounded-circle delete-button" id=${data.data[i]._id} ></i><div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">
    ${data.data[i].name}
    </div>`;
    console.log(data.data[i].name);
  }

  const deleteButton = document.querySelectorAll(".delete-button");
  deleteButton.forEach((e) =>
    e.addEventListener("click", () => {
      console.log("this is deleted");
      deleteData(data.data._id);
      content.innerHTML = "";
      receiveData();
    })
  );
}

receiveData();

async function deleteData(myId) {
  const deleteData = await fetch(`http://127.0.0.1:5000/`, {
    method: "DELETE",
    body: JSON.stringify({ id: myId }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
