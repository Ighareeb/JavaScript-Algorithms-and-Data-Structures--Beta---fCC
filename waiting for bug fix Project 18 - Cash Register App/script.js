// declare/assign variables for DOM elements
const cashReceived = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
const totalPriceScreen = document.getElementById('price-screen');
const cashInRegisterEl = document.getElementById('cash-drawer-display');
const cashOutRegisterEl_pTags = Array.from(
	cashInRegisterEl.querySelectorAll('p'),
).slice(1);
// App variables
//
const checkCashRegister = (price, cash cid) => {

	let currencyUnit = {
		'PENNY': 0.01,
		'NICKEL': 0.05,
		'DIME': 0.1,
		'QUARTER': 0.25,
		'ONE': 1,
		'FIVE': 5,
		'TEN': 10,
		'TWENTY': 20,
		'ONE HUNDRED': 100,
	}
	let changeDue = cash - price;
	let totalCID = cid.reduce((acc, curr) => sum + current[1], 0).toFixed(2);
	
}


