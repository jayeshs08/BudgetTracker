const balance = document.getElementById(
    "currentbal"
  );
  const money_plus = document.getElementById(
    "pluscash"
  );
  const money_minus = document.getElementById(
    "minuscash"
  );

  const list = document.getElementById("list");
  const form = document.getElementById("form");
  const text = document.getElementById("text");
  const amount = document.getElementById("amt");

 // const dummy= [
  // { id: 1, text: "Flower", amount: -20 },
  // { id: 2, text: "Salary", amount: 300 },
  // { id: 3, text: "Book", amount: -10 },
  // { id: 4, text: "Camera", amount: 150 },
  // ];

  // let transactions = dummy;

  //Update the balance income and expence
function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText=`$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
  }

   function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add text and amount')
    }else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }
  //Generate Random ID
function generateID(){
    return Math.floor(Math.random()*1000000000);
  }

   function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
  
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
}



  //Init App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }

  form.addEventListener('submit',addTransaction);

  //Remove Transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }

  //update Local Storage Transaction
function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
