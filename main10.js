// Constructor Function
function Record(name, roll, cgpa){
    this.fullName = name;
    this.rollNo = roll;
    this.grade = parseFloat(cgpa);
}

// Storage handler
const Store = {
    key: "recordDB",
    getData() {
        return JSON.parse(localStorage.getItem(this.key) || "[]");
    },
    saveData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },
    clearData() {
        localStorage.removeItem(this.key);
    }
};

let records = Store.getData();

// Elements
const tbody = document.getElementById("recordBody");
const searchBar = document.getElementById("searchBar");
const sorter = document.getElementById("sorter");
const topHighlight = document.getElementById("topHighlight");
const wipeAll = document.getElementById("wipeAll");

// Form elements
const form = document.getElementById("recordForm");
const nameInput = document.getElementById("stdName");
const rollInput = document.getElementById("stdRoll");
const cgpaInput = document.getElementById("stdCgpa");
const editIndex = document.getElementById("editIndex");
const formHeading = document.getElementById("form-heading");

// Render Function
function displayRecords(){
    let data = [...records];

    // Search filter
    const q = searchBar.value.toLowerCase();
    if (q) {
        data = data.filter(r =>
            r.fullName.toLowerCase().includes(q) ||
            r.rollNo.toLowerCase().includes(q)
        );
    }

    // Sorting
    switch(sorter.value){
        case "nameAsc": data.sort((a,b)=> a.fullName.localeCompare(b.fullName)); break;
        case "nameDesc": data.sort((a,b)=> b.fullName.localeCompare(a.fullName)); break;
        case "cgpaHigh": data.sort((a,b)=> b.grade - a.grade); break;
        case "cgpaLow": data.sort((a,b)=> a.grade - b.grade); break;
    }

    tbody.innerHTML = "";

    data.forEach((r, i) => {
        const tr = document.createElement("tr");

        if (topHighlight.checked && r.grade >= 3.5)
            tr.classList.add("highlight");

        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${r.fullName}</td>
            <td>${r.rollNo}</td>
            <td>${r.grade.toFixed(2)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editRecord(${i})">Edit</button>
                <button class="action-btn del-btn" onclick="deleteRecord(${i})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Add / Update Handler
form.addEventListener("submit", e => {
    e.preventDefault();

    const newRec = new Record(
        nameInput.value,
        rollInput.value,
        cgpaInput.value
    );

    if (editIndex.value === "") {
        records.push(newRec);
    } else {
        records[editIndex.value] = newRec;
        editIndex.value = "";
        formHeading.textContent = "Create Student Record";
    }

    Store.saveData(records);
    form.reset();
    displayRecords();
});

// Edit Record Function
function editRecord(i){
    const r = records[i];
    nameInput.value = r.fullName;
    rollInput.value = r.rollNo;
    cgpaInput.value = r.grade;
    editIndex.value = i;

    formHeading.textContent = "Update Student Record";

    window.scrollTo({top:0, behavior:"smooth"});
}

// Delete Record Function
function deleteRecord(i){
    if (confirm("Remove this record?")){
        records.splice(i,1);
        Store.saveData(records);
        displayRecords();
    }
}

// Clear All
wipeAll.addEventListener("click", ()=>{
    if (confirm("Clear all stored data?")){
        records = [];
        Store.clearData();
        displayRecords();
    }
});

// Filters
searchBar.addEventListener("input", displayRecords);
sorter.addEventListener("change", displayRecords);
topHighlight.addEventListener("change", displayRecords);

displayRecords();
