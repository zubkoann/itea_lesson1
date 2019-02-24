document.addEventListener('DOMContentLoaded', () => {
  const item = document.querySelectorAll('.item');
  const addCompany = document.getElementById('addCompany');
  const addEmployee = document.getElementById('addEmployee');

  let compareBalance = (a, b) => {
    if (a.balance < b.balance) return -1;
    if (a.balance > b.balance) return 1;
    return 0;
  }
  let compareDate = (a, b) => {
    let dateA = new Date(a.registered), dateB = new Date(b.registered)
    return dateA - dateB
  }

  let appendTable = function (arr) {
    addCompany.innerHTML = '';
    arr.map((item, i) => {
      addCompany.innerHTML += `<tr><td>${item.company}</td>
                                             <td>${item.balance}</td>
                                             <td>${item.registered}</td>
                                             <td>${item.address.zip},${item.address.state}, ${item.address.country}, ${item.address.city}, ${item.address.street}, ${item.address.house}</td>
                                             <td>${item.employers.length}</td>
                                             <td ><a class="employees" data-id="${item._id}" href="#">Показать сотрудников</a></td>
                                             </tr>`
    });
  }
  let appendTableEmployees = function (arr) {
    addEmployee.innerHTML = '';
    arr.map((item, i) => {
      addEmployee.innerHTML += `<tr><td>${item.name}</td>
                                             <td>${item.age}</td>
                                             <td>${item.emails}</td>
                                             <td>${item.gender}</td>
                                             </tr>`
    });
  }
  let table = function (sortType) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2', true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        try {
          let data = JSON.parse(xhr.responseText);
          if (!sortType) appendTable(data);
          if (sortType == 'date') {
            let arr = data.sort(compareDate);
            appendTable(arr);
          }
          if (sortType == 'balance') {
            let arr = data.sort(compareBalance);
            appendTable(arr);
          }
        } catch (e) {
          alert("Некорректный ответ " + e.message);
        }
      }
    }
  };

  let employees = function (companyID) {
    fetch('http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2')
        .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
              }
              response.json().then(function (data) {
                let arr = data.filter( (item) =>  item._id== companyID );
                let employers=arr[0].employers;
                appendTableEmployees(employers);
              });
            }
        )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
  }
 // employees();

  document.addEventListener('click', (e) => {
    let _this = e.target;
    if (_this.matches('.menuelem')) {
      let menuTarget = _this.getAttribute('data-target');
      item.forEach(el => el.classList.remove("active"));
      let idelem = document.getElementById(menuTarget);
      idelem.classList.add("active");
    }
    // 1.3. Реализация функции поиска по массиву ITEA_COURSES.
    if (_this.matches('#search')) {
      const searchResult = document.getElementById("searchResult");
      let searchTextInput = document.getElementById("searchText");
      let searchText = searchTextInput.value;
      let compare = ITEA_COURSES.some(
          item => {
            return item.toLowerCase() === searchText.toLowerCase();
          }
      );
      (compare) ? searchResult.innerHTML = "ЕСТЬ в массиве" : searchResult.innerHTML = "НЕТ в массиве";
      searchTextInput.value = "";
    }


    // TASK2.
    if (!addCompany.childElementCount) table(sortType = false);
    if (_this.matches('#dateReg')) table(sortType = 'date');
    if (_this.matches('#balance')) table(sortType = 'balance');
    if (_this.matches('.back')) {
      item.forEach(el => el.classList.remove("active"));
      document.getElementById('task2').classList.add("active");
    }
    if (_this.matches('.employees')){
      let employeeID = _this.getAttribute('data-id');
      const task21 = document.getElementById('task21')
      item.forEach(el => el.classList.remove("active"));
      task21.classList.add("active");
      employees(employeeID);
    }
  })

//

  const ITEA_COURSES = ["Курс HTML & CSS", "JavaScript базовый курс", "JavaScript продвинутый курс", "JavaScript Professional", "Angular 2.4 (базовый)", "Angular 2.4 (продвинутый)", "React.js", "React Native", "Node.js", "Vue.js"];
// 1.1 При помощи методов изложеных в arrays.js , переформатировать ITEA_COURSES в массив который содержит длину строк каждого из элементов.
  const stringLengthUl = document.getElementById("stringLength");
  const StringLength = item => item.length;
  let filtredArray = ITEA_COURSES.map(StringLength);
  filtredArray.map((item, i) => {
    stringLengthUl.innerHTML += `<li>${item}</li>`
  });

// 1.2Самостоятельно изучить метод Array.sort. Отфильтровать массив ITEA_COURSES по алфавиту.
  const compareIncrease = (a, b) => {
    let aL = a.toLowerCase();
    let bL = b.toLowerCase();
    if (aL < bL) return -1;
    if (aL > bL) return 1;
    return 0;
  }
  let sorted = ITEA_COURSES.sort(compareIncrease);
  const sortedList = document.getElementById("sorted");
  sorted.map((item, i) => {
    sortedList.innerHTML += `<li>${item}</li>`
  });
})






