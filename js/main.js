const btnAdd = document.querySelector(".btnAdd");
const overlay = document.querySelector(".overlay");
const formAddEdit = document.querySelector(".form-add-edit");
const form = document.querySelector(".form");
const btnComplete = document.querySelector("#complete");
const btnCancel = document.querySelector("#cancel");
const mail = document.querySelector("#mail");
const des = document.querySelector("#des");
const author = document.querySelector("#author");
const tbody = document.querySelector("tbody");

let dataUser = [
  { id: "254ds", mail: "Ecommerce", des: "Front End", author: "Tuấn Đức" },
];
btnComplete.classList.add("add");

const renderData = function (user) {
  const newRowUser = document.createElement("tr");
  const newInfo = `
    <td class="id">${user.id}</td>
    <td class="title">${user.mail}</td>
    <td class="des">${user.des}</td>
    <td class="author">${user.author}</td>
    <td class="edit"><i class="fas fa-edit"></i></td>
    <td class="trash"><i class="fas fa-trash-alt"></i></td>
    `;
  newRowUser.innerHTML = newInfo;
  tbody.insertAdjacentElement("beforeend", newRowUser);
};

const showPopup = function () {
  overlay.classList.add("active");
  formAddEdit.classList.add("active");
  form.style.transform = "scale(1)";
};

const hidePopup = function () {
  btnComplete.className = "add";
  deleteInputValue();
  overlay.classList.remove("active");
  formAddEdit.classList.remove("active");
  form.style.transform = "scale(0)";
};

const deleteInputValue = function () {
  mail.value = "";
  des.value = "";
  author.value = "";
};

const handleEdit = function (e) {
  showPopup();
  btnComplete.className = "update";
  const clicked = e.target;
  const trClosest = clicked.closest("tr");
  const currentMail = trClosest.querySelector(".title").textContent;
  const currentDes = trClosest.querySelector(".des").textContent;
  const currentAuthor = trClosest.querySelector(".author").textContent;
  mail.value = currentMail;
  des.value = currentDes;
  author.value = currentAuthor;
  clicked.closest("tr").classList.add("updateUser");
};

const handleDelete = function (e) {
  const clicked = e.target;
  dataUser = dataUser.filter(function (user) {
    return user.id !== clicked.closest("tr").querySelector(".id").textContent;
  });
  clicked.closest("tr").remove();
};

const addNewUser = function () {
  const valueMail = mail.value;
  const valueDes = des.value;
  const valueAuthor = author.value;
  const id = (Math.random() + 1).toString(36).substring(7);

  const newUser = {
    id: id,
    mail: valueMail,
    des: valueDes,
    author: valueAuthor,
  };

  dataUser.push(newUser);

  hidePopup();
  renderData(newUser);
  deleteInputValue();
};

const updateCurrentUser = function () {
  const trUpdate = tbody.querySelector(".updateUser");
  trUpdate.querySelector(".title").textContent = mail.value;
  trUpdate.querySelector(".des").textContent = des.value;
  trUpdate.querySelector(".author").textContent = author.value;

  const tdId = trUpdate.querySelector(".id").textContent;
  for (let i = 0; i < dataUser.length; i++) {
    if (tdId === dataUser[i].id) {
      dataUser[i].mail = mail.value;
      dataUser[i].des = des.value;
      dataUser[i].author = author.value;
      break;
    }
  }

  trUpdate.classList.remove("updateUser");
  btnComplete.className = "add";

  deleteInputValue();
  hidePopup();
};

const handleClickComplete = function () {
  if (btnComplete.classList.contains("add")) {
    addNewUser();
  } else if (btnComplete.classList.contains("update")) {
    updateCurrentUser();
  }
};

const handleButton = function (e) {
  const clicked = e.target;
  if (clicked.classList.contains("fa-edit")) {
    handleEdit(e);
  } else if (clicked.classList.contains("fa-trash-alt")) {
    handleDelete(e);
  }
};

btnAdd.addEventListener("click", showPopup);
btnCancel.addEventListener("click", hidePopup);
btnComplete.addEventListener("click", handleClickComplete);
tbody.addEventListener("click", handleButton);
