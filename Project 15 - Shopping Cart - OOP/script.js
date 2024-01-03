// declare/assign variables for DOM elements
// containers
const cartContainer = document.getElementById('cart-container');
const productsContainer = document.getElementById('products-container');
const dessertCards = document.getElementById('dessert-card-container');
// buttons
const cartBtn = document.getElementById('cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const showHideCartSpan = document.getElementById('show-hide-cart');
// cart <p>
const totalNumberOfItems = document.getElementById('total-items');
const cartSubTotal = document.getElementById('subtotal');
const cartTaxes = document.getElementById('taxes');
const cartTotal = document.getElementById('total');
//------------------
// variables
let isCartShowing = false;
const products = [
	{
		id: 1,
		name: 'Vanilla Cupcakes (6 Pack)',
		price: 12.99,
		category: 'Cupcake',
	},
	{
		id: 2,
		name: 'French Macaroon',
		price: 3.99,
		category: 'Macaroon',
	},
	{
		id: 3,
		name: 'Pumpkin Cupcake',
		price: 3.99,
		category: 'Cupcake',
	},
	{
		id: 4,
		name: 'Chocolate Cupcake',
		price: 5.99,
		category: 'Cupcake',
	},
	{
		id: 5,
		name: 'Chocolate Pretzels (4 Pack)',
		price: 10.99,
		category: 'Pretzel',
	},
	{
		id: 6,
		name: 'Strawberry Ice Cream',
		price: 2.99,
		category: 'Ice Cream',
	},
	{
		id: 7,
		name: 'Chocolate Macaroons (4 Pack)',
		price: 9.99,
		category: 'Macaroon',
	},
	{
		id: 8,
		name: 'Strawberry Pretzel',
		price: 4.99,
		category: 'Pretzel',
	},
	{
		id: 9,
		name: 'Butter Pecan Ice Cream',
		price: 2.99,
		category: 'Ice Cream',
	},
	{
		id: 10,
		name: 'Rocky Road Ice Cream',
		price: 2.99,
		category: 'Ice Cream',
	},
	{
		id: 11,
		name: 'Vanilla Macaroons (5 Pack)',
		price: 11.99,
		category: 'Macaroon',
	},
	{
		id: 12,
		name: 'Lemon Cupcakes (4 Pack)',
		price: 12.99,
		category: 'Cupcake',
	},
];
//array method to insert products into HTM (UI) dynamically using the list
products.forEach(({ name, id, price, category }) => {
	dessertCards.innerHTML += `
    <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
        id="${id}" 
        class="btn add-to-cart-btn">Add to cart
        </button>
    </div>
    `;
});
//----------------------------------------------
class ShoppingCart {
	constructor() {
		this.items = [];
		this.total = 0;
		this.taxRate = 8.25;
	}
	//1.
	addItem(id, products) {
		const product = products.find((item) => item.id === id);
		const { name, price } = product;
		this.items.push(product);
		const totalCountPerProduct = {};
		this.items.forEach((dessert) => {
			totalCountPerProduct[dessert.id] =
				(totalCountPerProduct[dessert.id] || 0) + 1;
		});
		const currentProductCount = totalCountPerProduct[product.id];
		//check if a product has already been added to the user's cart - there will be a matching element:
		const currentProductCountSpan = document.getElementById(
			`product-count-for-id${product.id}`,
		);
		// behaviour of the addItem method needs to change if the product is already in the cart
		currentProductCount > 1
			? (currentProductCountSpan.textContent = `${currentProductCount}x`)
			: (productsContainer.innerHTML += `
			<div class='product' id='dessert${id}'>
			<p>
				<span class='product-count' id='product-count-for-id${id}'>${name}</span>
			</p>
			<p>${price}</p>
			</div>
			`);
	}
	//2. access total # of items in cart (items array)
	getCounts() {
		return this.items.length;
	}
	//3. update total price of the cart when item is added
	calculateTotal() {
		const subTotal = this.items.reduce((total, item) => total + item.price, 0);
		const tax = this.calculateTaxes(subTotal);
		this.total = subTotal + tax;
		//update HTML cart subtotal, tax and total being display
		cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
		cartTaxes.textContent = `$${tax.toFixed(2)}`;
		cartTotal.textContent = `$${this.total.toFixed(2)}`;
		return this.total;
	}
	//4. calculate tax to include in total cost -*note on .toFixed()* -->returns string so we can use decimal numbers--> parseFloat() back to number
	calculateTaxes(amount) {
		return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
	}
	//5. clear cart
	//note - Browsers have a built-in confirm() function which displays a confirmation prompt to the user. confirm() accepts a string, which is the message displayed to the user. It returns true if the user confirms, and false if the user cancels.
	clearCart() {
		if (!this.items.length) {
			alert('Your shopping cart is already empty');
			return;
		}
		const isCartCleared = confirm(
			'Are you sure you want to clear all items from your shopping cart?',
		);
		if (isCartCleared) {
			this.items = [];
			this.total = 0;
			productsContainer.innerHTML = '';
			totalNumberOfItems.textContent = 0;
			cartSubTotal.textContent = 0;
			cartTaxes.textContent = 0;
			cartTotal.textContent = 0;
		}
	}
}

//instantiate ShoppingCart object
const cart = new ShoppingCart();
//et all of the Add to cart buttons that you added to the DOM earlier (products.forEach....)
const addToCartBtns = document.getElementsByClassName('add-to-cart-btn'); //returns HTML collection --> change into array to iterate over
[...addToCartBtns].forEach((btn) => {
	btn.addEventListener('click', (event) => {
		cart.addItem(Number(event.target.id), products);
		totalNumberOfItems.textContent = cart.getCounts();
		cart.calculateTotal();
	});
});
//eventListener to change visibility of the cart so it displays on the page
cartBtn.addEventListener('click', () => {
	isCartShowing = !isCartShowing;
	showHideCartSpan.textContent = isCartShowing ? 'Hide' : 'Show';
	cartContainer.style.display = isCartShowing ? 'block' : 'none';
});
//note: need to use bind to set context of 'this to cart object NOT the clearCartBtn
clearCartBtn.addEventListener('click', cart.clearCart.bind(cart));
//------------------------------------------------
//NOTES
//In JavaScript, a class is like a blueprint for creating objects. It allows you to define a set of properties and methods, and instantiate (or create) new objects with those properties and methods.
//--class constructor method is called when a new instance of the class is created. The constructor method used to initialize properties of the class - use the this keyword (refers to current object) to set the properties of the object being instantiated
//-*note on .toFixed()*
//Because of the way computers store and work with numbers, calculations involving decimal numbers can result in some strange behavior. For example, 0.1 + 0.2 is not equal to 0.3. This is because computers store decimal numbers as binary fractions, and some binary fractions cannot be represented exactly as decimal fractions. .toFixed(#) will round the number to # decimal places and return a string. HOWEVER since you get a string and want to work with numbers you need to convert it back with parseFloat(), preserving the existing decimal place.
