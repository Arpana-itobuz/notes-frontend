const searchButton = document.querySelector("#search-button");
const findButton = document.querySelector(".find-button");
const inputBox = document.querySelector("#input-box");
const crossButton = document.querySelector("#cross-button");
const notesCount = document.querySelector("#notes-count");
const plusButton = document.querySelector(".plus-button");
const content = document.querySelector(".content");
const textArea = document.querySelector(".text-area");
const checkButton = document.querySelector(".check-button");
const popUp = document.querySelector(".pop-up");
const popUpDelete = document.querySelector(".pop-up-delete");
const rejectButton = document.querySelector(".reject-button");

// const allNotes = [];

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
  rejectButton.classList.remove("d-none");
  plusButton.classList.add("d-none");
  textArea.classList.remove("d-none");
  checkButton.classList.remove("d-none");
  textArea.value = "";
});

rejectButton.addEventListener("click", () => {
  rejectButton.classList.add("d-none");
  plusButton.classList.remove("d-none");
  textArea.classList.add("d-none");
  checkButton.classList.add("d-none");
});

checkButton.addEventListener("click", () => {
  popUp.classList.remove("d-none");
  textArea.classList.add("d-none");
  checkButton.classList.add("d-none");
  plusButton.classList.remove("d-none")
  rejectButton.classList.add("d-none")
  let notes = [];
  notes.push(textArea.value);
  sendData(notes);
  content.innerHTML = "";
  receiveData();
});

async function sendData(data) {
  const myData = await fetch("http://127.0.0.1:5000/", {
    method: "POST",
    body: JSON.stringify({ name: data[0] }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function receiveData() {
  const data = await fetch(`http://127.0.0.1:5000/`)
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });


  // console.log(data);

  // const result = data.data.filter((element) => {
  //   if (inputBox.value === element.name) {
  //     return element;
  //   }
  // });

  // console.log("search resilt", result);

  // for (let i = 0; i < data.data.length; i++) {
  //   findButton.addEventListener("click", () => {
  //     // console.log(data.data[i].name);
  //     if (inputBox.value === data.data[i].name) {
  //       content.innerHTML = `<div class="w-100 bg-white">
  //       <div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">
  //       ${data.data[i].name}
  //       </div>
  //       </div>`;
  //     } else {
  //       alert("No such note found!!");
  //     }
  //   });
  // }

  for (let i = 0; i < data.data.length; i++) {
    content.innerHTML += `<i class="fa-sharp fa-solid fa-trash bg-white position-absolute end-0 me-4 mt-5 p-2 rounded-circle delete-button" onclick="deleteData('${data.data[i]._id}')" id='${data.data[i]._id}' ></i><div class="notes-area bg-black text-white w-100 py-5 my-3 p-2">
    ${data.data[i].name}
    </div>`;
    console.log(data.data[i].name);
  }

  const deleteButton = document.querySelectorAll(".delete-button");

  deleteButton.forEach((e) =>
    e.addEventListener("click", () => {
      // deleteButton.style.backgroundColor = "red";
      popUpDelete.classList.remove("d-none");
    })
  );

  // updateButton.forEach((e) =>
  //   e.addEventListener("click", () => {
  //     updateButton.style.backgroundColor = "red";

  //   })
  // );
  return data;
}

let responseData = receiveData();
// allNotes.push(receiveData());

async function deleteData(myId) {
  console.log(myId);
  // let myId = Id.toString();
  const deleteData = await fetch(`http://127.0.0.1:5000/`, {
    method: "DELETE",
    body: JSON.stringify({ id: myId }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((data) => {
      content.innerHTML = "";

      receiveData();
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(deleteData);
}

// content.addEventListener();
