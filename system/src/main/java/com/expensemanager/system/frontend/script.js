// ============================
// DATA
// ============================

function loadSummary(){
    fetch("http://localhost:8080/transactions/balance")
        .then(response=>response.json())
        .then(data=>{
            updateSummary(data);
        })
}

function loadTransactions(filter) {
    const params =new URLSearchParams();
    if(filter.keyword.trim()){
        params.append("keyword",filter.keyword);
    }
    if(filter.type){
        params.append("type",filter.type);
    }
    if(filter.category){
        params.append("category",filter.category);
    }

    fetch(`http://localhost:8080/transactions?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderTransactions(data);
        })
        .catch(error => {
            console.error(error);
        });
}
// let transactions = [ { id: 1, title: "Salary", category: "Job", amount: 40000, type: "INCOME" }, { id: 2, title: "Pizza", category: "Food", amount: 500, type: "EXPENSE" }, { id: 3, title: "Movie", category: "Entertainment", amount: 300, type: "EXPENSE" } ];

let deleteId = null;

// ============================
// TAB ELEMENTS
// ============================

const dashboardTab = document.getElementById("dashboard-tab");
const transactionsTab = document.getElementById("transactions-tab");
const reportsTab = document.getElementById("reports-tab");
const settingsTab = document.getElementById("settings-tab");

const dashboardSection = document.getElementById("dashboard-section");
const transactionsSection = document.getElementById("transactions-section");
const reportsSection = document.getElementById("reports-section");
const settingsSection = document.getElementById("settings-section");

// ============================
// SUMMARY ELEMENTS
// ============================

const balanceAmount = document.getElementById("balanceAmount");
const incomeAmount = document.getElementById("incomeAmount");
const expenseAmount = document.getElementById("expenseAmount");
const transactionCount = document.getElementById("transactionCount");
const recentActivity = document.getElementById("recentActivity");

// ============================
// TABLE
// ============================

const transactionTable = document.getElementById("transactionTable");
const searchInput = document.getElementById("searchInput");

//card
const container = document.getElementById("transactionCards");

// ============================
// MODAL
// ============================

const transactionModal = document.getElementById("transactionModal");
const deleteModal = document.getElementById("deleteModal");

const addBtn = document.getElementById("addBtn");
const closeModal = document.getElementById("closeModal");

const transactionForm = document.getElementById("transactionForm");

//filter
const filterBtn = document.getElementById("filterBtn");
const closeFilter = document.getElementById("closeFilter");
const filterModal = document.getElementById("filterModal");
const filterForm = document.getElementById("filterModal");

const filterType = document.getElementById("filterType");
const filterCategory = document.getElementById("filterCategory");
// const filterType = document.getElementById("filterType");
// const filterType = document.getElementById("filterType");


const modalTitle = document.getElementById("modalTitle");

const transactionId = document.getElementById("transactionId");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const descriptionInput = document.getElementById("description");

const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

// ============================
// TAB NAVIGATION
// ============================

function hideAllSections() {

    dashboardSection.style.display = "none";
    transactionsSection.style.display = "none";
    reportsSection.style.display = "none";
    settingsSection.style.display = "none";

}

function removeActiveTabs() {

    dashboardTab.classList.remove("active");
    transactionsTab.classList.remove("active");
    reportsTab.classList.remove("active");
    settingsTab.classList.remove("active");

}

dashboardTab.addEventListener("click", () => {

    hideAllSections();
    removeActiveTabs();

    dashboardSection.style.display = "block";
    dashboardTab.classList.add("active");

});

transactionsTab.addEventListener("click", () => {

    hideAllSections();
    removeActiveTabs();

    transactionsSection.style.display = "block";
    transactionsTab.classList.add("active");

});

reportsTab.addEventListener("click", () => {

    hideAllSections();
    removeActiveTabs();

    reportsSection.style.display = "block";
    reportsTab.classList.add("active");

});

settingsTab.addEventListener("click", () => {

    hideAllSections();
    removeActiveTabs();

    settingsSection.style.display = "block";
    settingsTab.classList.add("active");

});

// ============================
// RENDER TABLE
// ============================

function renderTransactions(data) {
    console.log("Render function called");
    transactionTable.innerHTML = "";
    container.innerHTML = "";


    if (data.length === 0) {

        transactionTable.innerHTML = `
<tr>
<td colspan="5" style="text-align:center;">
    No Transactions Found
</td>
</tr>
`;
        container.innerHTML = `
<tr>
<td colspan="5" style="text-align:center;">
    No Transactions Found
</td>
</tr>
`;

        return;
    }

    for(let i = 0;i<data.length;i++){
        const transaction = data[i];
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.title}</td>
        <td>${transaction.category}</td>
        <td>₹${transaction.amount}</td>
        
        <td class="${
                        transaction.type === "CREDIT"
                            ? "type-credit"
                            : "type-debit"
                    }">
            ${transaction.type}
        </td>
        <td>${transaction.description}</td>

        <td>${transaction.dateTime}</td>
        
        <td>
            <button
                class="action-btn edit-btn"
                onclick="editTransaction(${transaction.id})">
                ✏️
            </button>
        
            <button
                class="action-btn delete-btn"
                onclick="openDeleteModal(${transaction.id})">
                🗑️
            </button>
        </td>
            `;
        transactionTable.appendChild(row);

        const card = document.createElement("div");

        card.className = "transaction-card";

        card.innerHTML = `
<h3> ${transaction.id}. ${transaction.title}</h3>

<div class="transaction-info">
    <span>
        Category: ${transaction.category}
    </span>

    <span>
        Amount: ₹${transaction.amount}
    </span>

    <span>
        Type: ${transaction.type}
    </span>

    <span>
        Description: ${transaction.description}
    </span>

</div>

<div class="transaction-actions">

    <button class="action-btn edit-btn"
        onclick="editTransaction(${transaction.id})">
        ✏️
    </button>

    <button class="action-btn delete-btn"
        onclick="openDeleteModal(${transaction.id})">
        🗑️
    </button>

</div>
`;

        container.appendChild(card);
        console.log(transaction);

    }

}

