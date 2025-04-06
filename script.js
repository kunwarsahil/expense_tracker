const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const chartCanvas = document.getElementById('expense-chart');

let expenses = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!title || isNaN(amount)) return;

  expenses.push({ title, amount });
  titleInput.value = '';
  amountInput.value = '';

  renderExpenses();
  renderChart();
});

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.textContent = `${expense.title} - ₹${expense.amount}`;
    expenseList.appendChild(li);
  });
}

function renderChart() {
  const labels = expenses.map(e => e.title);
  const data = expenses.map(e => e.amount);

  if (window.expenseChart) window.expenseChart.destroy();

  window.expenseChart = new Chart(chartCanvas, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Expenses',
        data,
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffcd56',
          '#4bc0c0',
          '#9966ff',
          '#ff9f40'
        ],
      }]
    }
  });
}