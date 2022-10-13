const orderWindow = document.querySelector(".basket-body");
const basketBody = document.querySelector(".basket-body");
const formOrder = document.querySelector(".order-data");
let basket = JSON.parse(localStorage.getItem("basket"));
let productInfo = JSON.parse(localStorage.getItem("preorder"));
let countBasket = document.querySelector(".basket-count");
let fillPrice = {
  hunny: 230,
  hunnyCherry: 230,
  bananBiskvit: 230,
  biskvit: 230,
  napoleon: 150,
  biskvitCherry: 230,
  cheezcake: 230,
  teramisu: 230,
  redBarhat: 230,
  yourChange: 230,
};
empty();

countBasket.innerHTML = basket.length;

const bildBasketHTML = `<div class="cart-wrapper" id="${productInfo.id}">
<img src="${productInfo.img}" alt="${productInfo.title}" class="order-img" />
 <button class="remove-button" data-value="">x</button>
  <div class="order-title">${productInfo.title}</div>
  <div class="cart-filling">
  <label for="filling" class="filling-order">Начинки:</label><br>
  <select id="filling" required>
    <option class="filling" value="hunny">Медові коржі з вершковим кремом</option>
    <option class="filling" value="hunnyCherry">Медові коржі з вершковим кремом та вишнею</option>
    <option class="filling" value="bananBiskvit">Бісквіт з вершковим кремом, ананасом та/чи бананом</option>
    <option class="filling" value="biskvit">Бісквіт з вершковим кремом</option>
    <option class="filling" value="napoleon">Наполеон</option>
    <option class="filling" value="biskvitCherry">Бісквіт з вишнею</option>
    <option class="filling" value="teramisu">Терамісу</option>
    <option class="filling" value="redBarhat">Червоний бархат</option>
    <option class="filling" value="yourChange">ваш варіант</option>
  </select>
</div>
<div class="cart-weight">
  <label for="weight" class="">Вага:</label><br>
  <select id="weight" required class="weight-order">
    <option class="weight-li" value="1">1</option>
    <option class="weight-li" value="1.5">1.5</option>
    <option class="weight-li" value="2">2</option>
    <option class="weight-li" value="2.5">2.5</option>
    <option class="weight-li" value="3">3</option>
    <option class="weight-li" value="3.5">3.5</option>
    <option class="weight-li" value="4">4</option>
    <option class="weight-li" value="4.5">4.5</option>
    <option class="weight-li" value="5">5</option>
    <option class="weight-li" value="5.5">5.5</option>
    <option class="weight-li" value="6">6</option>
    <option class="weight-li" value="6.5">6.5</option>
    <option class="weight-li" value="7">7</option>
  </select>
</div>
<div class="price">
  <label for="price">Ціна</label><br>
  <input type="text" id="price" class="price-order" value="">
</div>
</div>`;
orderWindow.insertAdjacentHTML("beforeend", bildBasketHTML);
const selects = document.querySelectorAll(".weight-li");
//Виконуємо цикл за всіма елементами списку та обнуляємо ті, які не задовільняють запросу
for (i = 0; i < selects.length; i++) {
  let txtValue = selects[i].innerText;
  /* беремо ліміт з об'єкту productInfo значення ключів weightLimitLow нижня границя ваги
  weightLimitHi - верхня границя ваги торту*/
  if (
    txtValue >= productInfo.weightLimitLow &&
    txtValue <= productInfo.weightLimitHi
  ) {
  } else {
    //встановлюемо додатковий атрибут селктам, які не підходять
    selects[i].style.display = "none";
  }
}

//поява чи  зникнення пустої корзини
function empty() {
  if (basketBody.children.length == 0) {
    document.querySelector(".empty").style.display = "block";
    formOrder.style.display = "none";
  } else {
    document.querySelector(".empty").style.display = "none";
    formOrder.style.display = "grid";
  }
}
empty();

//Рахунок ціни через начинку та вагу
let fullPrice;
let price = document.querySelector("#price");

let selectedFilling;
let fillings = document.querySelector("#filling");
fillings.onchange = function () {
  selectedFilling = this.value;
  for (let key in fillPrice) {
    if (selectedFilling === key) {
      fullPrice = fillPrice[key];
      price.value = fullPrice;
    }
  }
};

let selectedWeight;
let weight = document.querySelector("#weight");
weight.onchange = function () {
  selectedWeight = weight.value;
  price.value = fullPrice * selectedWeight;
};

//видалення товару з корзини
document.addEventListener("click", function (event) {
  if (event.target.className === "remove-button") {
    event.target.closest(".cart-wrapper").remove();
    localStorage.removeItem("preorder");
    empty();
  }
});

//записуємо всі дані замовника в зміну inputs
let [...allInputs] = document.querySelectorAll(".formInput");

let inputs = allInputs.map((element) => {
  return element;
});

//Створюємо об`єкт для зберігання
class Order {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

// Перевіряємо форму заповнення
const validate = (target) => {
  switch (target.name) {
    case "name":
      return /^[A-zА-я_ ]{2,}$/i.test(target.value);
    case "phone":
      return /^\+380\d{9}$/.test(target.value);
    case "email":
      return /^[a-z._]+@[a-z._]+\.[a-z._]{1,7}$/i.test(target.value);
    default:
      throw new Error("Error");
  }
};
// на всі елементи масиву inputs вішаємо подію change та передаємо їх в функцію перевірки validate
inputs.forEach((el) => {
  el.addEventListener("change", (event) => {
    validate(event.target);
  });
});

localStorage.order = JSON.stringify([]);
let btnSubmit = document.querySelector("[type=button]");
// на подію click перебираємо перевірені елементи масиву
btnSubmit.addEventListener("click", (e) => {
  let validateRez = inputs.map((element) => {
    return validate(element);
  });
  // перевіряємо, чи є помилка (false)
  if (!validateRez.includes(false)) {
    // якщо помилки в введених данних немає, то дані записуємо в localStorage
    let orderInfo = JSON.parse(localStorage.order);
    orderInfo.push(
      new Order(
        ...inputs.map((element) => {
          return element.value;
        })
      )
    );
    //додаемо до заказу зображення, начинку та вагу обраного торта
    orderInfo.push(
      productInfo.img,
      selectedFilling,
      selectedWeight,
      price.value
    );
    localStorage.order = JSON.stringify(orderInfo);
    document.location = "../../thank-you.html";
    document.querySelector(".cart-wrapper").remove();
    empty();
  } else if (validateRez.includes(false)) {
    e.target.style.background = "#bb2977";
    e.target.value = "Перевірте данні і натисність ще раз";
  }
});

// реалізуємо функцію очищення даних в формі по кнопці reset
let reset = document.querySelector("[type=reset]");
reset.addEventListener("click", () => {
  inputs.forEach((element) => (element.value = ""));
  let a = document.querySelector("[type=button]");
  a.value = "Оформити";
});
