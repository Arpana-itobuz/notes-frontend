const searchButton = document.querySelector("#search-button");
const findButton = document.querySelector(".find-button");
const inputBox = document.querySelector("#input-box");
const crossButton = document.querySelector("#cross-button");
const notesCount = document.querySelector(".notes-count");
const plusButton = document.querySelector(".plus-button");
const content = document.querySelector(".content");
const textArea = document.querySelector(".text-area");
const checkButton = document.querySelector(".check-button");
const popUp = document.querySelector(".pop-up");
const popUpDelete = document.querySelector(".pop-up-delete");
const popUpUpdate = document.querySelector(".pop-up-update");
const rejectButton = document.querySelector(".reject-button");
const darkTheme = document.querySelector(".dark");
const lightTheme = document.querySelector(".light");
const colorTheme = document.querySelector(".color");
const body = document.querySelector(".body");

darkTheme.addEventListener("click", () => {
  body.classList.add("dark-theme");
  body.classList.remove("light-theme");
  textArea.classList.add("dark-theme");
  textArea.classList.remove("write");
});

lightTheme.addEventListener("click", () => {
  body.classList.remove("dark-theme");
  body.classList.add("light-theme");
  textArea.classList.add("light-theme");
  textArea.classList.remove("dark-theme");
  textArea.classList.remove("write");
});

colorTheme.addEventListener("click", () => {
  body.classList.remove("dark-theme");
  body.classList.remove("light-theme");
  textArea.classList.remove("dark-theme");
  textArea.classList.remove("light-theme");
  textArea.classList.add("write");
});

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
  popUp.classList.add("d-none");
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
  plusButton.classList.remove("d-none");
  rejectButton.classList.add("d-none");
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

  let allArray = [];
  allArray.push(data.data);

  let newArray = [];
  for (let i = 0; i < data.data.length; i++) {
    newArray.push(allArray[0][i].name);
  }

  findButton.addEventListener("click", () => {
    const found = newArray.find((element) => element === inputBox.value);
    if (inputBox.value === found) {
      alert("One Such note found ...");
      inputBox.value = "";
    } else {
      alert("No such note found !!");
      inputBox.value = "";
    }
  });

  notesCount.innerHTML = data.data.length;

  for (let i = 0; i < data.data.length; i++) {
    content.innerHTML += `<i class="fa-sharp fa-solid fa-trash main-button position-absolute end-0 me-4 mt-2 p-2 rounded-circle delete-button" onclick="deleteData('${data.data[i]._id}')" id='${data.data[i]._id}' ></i>
    <i class="fas fa-solid fa-pen-nib position-absolute end-0 me-4 mt-5 main-button p-2 rounded-circle update-button" ></i>
    <div class="notes-area notes-box all-notes w-100 py-5 my-3 p-2 cursor-pointer" contenteditable="true" >
    ${data.data[i].name}
    </div>`;
  }
  // popUpDelete.classList.add("d-none");

  const noteArea = document.querySelectorAll(".notes-area");
  noteArea.forEach((e) => {
    e.addEventListener("click", () => {
      e.style.height = "30vh";
    });
  });

  const updateButton = document.querySelectorAll(".update-button");

  updateButton.forEach((e) => {
    let text = e.nextElementSibling.textContent;
    e.addEventListener("click", () => {
      console.log(text);

      // setTimeout(() => {
        popUpUpdate.classList.remove("d-none");
      // }, 2000);
      console.log(e.nextElementSibling.textContent);
      updateData(text, e.nextElementSibling.textContent);
    });
    setTimeout(() => {
      popUpUpdate.classList.add("d-none");
    }, 2000);
  });
  return data;
}

let responseData = receiveData();
// popUpDelete.classList.add("d-none");

async function deleteData(myId) {
  setTimeout(() => {
    popUpDelete.classList.add("d-none");
  }, 2000);
  let confirming = confirm("Are You Sure ?");
  if (confirming === false) {
    console.log("hii");
  } else {
    popUpDelete.classList.remove("d-none");
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
}

async function updateData(value1, value2) {
  
  const updateData = await fetch(`http://127.0.0.1:5000/`, {
    method: "PUT",
    body: JSON.stringify([{ name: value1.trim() }, { name: value2.trim() }]),
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
}
