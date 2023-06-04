// window.onload = () => {
//   const table = {
//     init: function () {
//       this.toDoList();
//     },
//     toDoList: function () {
//       pullData(); //save data past

//       // Elements
//       const overlay = document.querySelector(".overlay");
//       const loader = document.querySelector(".loader");

//       function hidePopup(popup) {
//         popup.classList.remove("active");
//         overlay.classList.remove("active");
//       }

//       function showPopup(popup) {
//         popup.classList.add("active");
//         overlay.classList.add("active");
//       }

//       // Add - Edit - Popup
//       const addBtn = document.querySelector(".btnAdd");
//       const editBtn = document.querySelectorAll(".edit");

//       const editPopup = document.querySelector(".form-add-edit");
//       const completeBtn = editPopup.querySelector("#complete");
//       const cancelBtn = editPopup.querySelector("#cancel");

//       const fieldMail = document.querySelector("#mail");
//       const fieldDes = document.querySelector("#des");
//       const fieldAuthor = document.querySelector("#author");

//       var currentFunc;

//       addBtn.addEventListener("click", () => {
//         currentFunc = "add"; // check form add or edit item
//         showPopup(editPopup);
//       });

//       editBtn.forEach((item, index) =>
//         item.addEventListener("click", () => {
//           currentFunc = "edit"; // check form add or edit item
//           showPopup(editPopup);

//           completeBtn.addEventListener("click", () => {
//             validate();
//             if (validate()) {
//               loader.classList.add("active");
//               setTimeout(() => {
//                 loader.classList.remove("active");
//                 if (currentFunc == "edit") {
//                   editData(index);
//                 }
//               }, 1000);
//             }
//           });
//         })
//       );

//       completeBtn.addEventListener("click", () => {
//         validate();
//         if (validate()) {
//           loader.classList.add("active");
//           setTimeout(() => {
//             loader.classList.remove("active");
//             if (currentFunc == "add") {
//               addData();
//             }
//           }, 1000);
//         }
//       });

//       cancelBtn.addEventListener("click", () => {
//         hidePopup(editPopup);
//         resetForm();
//       });

//       // Delete - Popup
//       const delBtn = document.querySelectorAll(".trash");
//       const delPopup = document.querySelector(".form-delele");
//       const yesBtn = delPopup.querySelector("#yes");
//       const noBtn = delPopup.querySelector("#no");

//       delBtn.forEach((item, index) =>
//         item.addEventListener("click", () => {
//           showPopup(delPopup);
//           yesBtn.addEventListener("click", () => {
//             loader.classList.add("active");
//             setTimeout(() => {
//               loader.classList.remove("active");
//               deleteData(index);
//             }, 1000);
//             hidePopup(delPopup);
//           });
//         })
//       );

//       noBtn.addEventListener("click", () => {
//         hidePopup(delPopup);
//       });

//       editPopup.addEventListener("animationend", () => {
//         editPopup.style.animation = "";
//       });

//       // Search
//       const search = document.querySelector(".nav__search #search");
//       search.addEventListener("keyup", () => {
//         searchData(search.value);
//       });

//       // Sort
//       const sort = document.querySelectorAll("[data-sort]");
//       sort.forEach((item, index) =>
//         item.addEventListener("click", () => {
//           let order = item.dataset.sort;
//           sort.forEach((i) => i.classList.remove("active"));
//           if (order == "desc") {
//             item.dataset.sort = "asc";
//             item.className = "active asc";
//             sortData(item.dataset.col, "asc");
//           } else {
//             item.dataset.sort = "desc";
//             item.className = "active desc";
//             sortData(item.dataset.col, "desc");
//           }
//         })
//       );

//       // ------------------------------- Data Storage --------------------------------- //
//       // Validate Form
//       function validate() {
//         if (
//           fieldMail.value.length == 0 ||
//           fieldDes.value.length == 0 ||
//           fieldAuthor.value.length == 0
//         ) {
//           editPopup.style.animation = "invalid 0.5s linear forwards";
//           return false;
//         } else {
//           return true;
//         }
//       }

//       // Create New Constructor Mail
//       function objectMail(id, mail, des, author) {
//         this.id = id;
//         this.mail = mail;
//         this.des = des;
//         this.author = author;
//       }

//       function resetForm() {
//         fieldMail.value = "";
//         fieldDes.value = "";
//         fieldAuthor.value = "";
//       }

//       function pushData() {
//         var dataMail = JSON.parse(localStorage.getItem("data"));
//         if (dataMail === null) dataMail = [];

//         let objMail = new objectMail(
//           dataMail.length + 1,
//           fieldMail.value,
//           fieldDes.value,
//           fieldAuthor.value
//         );

//         dataMail.push(objMail);

//         localStorage.setItem("data", JSON.stringify(dataMail));
//       }

//       function pullData() {
//         dataMail = JSON.parse(localStorage.getItem("data")); // convert '[]' => []
//         if (dataMail === null) return;
//         document.querySelector("tbody").innerHTML = "";
//         dataMail.forEach((item, index) => {
//           let eleMail = document.createElement("tr");
//           let contentMail = `
//                             <td class="id">${item.id}</td>
//                             <td class="title">${item.mail}</td>
//                             <td class="des">${item.des}</td>
//                             <td class="author">${item.author}</td>
//                             <td class="edit"><i class="fas fa-edit"></i></td>
//                             <td class="trash"><i class="fas fa-trash-alt"></i></td>
//                         `;
//           eleMail.innerHTML = contentMail;
//           document.querySelector("tbody").appendChild(eleMail); // push element after last item in tbody
//         });
//       }

