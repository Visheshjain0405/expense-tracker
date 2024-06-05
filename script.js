document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    let expenses = [];

    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

        if (expenseName && expenseAmount) {
            const expense = {
                name: expenseName,
                amount: expenseAmount,
                id: new Date().getTime()
            };

            expenses.push(expense);
            addExpenseToDOM(expense);
            updateTotal();
            expenseForm.reset();
        }
    });

    function addExpenseToDOM(expense) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - ₹${expense.amount.toFixed(2)}
            <button onclick="removeExpense(${expense.id})">X</button>
        `;
        li.setAttribute('data-id', expense.id);
        expenseList.appendChild(li);
    }

    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    window.removeExpense = function (id) {
        expenses = expenses.filter(expense => expense.id !== id);
        document.querySelector(`[data-id='${id}']`).remove();
        updateTotal();
    };
});
