// functions
function getInput(type) {
  const output = {
    source: "",
    amount: 00,
  };

  if (type == "income") {
    let incomeAmount = document.getElementById("income-amount");
    output.amount = parseFloat(incomeAmount.value);

    let incomeSource = document.getElementById("income-source");
    output.source = incomeSource.value;

    // clear field
    incomeAmount.value = "";
    incomeSource.value = "";
  } else if (type == "spent") {
    let spentAmount = document.getElementById("spent-amount");
    output.amount = parseFloat(spentAmount.value);

    let spentSource = document.getElementById("spent-source");
    output.source = spentSource.value;

    spentAmount.value = "";
    spentSource.value = "";
  }

  return output;
}

function calculateAmount(inputValue, displayValue, callBack) {
  return callBack(inputValue, displayValue);
}

// creat a list
function createNewElement(
  selectorName = "newDiv",
  hasID = false,
  element = "div"
) {
  const elm = document.createElement(element);

  hasID
    ? elm.setAttribute("id", selectorName)
    : elm.setAttribute("class", selectorName);

  return elm;
}

function newSVG() {
  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>`;
}

function creatListItem(title, amount) {
  debugger;
  const div = createNewElement("list");
  const titleDiv = createNewElement("title");
  const amountDiv = createNewElement("amount ml-auto px-4");
  const deleteDiv = createNewElement("delete hover:text-red-500");
  deleteDiv.innerHTML = newSVG();

  titleDiv.innerText = title;
  amountDiv.innerText = amount;

  div.appendChild(titleDiv);
  div.appendChild(titleDiv);
  div.appendChild(amountDiv);
  div.appendChild(deleteDiv);

  return div;
}
/* 





 */
// for income
const incomeBTN = document.getElementById("income-btn");

incomeBTN.addEventListener("click", (e) => {
  const input = getInput("income");

  if (input.amount > 0 && input.source != "") {
    const totalDeposit = document.getElementById("total-income");
    const totalBalance = document.getElementById("total-balance");

    let totalDepositValue = parseFloat(totalDeposit.innerText);
    let totalBalanceValue = parseFloat(totalBalance.innerText);

    totalDepositValue = calculateAmount(
      input.amount,
      totalDepositValue,
      (a, b) => a + b
    );

    totalBalanceValue = calculateAmount(
      input.amount,
      totalBalanceValue,
      (a, b) => a + b
    );

    totalDeposit.innerText = totalDepositValue;
    totalBalance.innerText = totalBalanceValue;

    // update list
    // create list
    const newList = creatListItem(input.source, input.amount);
    newList.classList.add("list-green");
    // append to list
    document.querySelector(".all-item").appendChild(newList);
    console.log(document.querySelector(".all-item"));
  } else {
    alert("You have to enter valid amount and source");
  }
});

// for spent
const spentBTN = document.getElementById("spent-btn");

spentBTN.addEventListener("click", (e) => {
  const input = getInput("spent");

  if (input.amount > 0 && input.source != "") {
    const totalSpent = document.getElementById("total-spent");
    const totalBalance = document.getElementById("total-balance");

    let totalSpentValue = parseFloat(totalSpent.innerText);
    let totalBalanceValue = parseFloat(totalBalance.innerText);

    if (input.amount < totalBalanceValue) {
      totalBalanceValue = calculateAmount(
        input.amount,
        totalBalanceValue,
        (a, b) => b - a
      );

      totalSpentValue = calculateAmount(
        input.amount,
        totalSpentValue,
        (a, b) => a + b
      );
    } else {
      alert("You can't spend more than your balance");
    }

    totalSpent.innerText = totalSpentValue;
    totalBalance.innerText = totalBalanceValue;

    // update list
    // create list
    const newList = creatListItem(input.source, input.amount);
    newList.classList.add("list-red");
    // append to list
    document.querySelector(".all-item").appendChild(newList);
    console.log(document.querySelector(".all-item"));
  } else {
    alert("You have to enter valid amount and source");
  }
});

// new features
const aside = document.getElementsByTagName("aside")[0];

aside.addEventListener("keyup", (e) => {
  if ((e.target.id = "search-Field")) {
    const keyword = e.target.value.toLowerCase().trim();
    const items = aside.querySelectorAll(".list .title");

    Array.from(items).forEach((item) => {
      const title = item.innerText.toLowerCase();

      if (title.indexOf(keyword) == -1) {
        item.parentElement.style.display = "none";
      } else {
        item.parentElement.style.display = "flex";
      }
    });
  }
});

aside.addEventListener("click", (e) => {
  const parent = e.target.parentElement;

  if (parent.className.includes("delete")) {
    const list = parent.parentElement;
    const listContainer = list.parentElement;
    const isConfirm = confirm("Are you sure?");

    isConfirm ? listContainer.removeChild(list) : "";
  }
});
