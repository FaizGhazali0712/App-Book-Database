// Ambil elemen
const titleInput = document.getElementById('edit-title');
const imgInput = document.getElementById('edit-img');
const statusSelect = document.getElementById('edit-status');
const saveBtn = document.getElementById('save-btn');

// Ambil id dari URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'));

// Ambil data dari localStorage
let datas = JSON.parse(localStorage.getItem('datas')) || [];

// Cari data berdasarkan id
let bookToEdit = datas.find(d => d.id === bookId);

if (bookToEdit) {
  titleInput.value = bookToEdit.text;
  imgInput.value = bookToEdit.img;
  statusSelect.value = bookToEdit.status;
} else {
  alert('Buku tidak ditemukan!');
  window.location.href = 'index.html';
}

// Simpan perubahan
saveBtn.addEventListener('click', () => {
  bookToEdit.text = titleInput.value.trim();
  bookToEdit.img = imgInput.value.trim();
  bookToEdit.status = statusSelect.value;

  // Update array di localStorage
  datas = datas.map(d => d.id === bookId ? bookToEdit : d);
  localStorage.setItem('datas', JSON.stringify(datas));

  alert('Data buku berhasil diperbarui!');
  window.location.href = 'index.html';
});
