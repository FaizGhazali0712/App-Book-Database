const dataInput = document.getElementById('data-input');
const addBtn = document.getElementById('add-btn');
const dataList = document.getElementById('data-list');

// Ambil dari localStorage atau mulai kosong
let datas = JSON.parse(localStorage.getItem('datas')) || [];

// Simpan ke localStorage
function saveDatas() {
  localStorage.setItem('datas', JSON.stringify(datas));
}

// Render semua data
function renderDatas() {
  dataList.innerHTML = '';

  datas.forEach(data => {
    const li = document.createElement('li');
    li.className = 'data-item';

    li.innerHTML = `
      <span>${data.text}</span>
      <div>
        <button class="edit-btn" data-id="${data.id}">Edit</button>
        <button class="delete-btn" data-id="${data.id}">Hapus</button>
      </div>
    `;

    dataList.appendChild(li);
  });
}

// Tambah data baru
addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const text = dataInput.value.trim();
  const imgUrl = document.getElementById('img-input').value.trim();
  const status = document.getElementById('two-option').value;

  if (text === '' || imgUrl === '') return;

  const newData = {
    id: Date.now(),
    text: text,
    img: imgUrl,
    status: status
  };

  datas.push(newData);
  saveDatas();
  renderDatas();

  dataInput.value = '';
  document.getElementById('img-input').value = '';
});

function renderDatas() {
  dataList.innerHTML = '';

  datas.forEach(data => {
    const li = document.createElement('li');
    li.className = 'data-item';

    li.innerHTML = `
      <img src="${data.img}" alt="${data.text}" class="book-img"/>
      <span class="book-title">${data.text}</span>
      <span class="book-status">${data.status}</span>
      <div class="actions">
        <button class="edit-btn" data-id="${data.id}">Edit</button>
        <button class="delete-btn" data-id="${data.id}">Hapus</button>
      </div>
    `;

    dataList.appendChild(li);
  });
}

// Event delegation untuk edit/hapus
dataList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('delete-btn')) {
    datas = datas.filter(d => d.id != id);
    saveDatas();
    renderDatas();
  }

  if (e.target.classList.contains('edit-btn')) {
    const newText = prompt('Edit data:', datas.find(d => d.id == id).text);
    if (newText) {
      datas = datas.map(d => d.id == id ? { ...d, text: newText } : d);
      saveDatas();
      renderDatas();
    }
  }
});

// Render pertama kali saat halaman load
renderDatas();