//       //Add Data
//       function addData() {
//         pushData();
//         hidePopup(editPopup);
//         resetForm();
//         location.reload(); //reload page to update new data and DOM
//       }

//       //Edit Data
//       function editData(index) {
//         dataMail = JSON.parse(localStorage.getItem("data")); // convert '[]' => []

//         dataMail[index].mail = fieldMail.value;
//         dataMail[index].des = fieldDes.value;
//         dataMail[index].author = fieldAuthor.value;

//         localStorage.setItem("data", JSON.stringify(dataMail)); // convert [] => '[]'
//         resetForm();
//         location.reload(); //reload page to update new data and DOM
//       }

//       //Delete Data
//       function deleteData(index) {
//         dataMail = JSON.parse(localStorage.getItem("data")); // convert '[]' => []
//         dataMail.splice(index, 1);
//         dataMail.forEach((item, index) => (item.id = index + 1));
//         localStorage.setItem("data", JSON.stringify(dataMail)); // convert [] => '[]'
//         location.reload(); //reload page to update new data and DOM
//       }

//       //Search Data
//       function searchData(searchValue) {
//         let items = document.querySelectorAll("tbody tr");
//         items.forEach((item, index) => {
//           let value = item.querySelector(".title").textContent;
//           if (value.toUpperCase().includes(searchValue.toUpperCase())) {
//             items[index].style.cssText = "display: table-row;";
//           } else {
//             items[index].style.cssText = "display: none;";
//           }
//         });
//       }

//       //Sort Data
//       function sortData(type, order) {
//         let typeSort = type;

//         arraySort = JSON.parse(localStorage.getItem("data")); // convert '[]' => []

//         if (order == "desc") {
//           if (typeSort == "id") {
//             arraySort = arraySort.sort((a, b) =>
//               parseInt(a[typeSort]) > parseInt(b[typeSort]) ? 1 : -1
//             );
//           } else {
//             arraySort = arraySort.sort((a, b) =>
//               a[typeSort].toLowerCase() > b[typeSort].toLowerCase() ? 1 : -1
//             );
//           }
//         } else {
//           if (typeSort == "id") {
//             arraySort = arraySort.sort((a, b) =>
//               parseInt(a[typeSort]) < parseInt(b[typeSort]) ? 1 : -1
//             );
//           } else {
//             arraySort = arraySort.sort((a, b) =>
//               a[typeSort].toLowerCase() < b[typeSort].toLowerCase() ? 1 : -1
//             );
//           }
//         }

//         const allItem = document.querySelectorAll("tbody tr");
//         var main = document.querySelector("tbody");

//         main.innerHTML = "";
//         var max = 0;
//         while (max <= allItem.length) {
//           arraySort.forEach((items, indexs) => {
//             allItem.forEach((item, index) => {
//               let selfID = item.querySelector(".id").textContent;
//               if (selfID == items.id) {
//                 main.appendChild(item);
//                 max++;
//               }
//             });
//           });
//         }
//       }

//       //Pagination Page
//       var currentPage = 1;
//       var rows = 5;
//       var dataSet = JSON.parse(localStorage.getItem("data"));
//       var table = document.querySelector("tbody");
//       let allItem = document.querySelectorAll("tbody tr");

//       function displayArrayPagination(array, wrapper, rows_per_page, page) {
//         if (array == null) return;
//         wrapper.innerHTML = "";
//         page--;

//         let start = rows_per_page * page;
//         let end = start + rows_per_page;
//         let paginationArray = array.slice(start, end);

//         for (let i = 0; i < paginationArray.length; i++) {
//           wrapper.appendChild(allItem[i + start]);
//         }
//       }
//       displayArrayPagination(dataSet, table, rows, currentPage);

//       // Display Pagination Button
//       function createPagBtn() {
//         if (dataSet == null) return;
//         var quality = Math.ceil(dataSet.length / rows);
//         const paginationGroup = document.createElement("ul");
//         paginationGroup.className = "pagination";
//         document.querySelector(".table").appendChild(paginationGroup);
//         for (let i = 0; i < quality; i++) {
//           let item = document.createElement("li");
//           if (i == currentPage - 1) {
//             item.classList.add("active");
//           }
//           item.innerHTML = i + 1;
//           paginationGroup.appendChild(item);
//         }
//       }
//       createPagBtn();

//       // Pagination Click Event
//       const allPagBtn = document.querySelectorAll(".pagination li");

//       if (allPagBtn == null) return;

//       allPagBtn.forEach((item, index) =>
//         item.addEventListener("click", () => {
//           allPagBtn.forEach((i) => i.classList.remove("active"));
//           item.classList.add("active");
//           currentPage = index + 1;

//           displayArrayPagination(dataSet, table, rows, currentPage);
//         })
//       );
//     },
//   };
//   table.init();
// };

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

const showPopup = function (e) {
  overlay.classList.add("active");
  formAddEdit.classList.add("active");
  form.style.transform = "scale(1)";
};

const hidePopup = function (e) {
  overlay.classList.remove("active");
  formAddEdit.classList.remove("active");
  form.style.transform = "scale(0)";
};

const deleteInputValue = () => {
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

const addNewUser = () => {
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

const updateCurrentUser = () => {
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

const handleClickComplete = function (e) {
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
