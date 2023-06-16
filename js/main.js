"use strict";

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
const thead = document.querySelector("thead");
const tRowOfHead = thead.querySelector("tr");
const inputSearch = document.querySelector("#search");
const paginationContainer = document.querySelector(".pagination-container");
const paginationNumbers = document.querySelector("#pagination-numbers");
const prevBtn = document.querySelector("#prev-button");
const nextBtn = document.querySelector("#next-button");

class App {
  #currentPage = 1;
  #paginationLimit = 3;
  #numberPagination = 1;
  #urlServer = `http://localhost:3000/users?`;
  #field;
  #sort;
  #urlFilter = "";
  #urlSort = "";

  constructor() {
    this._createUI(this.#currentPage);
    this._disableButton(prevBtn);
    this._enableButton(nextBtn);

    btnAdd.addEventListener("click", this._showPopup.bind(this));
    btnCancel.addEventListener("click", this._hidePopup.bind(this));
    btnComplete.addEventListener("click", this._handleClickComplete.bind(this));
    tbody.addEventListener("click", this._handleButton.bind(this));
    inputSearch.addEventListener("keyup", this._handleInputSearch.bind(this));
    thead.addEventListener("click", this._handleSort.bind(this));
    paginationContainer.addEventListener(
      "click",
      this._handlePagination.bind(this)
    );
  }

  _showPopup() {
    overlay.classList.add("active");
    formAddEdit.classList.add("active");
    form.style.transform = "scale(1)";
  }

  _hidePopup() {
    btnComplete.className = "add";
    this._deleteInputValue();
    overlay.classList.remove("active");
    formAddEdit.classList.remove("active");
    form.style.transform = "scale(0)";
    const trUpdate = tbody.querySelector(".updateUser");
    if (trUpdate) {
      trUpdate.classList.remove("updateUser");
    }
  }

  _deleteInputValue() {
    mail.value = "";
    des.value = "";
    author.value = "";
  }

  _disableButton(button) {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  }

  _enableButton(button) {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  }

  _createPagination() {
    paginationNumbers.innerHTML = "";
    let html = "";
    let url = "";
    if (this.#urlFilter) url = `${this.#urlFilter}`;
    else url = `${this.#urlServer}`;
    axios
      .get(`${url}`)
      .then((res) => res.data)
      .then((data) => {
        this.#numberPagination = Math.ceil(data.length / this.#paginationLimit);
        if (this.#currentPage !== this.#numberPagination) {
          this._enableButton(nextBtn);
        }
        for (let i = 0; i < this.#numberPagination; i++) {
          const realIndex = i + 1;
          html += `
          <button
            class="pagination-number"
            page-index="${realIndex}"
            aria-label="Page ${realIndex}"
          >
            ${realIndex}
          </button>
        `;
        }
        paginationNumbers.insertAdjacentHTML("afterbegin", html);
        paginationContainer.style.display = "flex";
        if (this.#currentPage > this.#numberPagination) {
          this.#currentPage = 1;
          this._showDataLoaded(this.#currentPage);
        }
        this._handleActivePageNumber();
      });
  }

  _handleActivePageNumber() {
    const listPagination = document.querySelectorAll(".pagination-number");
    listPagination.forEach((item) => {
      item.classList.remove("active");
      const pageIndex = Number(item.getAttribute("page-index"));
      if (pageIndex === this.#currentPage) {
        item.classList.add("active");
      }
    });
  }

  _showDataLoaded(pageNumber) {
    if (pageNumber === this.#numberPagination) this._disableButton(nextBtn);
    if (pageNumber === 1) this._disableButton(prevBtn);
    let fieldSort = "";
    if (this.#urlSort) {
      fieldSort = `_sort=${this.#field}&_order=${this.#sort}`;
    }
    let url = "";
    if (this.#urlFilter) {
      url = `${this.#urlFilter}&`;
    } else {
      url = `${this.#urlServer}`;
    }
    console.log(url);
    axios
      .get(
        `${url}${fieldSort}&_page=${pageNumber}&_limit=${this.#paginationLimit}`
      )
      .then((res) => res.data)
      .then((data) => {
        this._renderData(data);
      })
      .catch((err) => console.error(err.message));
  }

  _createUI(pageNumber) {
    this._createPagination();
    this._showDataLoaded(pageNumber);
  }

  _newUserHTML(user) {
    return `
      <tr>
        <td class="id">${user.id}</td>
        <td class="mail">${user.mail}</td>
        <td class="des">${user.des}</td>
        <td class="author">${user.author}</td>
        <td class="edit"><i class="fas fa-edit"></i></td>
        <td class="trash"><i class="fas fa-trash-alt"></i></td>
      </tr>
    `;
  }

  _renderData(users) {
    tbody.innerHTML = "";
    let html = ``;
    users.forEach((user) => {
      html += this._newUserHTML(user);
    });
    tbody.insertAdjacentHTML("beforeend", html);
  }

  _handleEdit(e) {
    this._showPopup();
    btnComplete.className = "update";
    const clicked = e.target;
    const trClosest = clicked.closest("tr");
    const currentMail = trClosest.querySelector(".mail").textContent;
    const currentDes = trClosest.querySelector(".des").textContent;
    const currentAuthor = trClosest.querySelector(".author").textContent;
    mail.value = currentMail;
    des.value = currentDes;
    author.value = currentAuthor;
    clicked.closest("tr").classList.add("updateUser");
  }

  _handleDelete(e) {
    const clicked = e.target;
    const idTrDelete = clicked.closest("tr").querySelector(".id").textContent;
    axios
      .delete(`http://localhost:3000/users/${idTrDelete}`)
      .then((res) => {
        this._createUI(this.#currentPage);
      })
      .catch((err) => console.error(err.message));
  }

  _addNewUser() {
    const valueMail = mail.value.trim();
    const valueDes = des.value.trim();
    const valueAuthor = author.value.trim();
    const newUser = {
      mail: valueMail,
      des: valueDes,
      author: valueAuthor,
    };

    axios
      .post("http://localhost:3000/users", newUser)
      .then((res) => {
        this._hidePopup();
        this._deleteInputValue();
        this._createUI(this.#currentPage);
      })
      .catch((err) => console.error(err));
  }

  _updateCurrentUser() {
    const trUpdate = tbody.querySelector(".updateUser");
    const idUpdateTr = trUpdate.querySelector(".id").textContent;
    const newValueMail = mail.value.trim();
    const newValueDes = des.value.trim();
    const newValueAuthor = author.value.trim();
    trUpdate.querySelector(".mail").textContent = newValueMail;
    trUpdate.querySelector(".des").textContent = newValueDes;
    trUpdate.querySelector(".author").textContent = newValueAuthor;

    axios
      .patch(`http://localhost:3000/users/${idUpdateTr}`, {
        mail: newValueMail,
        des: newValueDes,
        author: newValueAuthor,
      })
      .catch((err) => console.error(err));

    trUpdate.classList.remove("updateUser");
    btnComplete.className = "add";

    this._deleteInputValue();
    this._hidePopup();
  }

  _handleClickComplete() {
    if (btnComplete.classList.contains("add")) {
      this._addNewUser();
    } else if (btnComplete.classList.contains("update")) {
      this._updateCurrentUser();
    }
  }

  _handleButton(e) {
    const clicked = e.target;
    if (clicked.closest(".edit")) {
      this._handleEdit(e);
    }
    if (clicked.closest(".trash")) {
      this._handleDelete(e);
    }
  }

  _renderFilterData(users) {
    tbody.innerHTML = "";
    let html = "";
    users.forEach((user) => {
      html += newUserHTML(user);
    });
    tbody.insertAdjacentHTML("beforeend", html);
  }

  _handleInputSearch = (e) => {
    Promise.all([
      axios.get(`http://localhost:3000/users?mail=${inputSearch.value}`),
      axios.get(`http://localhost:3000/users?des=${inputSearch.value}`),
      axios.get(`http://localhost:3000/users?author=${inputSearch.value}`),
    ])
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].data.length !== 0) {
            this.#urlFilter = res[i].config.url;
            break;
          }
        }
        return res.map((item) => item.data);
      })
      .then((data) => {
        paginationContainer.style.display = "none";
        let isFinded = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].length > 0) {
            isFinded = true;
            this._createUI(1);
            break;
          }
        }
        if (!isFinded) {
          tbody.innerHTML = "";
          if (inputSearch.value === "") {
            this.#urlSort = "";
            this.#urlFilter = "";
            this.#currentPage = 1;
            this._createUI(1);
          }
        }
      })
      .catch((err) => console.error(err.message));
  };

  _handleSort(e) {
    const clicked = e.target;
    if (clicked.classList.contains("fas")) {
      clicked.classList.toggle("fa-caret-up");
      clicked.classList.toggle("fa-caret-down");
      const tHead = clicked.closest("th");
      this.#field = tHead.dataset.col;
      this.#sort = tHead.dataset.sort;
      let url;
      if (this.#urlFilter) url = `${this.#urlFilter}&`;
      else url = `${this.#urlServer}`;
      axios
        .get(
          `${url}_sort=${this.#field}&_order=${this.#sort}&_page=${
            this.#currentPage
          }&_limit=${this.#paginationLimit}`
        )
        .then((res) => {
          this.#urlSort = res.config.url;
          tHead.dataset.sort = this.#sort === "desc" ? "asc" : "desc";
          this._renderData(res.data);
        })
        .catch((err) => console.error(err.message));
    }
  }

  _handlePagination(e) {
    const clicked = e.target;
    if (clicked.classList.contains("pagination-number")) {
      this.#currentPage = +clicked.getAttribute("page-index");
    }
    if (clicked.id === "next-button") this.#currentPage += 1;
    if (clicked.id === "prev-button") this.#currentPage -= 1;
    if (this.#currentPage !== 1) {
      this._enableButton(prevBtn);
      if (this.#currentPage === this.#numberPagination)
        this._disableButton(nextBtn);
      else this._enableButton(nextBtn);
    } else {
      this._disableButton(prevBtn);
      this._enableButton(nextBtn);
    }
    this._showDataLoaded(this.#currentPage);
    this._handleActivePageNumber();
  }
}

const app = new App();
