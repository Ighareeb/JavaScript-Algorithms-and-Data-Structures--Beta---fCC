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
	//access total # of items in cart (items array)
	getCounts() {
		return this.items.length;
	}
}

//instantiate ShoppingCart object
const cart = new ShoppingCart();
//et all of the Add to cart buttons that you added to the DOM earlier (products.forEach....)
const addToCartBtns = document.getElementsByClassName('add-to-cart-btn'); //returns HTML collection --> change into array to interate over
[...addToCartBtns].forEach((btn) => {
	btn.addEventListener('click', (event) => {
		cart.addItem(Number(event.target.id), products);
		totalNumberOfItems.textContent = cart.getCounts();
	});
});
//eventListener to change visibility of the cart so it displays on the page
cartBtn.addEventListener('click', () => {
	isCartShowing = !isCartShowing;
	showHideCartSpan.textContent = isCartShowing ? 'Hide' : 'Show';
	cartContainer.style.display = isCartShowing ? 'block' : 'none';
});
//------------------------------------------------
//NOTES
//In JavaScript, a class is like a blueprint for creating objects. It allows you to define a set of properties and methods, and instantiate (or create) new objects with those properties and methods.
//--class constructor method is called when a new instance of the class is created. The constructor method used to initialize properties of the class - use the this keyword (refers to current object) to set the properties of the object being instantiated
