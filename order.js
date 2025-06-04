document.addEventListener("DOMContentLoaded", () => {
  const namaEl = document.getElementById("outputNama");
  const alamatEl = document.getElementById("outputAlamat");
  const tanggalEl = document.getElementById("outputTanggal");
  const jamEl = document.getElementById("outputJam");
  const layananEl = document.getElementById("outputLayanan");
  const form = document.getElementById("formOrder");
  const beratInput = document.getElementById("berat");
  const tipeLayananInput = document.getElementById("tipeLayanan");
  const totalHargaEl = document.getElementById("totalHarga");

  // 1. Ambil data dari localStorage
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!bookingData) {
    alert("Data pemesanan tidak ditemukan. Silakan isi formulir pemesanan terlebih dahulu.");
    window.location.href = "booking.html";
    return;
  }

  // 2. Tampilkan data pemesan
  namaEl.textContent = bookingData.nama;
  alamatEl.textContent = bookingData.alamat;
  tanggalEl.textContent = bookingData.tanggal;
  jamEl.textContent = bookingData.jam;
  layananEl.textContent = bookingData.layanan;

  // 3. Hitung harga otomatis saat input berubah
  function hitungHarga() {
    const berat = parseFloat(beratInput.value);
    const tipe = tipeLayananInput.value;
    let hargaPerKg = 0;

    switch (tipe) {
      case "cuci-kering":
        hargaPerKg = 6000;
        break;
      case "cuci-setrika":
        hargaPerKg = 8000;
        break;
      case "setrika":
        hargaPerKg = 5000;
        break;
      case "kilat":
        hargaPerKg = 12000;
        break;
    }

    const total = berat && hargaPerKg ? berat * hargaPerKg : 0;
    totalHargaEl.textContent = `Rp${total.toLocaleString("id-ID")}`;
    return total;
  }

  beratInput.addEventListener("input", hitungHarga);
  tipeLayananInput.addEventListener("change", hitungHarga);

  // 4. Submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const berat = parseFloat(beratInput.value);
    const tipe = tipeLayananInput.value;
    const total = hitungHarga();

    if (!berat || !tipe) {
      alert("Mohon isi jenis layanan dan berat cucian.");
      return;
    }

    const orderData = {
      ...bookingData,
      tipeLayanan: tipe,
      berat,
      totalHarga: total
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));
    alert("Data order berhasil disimpan. Lanjut ke halaman Pembayaran.");
    window.location.href = "payment.html";
  });
});
