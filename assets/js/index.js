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

if (localStorage.getItem("basket") == null) {
  localStorage.basket = JSON.stringify([]);
}

let basket = JSON.parse(localStorage.getItem("basket"));
let productInfo = {};
let countBasket = document.querySelector(".basket-count");
countBasket.innerHTML = basket.length;

document.addEventListener("click", function (event) {
  //перевіряємо є елемент кнопкой Замовити чи ні
  if (event.target.dataset.id === "order") {
    //якщо це кнопка пидіймаемося до батьківського діва та збираемо данні
    const order = event.target.closest(".card");
    //Знаходимо данні замовлення
    productInfo = {
      // id батьківського діва
      id: order.dataset.id,
      // зображення замовлення
      img: order.querySelector("img").getAttribute("src"),
      //назва торта записуеться із діва та спанів
      title: order.querySelector(".item-title").innerText,
      //мінімальна вага торта записуеться в спан
      weightLimitLow: order.querySelector(".minWeight").innerText,
      //масимальна вага торта записуеться в спан
      weightLimitHi: order.querySelector(".maxWeight").innerText,
    };

    // додавання кількох замовлень
    let a = JSON.parse(localStorage.basket);
    a.push(productInfo);
    localStorage.basket = JSON.stringify(a);

    //додавання одного торта в корзину
    localStorage.setItem("preorder", JSON.stringify(productInfo));
    basket = JSON.parse(localStorage.getItem("basket"));
    countBasket.innerHTML = basket.length;
  }
});

console.log(productInfo);
