let expenses = [];

function addExpense() {
  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');
  const numPeopleInput = document.getElementById('num-people');
  const namesInput = document.getElementById('names');

  const expenseName = nameInput.value;
  const expenseAmount = parseFloat(amountInput.value);
  const numPeople = parseInt(numPeopleInput.value);
  const names = namesInput.value.split(',').map(name => name.trim());

  if (expenseName && expenseAmount && expenseAmount > 0 && numPeople && numPeople > 0 && names.length > 0) {
    expenses.push({ name: expenseName, amount: expenseAmount, numPeople: numPeople, names: names });
    updateExpensesTable();
    updateTotalAmount();
    nameInput.value = '';
    amountInput.value = '';
    numPeopleInput.value = '';
    namesInput.value = '';
  } else {
    alert('Please enter valid expense details.');
  }
}

function updateExpensesTable() {
  const expensesTable = document.getElementById('expenses-table');
  const expensesList = document.getElementById('expenses-list');
  expensesList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const newRow = expensesList.insertRow();
    const expenseNameCell = newRow.insertCell();
    const expenseAmountCell = newRow.insertCell();
    const numPeopleCell = newRow.insertCell();
    const namesCell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    expenseNameCell.textContent = expense.name;
    expenseAmountCell.textContent = `${(expense.amount / expense.numPeople).toFixed(2)} per person (${expense.amount.toFixed(2)} total)`;
    numPeopleCell.textContent = expense.numPeople;
    namesCell.textContent = expense.names.join(', ');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.style.backgroundColor="black";
    deleteButton.style.borderColor="black";
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
      expenses.splice(index, 1);
      updateExpensesTable();
      updateTotalAmount();
    });

    actionCell.appendChild(deleteButton);
  });
}

function updateTotalAmount() {
  const totalAmountSpan = document.getElementById('total-amount');
  let totalAmount = 0;

  expenses.forEach(expense => {
    totalAmount += expense.amount;
  });

  totalAmountSpan.textContent = totalAmount.toFixed(2);
}

