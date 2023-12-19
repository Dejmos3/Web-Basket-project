const buyBtns = [...document.querySelectorAll('[data-name]')];
const basketUl = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');


const basket = new Basket();

const removeItem = event => {
    const id = Number(event.target.dataset.id);
    basket.remove(id);
    createBasketUi();
};

const createBasketUi = () => {
    basketUl.innerText = '';
    for (const oneProductInfo of basket.getBasketSummary()) {
        const newLi = document.createElement('li');
        newLi.innerText = oneProductInfo.text;
        newLi.addEventListener('click', removeItem);
        newLi.dataset.id = oneProductInfo.id;
        basketUl.appendChild(newLi);
    }

    const basketTotalValue = basket.getTotalValue();
    buyAllBtn.innerText = `Złóż zamówienie na kwotę ${basketTotalValue.toFixed(2)}zł.`
    
    if (basketTotalValue > 0) {
    buyAllBtn.disabled = false; // remove attribute disabled
    } else {
        buyAllBtn.disabled = true;
    }
    // easy way - remove attribute disabled
    // buyAllBtn.disabled = basketTotalValue === 0; 
};

const addProductToBasket = event => {
    const name = event.target.dataset.name;
    const price =  Number(event.target.dataset.price);

    const newProduct = new Product(name, price);
    basket.add(newProduct);
    createBasketUi();
};

const buyAllProducts = () => {
    const basketTotalValue = basket.getTotalValue();
    alert(`Zakupiono produkty o wartości ${basketTotalValue.toFixed(2)}`);
    basket.claer();
    createBasketUi();
};

for (const btn of buyBtns) {
    btn.addEventListener('click', addProductToBasket);
}

buyAllBtn.addEventListener('click', buyAllProducts);
