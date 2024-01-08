let price = 3.26;
let cid = [
	['PENNY', 1.01],
	['NICKEL', 2.05],
	['DIME', 3.1],
	['QUARTER', 4.25],
	['ONE', 90],
	['FIVE', 55],
	['TEN', 20],
	['TWENTY', 60],
	['ONE HUNDRED', 100],
];

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

const formatResults = (status, change) => {
	displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
	change.map(
		(money) =>
			(displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`),
	);
	return;
};

const checkCashRegister = () => {
	if (Number(cash.value) < price) {
		alert('Customer does not have enough money to purchase the item');
		cash.value = '';
		return;
	}

	if (Number(cash.value) === price) {
		displayChangeDue.innerHTML =
			'<p>No change due - customer paid with exact cash</p>';
		cash.value = '';
		return;
	}

	let changeDue = Number(cash.value) - price;
	let reversedCid = [...cid].reverse();
	let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
	let result = { status: 'OPEN', change: [] };
	let totalCID = parseFloat(
		cid
			.map((total) => total[1])
			.reduce((prev, curr) => prev + curr)
			.toFixed(2),
	);

	if (totalCID < changeDue) {
		return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
	}

	if (totalCID === changeDue) {
		formatResults('CLOSED', cid);
	}

	for (let i = 0; i <= reversedCid.length; i++) {
		if (changeDue > denominations[i] && changeDue > 0) {
			let count = 0;
			let total = reversedCid[i][1];
			while (total > 0 && changeDue >= denominations[i]) {
				total -= denominations[i];
				changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
				count++;
			}
			result.change.push([reversedCid[i][0], count * denominations[i]]);
		}
	}
	if (changeDue > 0) {
		return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
	}

	formatResults(result.status, result.change);
	updateUI(result.change);
};

const checkResults = () => {
	if (!cash.value) {
		return;
	}
	checkCashRegister();
};

const updateUI = (change) => {
	const currencyNameMap = {
		PENNY: 'Pennies',
		NICKEL: 'Nickels',
		DIME: 'Dimes',
		QUARTER: 'Quarters',
		ONE: 'Ones',
		FIVE: 'Fives',
		TEN: 'Tens',
		TWENTY: 'Twenties',
		'ONE HUNDRED': 'Hundreds',
	};
	// Update cid if change is passed in
	if (change) {
		change.forEach((changeArr) => {
			const targetArr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
			targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
		});
	}

	cash.value = '';
	priceScreen.textContent = `Total: $${price}`;
	cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
			.map((money) => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
			.join('')}  
  `;
};

purchaseBtn.addEventListener('click', checkResults);

cash.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkResults();
	}
});

updateUI();

// // declare/assign variables for DOM elements
// const cashReceived = document.getElementById('cash');
// const purchaseBtn = document.getElementById('purchase-btn');
// const changeDue = document.getElementById('change-due');
// const totalPriceScreen = document.getElementById('price-screen');
// const cashInRegisterEl = document.getElementById('cash-drawer-display');
// const cashOutRegisterEl_pTags = Array.from(
// 	cashInRegisterEl.querySelectorAll('p'),
// ).slice(1);
// // App variables
// let price = 0.0;
// let cash = 0.0;
// let cid = [
// 	['PENNY', 0.01],
// 	['NICKEL', 0.05],
// 	['DIME', 0.1],
// 	['QUARTER', 0.25],
// 	['ONE', 1],
// 	['FIVE', 5],
// 	['TEN', 10],
// 	['TWENTY', 20],
// 	['ONE HUNDRED', 100],
// ];
// purchaseBtn.addEventListener('click', () => {
//     let cashValue = parseFloat(cashReceived.value);
//     let change = cashValue - price;

//     if (cashValue < price) {
//         alert('Customer does not have enough money to purchase the item');
//     } else if (cashValue === price) {
//         changeDue.textContent = 'No change due - customer paid with exact cash';
//     } else {
//         let totalCashInDrawer = cid.reduce((total, [_, value]) => total + value, 0);

//         if (totalCashInDrawer < change) {
//             changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';
//         } else if (totalCashInDrawer === change) {
//             changeDue.textContent = 'Status: CLOSED';
//         } else {
//             let changeDueText = 'Status: OPEN ';
//             cid.reverse().forEach(([currency, value]) => {
//                 let count = Math.floor(change / value);
//                 if (count > 0) {
//                     changeDueText += `${currency}: $${(count * value).toFixed(2)} `;
//                     change -= count * value;
//                 }
//             });
//             changeDue.textContent = changeDueText;
//         }
//     }
// });