// ============================
// UPDATE DASHBOARD
// ============================

function updateSummary(data) {

    const transactions = data;
    console.log(transactions);
    balanceAmount.textContent = `₹${transactions.balance}`;
    incomeAmount.textContent = `₹${transactions.totalCredit}`;
    expenseAmount.textContent = `₹${transactions.totalDebit}`;
    transactionCount.textContent = transactions.totalTransactions;

    // if (transactions.totalTransactions.length > 0) {
    //
    //     const latest = transactions[transactions.totalTransactions.length - 1];
    //
    //     recentActivity.innerHTML = `
    //     <strong>${latest.title}</strong>
    //     <br>
    //         ₹${latest.amount}
    //         <br>
    //             ${latest.type}
    //             `;
    //
    // }
    // loadSummary();


}

        // ============================
        // OPEN ADD MODAL
        // ============================

        addBtn.addEventListener("click", () => {

        transactionForm.reset();

        transactionId.value = "";

        modalTitle.textContent = "Add Transaction";

        transactionModal.style.display = "flex";

    });

        // ============================
        // CLOSE MODAL
        // ============================

        closeModal.addEventListener("click", () => {

        transactionModal.style.display = "none";

    });

        // ============================
        // SAVE TRANSACTION
        // ============================

        transactionForm.addEventListener("submit", (e) => {

        e.preventDefault();

            const uploadData = {

                title: titleInput.value.trim(),
                category: categoryInput.value.trim(),
                amount: Number(amountInput.value),
                type: typeInput.value,
                description: descriptionInput.value

            };

            if(transactionId.value) {
                fetch(
                    `http://localhost:8080/transactions/${transactionId.value}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(uploadData)
                    }
                )
                    .then(response => response.text())
                    .then(data => {
                        console.log("Saved:", data);
                        loadTransactions(readfilterValues());
                        loadSummary();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            else{
                fetch(
                    `http://localhost:8080/transactions`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(uploadData)
                    }
                )
                    .then(response => response.text())
                    .then(data => {
                        console.log("Saved:", data);
                        loadTransactions(readfilterValues());
                        loadSummary();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }


            transactionForm.style.display = "none";
            transactionModal.style.display = "none";

            transactionForm.reset();

    });

        // ============================
        // EDIT
        // ============================

        function editTransaction(id) {

            let editId = id;
            fetch("http://localhost:8080/transactions")
                .then(response => response.json())
                .then(data => {
                    getTransactions(data);

                })
                .catch(error => {
                    console.error(error);
                });

            modalTitle.textContent = "Update Transaction";



            function getTransactions(data){

                if (!data) return;

                for(let i = 0; i<data.length;i++){

                    if(data[i].id===editId){

                        const transaction = data[i];
                        transactionId.value = transaction.id;
                        titleInput.value = transaction.title;
                        categoryInput.value = transaction.category;
                        amountInput.value = transaction.amount;
                        typeInput.value = transaction.type;
                        descriptionInput.value = transaction.description;
                    }
                }

                transactionModal.style.display = "flex";
                transactionForm.style.display = "block";


            }


    }

        // ============================
        // DELETE
        // ============================

        function openDeleteModal(id) {

        deleteId = id;


        deleteModal.style.display = "flex";

    }

        confirmDelete.addEventListener("click", () => {

            fetch(
                `http://localhost:8080/transactions/${deleteId}`,
                {
                    method: "DELETE"
                }
            )
                .then(response => response.text())
                .then(data => {
                    console.log("Saved:", data);
                    loadTransactions(readFilterValues());
                    loadSummary();
                })
                .catch(error => {
                    console.error(error);
                });

        deleteModal.style.display = "none";

    });

        cancelDelete.addEventListener("click", () => {

        deleteModal.style.display = "none";

    });

        // ============================
        // CLOSE MODAL ON OUTSIDE CLICK
        // ============================

        window.addEventListener("click", (e) => {

        if (e.target === transactionModal) {
        transactionModal.style.display = "none";
    }

        if (e.target === deleteModal) {
        deleteModal.style.display = "none";
    }

    });

        // ============================
        // ESC KEY
        // ============================

        document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

        transactionModal.style.display = "none";
        deleteModal.style.display = "none";

    }

    });

