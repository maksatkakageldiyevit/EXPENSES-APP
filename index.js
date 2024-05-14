//создай переменные- строковые константы

const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status__negative';
const STATUS_IN_LIMIT_CLASSNAME = 'status';
const CHANGE_LIMIT_TEXT = "определи новый лимит"
const STORAGE_LABEL_LIMIT = "limit";
const STORAGE_LABEL_EXPENSES = "expenses";
const POPUP_OPENED_CLASSNAME = 'popup__open';


//создай переменные - ссылки на html
const moneyInputNode = document.querySelector('.js-moneyInput__input');
const categorySelectNode = document.querySelector('.js-categorySelectNode');
const addButtonNode = document.querySelector('.js-addButton');
const buttonResetNode = document.querySelector('.js-button_reset');
const sumNode = document.querySelector('.js-sum');
const statusNode = document.querySelector('.js-status');
const historyNode = document.querySelector('.js-history');
const limitNode = document.querySelector('.js-limit'); 
const btnLimitOpenNode = document.querySelector('.js-btn_limit'); 


const popupNode = document.querySelector('.js-popup');
const popupContentNode = document.querySelector('.js-popup__content');
const popupInputNode = document.querySelector('.js-popup__input');
const btnPopupNode = document.querySelector('.js-popup__button');
const btnCloseNode = document.querySelector('.js-popup__close-btn');

let LIMIT = parseInt(limitNode.innerText);

function initLimit() { //вызываем лимит из хранилища
  const limitFromLStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
  if (!limitFromLStorage) {
    return;
  }
  limitNode.innerText = limitFromLStorage;
  LIMIT = parseInt(limitNode.innerText);
}
initLimit();
//получи строку из хранилища
const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
//распарси (преврати строку в объект)
const expensesFromStorage = JSON.parse(expensesFromStorageString);

let expenses = [];
//проверь, что объект является массивом
if (Array.isArray(expensesFromStorage)) {
  expenses = expensesFromStorage;
}

render();

 //...Функции................

function calculateExpenses() {
  let sum = 0;
  expenses.forEach(function (expense) {
    sum += expense.amount;
  }); 
  return sum; 
  }; 

function renderStatus() {
    const total = calculateExpenses(expenses);
     sumNode.innerText = total;    
     if (total <= LIMIT) {
      statusNode.innerText = STATUS_IN_LIMIT;
      statusNode.className = STATUS_IN_LIMIT_CLASSNAME;
      } else {
    statusNode.innerHTML = `${STATUS_OUT_OF_LIMIT} (${LIMIT - total} ${CURRENCY})`;
    statusNode.className = STATUS_OUT_OF_LIMIT_CLASSNAME
  }
   }

function renderHistory() {
    historyNode.innerHTML = "";
    expenses.forEach(function(expense) {
      const historyItem = document.createElement("li");
      historyItem.innerText = `${expense.amount} ${CURRENCY} - ${expense.category}`;
  
      historyNode.appendChild(historyItem);
    }); 
  }

function render() {
    renderStatus();
    renderHistory();  
 }
 
function getexpenseFromUser() {
  return parseInt(moneyInputNode.value);
 }

function getSelectCategory() {
   return categorySelectNode.value;
 }

//  const clearInput = function (input) {
//   input.value = '';

//  }
function clearInput() {
  moneyInputNode.value = '';
  categorySelectNode.value = 'Категория';
  }

function saveExpensesToStorage() {//сохраняем объект в хранилище
    const expensesString = JSON.stringify(expenses); 
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
  }

  function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  }
   function getLimitFromPopup() {
    return popupInputNode.value;
  }

  //......Функции обработчики...........

function addButtonHandler() {
  const currentAmount = getexpenseFromUser();
  if (!currentAmount) {
    alert('пустая строка в поле ввода');
      return;
  }
  const currentCategory = getSelectCategory();
  if (currentCategory === "Категория") {
    alert('выбери категорию расходов');

  return;
   }

  const newExpense = { amount: currentAmount, category: currentCategory};
  expenses.push(newExpense);
  saveExpensesToStorage();
  render();
  clearInput();
 }

function buttonResetHandler() {
  expenses = [];
  render();
  }

// function changeLimitHandler() {
 
//   const limitValue = prompt(CHANGE_LIMIT_TEXT);
//   const limit = parseInt(limitValue);
//   if (!limit) {
//     return;
//   }
//   limitNode.innerText = limit;  //задаем и отображаем лимит
//   LIMIT = limit;

//   localStorage.setItem(STORAGE_LABEL_LIMIT, limit) //записываем в хранилище ключ, значение
//   render();
// }

function newLimitHandler() {
  const limit = getLimitFromPopup();
  if (!limit) {
      return;
  }
  limitNode.innerText = limit;  //задаем и отображаем лимит
  LIMIT = limit;

  localStorage.setItem(STORAGE_LABEL_LIMIT, limit) //записываем в хранилище ключ, значение
  render();
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
}

addButtonNode.addEventListener('click', addButtonHandler); 
buttonResetNode.addEventListener('click', buttonResetHandler);
btnLimitOpenNode.addEventListener('click', togglePopup);
btnCloseNode.addEventListener('click', togglePopup);
btnPopupNode.addEventListener('click', newLimitHandler );



  


