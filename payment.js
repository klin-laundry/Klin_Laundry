document.addEventListener("DOMContentLoaded", () => {
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (!orderData) {
    alert("Data order tidak ditemukan. Silakan isi ulang form pemesanan.");
    window.location.href = "order.html";
    return;
  }

  // Tampilkan ringkasan
  document.getElementById("namaRingkasan").textContent = orderData.nama;
  document.getElementById("layananRingkasan").textContent = `${orderData.tipeLayanan} - ${orderData.layanan}`;
  document.getElementById("beratRingkasan").textContent = orderData.berat + " kg";
  document.getElementById("hargaRingkasan").textContent = `Rp${orderData.totalHarga.toLocaleString("id-ID")}`;

  const form = document.getElementById("formPembayaran");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const metode = document.querySelector('input[name="metode"]:checked');
    if (!metode) {
      alert("Silakan pilih salah satu metode pembayaran.");
      return;
    }

    const metodeValue = metode.value;
    const riwayatPesanan = {
      ...orderData,
      metodePembayaran: metodeValue,
      status: "Dalam Proses"
    };

    // Simpan ke localStorage dalam array
    let existing = JSON.parse(localStorage.getItem("riwayatPesananArray")) || [];
    existing.push(riwayatPesanan);
    localStorage.setItem("riwayatPesananArray", JSON.stringify(existing));

    // Redirect sesuai metode
    switch (metodeValue) {
      case "Tunai":
        window.location.href = "pembayaran-tunai.html";
        break;
      case "Transfer":
        window.location.href = "pembayaran-transfer.html";
        break;
      case "QRIS":
        window.location.href = "pembayaran-qris.html";
        break;
      case "VA":
        window.location.href = "pembayaran-va.html";
        break;
      case "Kartu Kredit":
        window.location.href = "pembayaran-kartu.html";
        break;
      default:
        alert("Metode tidak dikenali.");
        break;
    }
  });
});