// ============================
// SEARCH
// ============================
//filter


function readfilterValues(){
    return {
        keyword: searchInput.value.trim(),
        type: filterType.value,
        category: filterCategory.value
    }
}
searchInput.addEventListener("keyup", () => {
    const filters = readfilterValues();
    loadTransactions(filters);
});

filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const filters = readfilterValues();
    loadTransactions(filters);
    filterForm.reset();
    filterModal.style.display = "none";
});




filterBtn.addEventListener("click",()=>{

    filterModal.style.display = "flex";

});

window.addEventListener("click", (e) => {

    if(e.target === transactionModal){
        transactionModal.style.display = "none";
    }
    if(e.target === filterModal){
        filterModal.style.display = "none";
    }

});

console.log(closeFilter);
closeFilter.addEventListener("click", () => {
    filterModal.style.display = "none";

});




//tab change code
document
    .getElementById("mobile-dashboard")
    .addEventListener("click", () => {

        dashboardTab.click();

    });

document
    .getElementById("mobile-transactions")
    .addEventListener("click", () => {

        transactionsTab.click();

    });

document
    .getElementById("mobile-reports")
    .addEventListener("click", () => {

        reportsTab.click();

    });

document
    .getElementById("mobile-settings")
    .addEventListener("click", () => {

        settingsTab.click();

    });



        // ============================
        // INITIAL LOAD
        // ============================
        loadSummary();
loadTransactions(readfilterValues());

