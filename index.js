document.getElementById('generateBtn').addEventListener('click', generate);
document.getElementById('saveBtn').addEventListener('click', saveNote);

let selectedDate;
const notes = getLocalStorage();

function generate() {
    const month = parseInt(document.getElementById('month').value) - 1;
    const year = parseInt(document.getElementById('year').value);
    const scheduleDiv = document.querySelector('.shedule');

    scheduleDiv.innerHTML = '';

    if (isNaN(month) || isNaN(year) || month < 0 || month > 11) {
        scheduleDiv.innerHTML = '<p>Tarix boşdu və ya düzgün daxil etməmisiniz !!</p>';
        return;
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    table.innerHTML = `<tr>${daysOfWeek.map(day => `<th>${day}</th>`).join('')}</tr>`;

    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) row.appendChild(document.createElement('td'));

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('td');
        cell.textContent = day;
        cell.addEventListener('click', () => openPopup(day, month, year));
        if (notes[`${year}-${month + 1}-${day}`]) {
            cell.style.backgroundColor = '#0e41db';
            cell.style.color = '#ffffff';
        }
        row.appendChild(cell);

        if ((firstDay + day) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement('tr');
        }
    }

    if (row.children.length) table.appendChild(row);

    scheduleDiv.appendChild(table);
}

function openPopup(day, month, year) {
    selectedDate = `${year}-${month + 1}-${day}`;
    document.getElementById('noteInput').value = notes[selectedDate] || '';
    document.getElementById('popup').classList.add('active');
}

function saveNote() {
    const note = document.getElementById('noteInput').value;
    if (note) notes[selectedDate] = note;
    else delete notes[selectedDate];

    localStorage.setItem('notes', JSON.stringify(notes));
    document.getElementById('popup').classList.remove('active');
    generate();
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('notes')) || {};
}
