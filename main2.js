window.addEventListener('beforeunload',save);

let accountsTableBody = document.querySelector("#atb");
//let accountsViewBtn = document.querySelector('[href="accounts-view"]');
//let addAccountsViewBtn = document.querySelector('[href="add-account-view"]');
let allLinks = document.querySelectorAll('.nav-link');
let accountsView = document.querySelector('#accounts-view');
let addAccountView = document.querySelector('#add-account-view');
let views = document.querySelectorAll('.view');
let idInput = document.querySelector('[placeholder="#ID"]');
let nameInput = document.querySelector('[placeholder="Name"]');
let lastnameInput = document.querySelector('[placeholder="Lastname"]');
let emailInput = document.querySelector('[placeholder="Email"]');
let phoneInput = document.querySelector('[placeholder="Phone"]');
let saveBtn = document.querySelector('#save');
let eID = document.querySelector('.eID');
let eNAME = document.querySelector('.eNAME');
let eLASTNAME = document.querySelector('.eLASTNAME');
let eEMAIL = document.querySelector('.eEMAIL');
let ePHONE = document.querySelector('.ePHONE');
let editBtn = document.querySelector('#edit')
let id;
editBtn.addEventListener('click',saveEditedAccount);
function saveEditedAccount(){
    const editedAccount = {
        id: eID.value,
        name: eNAME.value,
        lastname: eLASTNAME.value,
        email: eEMAIL.value,
        phone: ePHONE.value
    }
    bd[id] = editedAccount
    createAccountsTable();
    showView("#accounts-view");
}

saveBtn.addEventListener('click',saveAccount);
function saveAccount(){
    const newAccount = {
        id : idInput.value,
        name : nameInput.value,
        lastname : lastnameInput.value,
        email : emailInput.value,
        phone : phoneInput.value,
    };
    bd.push(newAccount);
    idInput.value = "";
    nameInput.value = "";
    lastnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    createAccountsTable();
    showView("#accounts-view");
};

for(let i = 0; i < allLinks.length; i++){
    allLinks[i].addEventListener('click',showView);
}
function showView(e){
    for(let i = 0; i < views.length; i++){
        views[i].style.display = "none";
    }
    
    if(e instanceof Event){
        e.preventDefault(); 
        let id = `#${this.getAttribute('href')}`;
        document.querySelector(id).style.display = "block";
    }else{
        document.querySelector(e).style.display = "block";
    } 
    
    
};
createAccountsTable();
//addAccountsViewBtn.addEventListener('click',function(e){
//    e.preventDefault();
//    addAccountView.style.display = "block";
//    accountsView.style.display = "none";
//});
//accountsViewBtn.addEventListener('click',function(e){
//    e.preventDefault();
//    addAccountView.style.display = "none";
//    accountsView.style.display = "block";
//});


function createAccountsTable(){
    let htmlAccounts = ``;
    for (let i = 0; i < bd.length; i++){
        const account = bd[i];
        htmlAccounts +=
   
    `<tr>
         <td>${account.id}</td>
         <td>${account.name}</td>
         <td>${account.lastname}</td>
         <td>${account.email}</td>
         <td>${account.phone}</td>
        <td><button data-id="${i}" class="edit-btn btn btn-sm btn-warning form-control">Edit</button></td>        <td><button data-id="${i}" class="delete-btn btn btn-sm btn-danger form-control">Delete</button></td>
     </tr>`
    }
    accountsTableBody.innerHTML = htmlAccounts;
    let allDeleteBtn = document.querySelectorAll('.delete-btn');    
    let allEditBtn = document.querySelectorAll('.edit-btn')

    for(let i = 0; i < allDeleteBtn.length; i++) {
        allDeleteBtn[i].addEventListener('click',allDelete);
        allEditBtn[i].addEventListener('click',allEdit);
    }
}

function allDelete(){
    let id = this.getAttribute('data-id');
    bd.splice(id,1);
    createAccountsTable();
    showView("#accounts-view");
}
function allEdit(){
    id = this.getAttribute('data-id');
    let selectedAccount = bd[id];
    eID.value = selectedAccount.id;
    eNAME.value = selectedAccount.name;   
    eLASTNAME.value = selectedAccount.lastname;
    eEMAIL.value = selectedAccount.email;
    ePHONE.value = selectedAccount.phone;
    showView("#edit-account-view");
};

function save(){
    localStorage.bd = JSON.stringify(bd);
}