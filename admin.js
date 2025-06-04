// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("daftarPesananAdmin");

  let pesananList = JSON.parse(localStorage.getItem("riwayatPesananArray")) || [];

  function updateLocalStorage() {
    localStorage.setItem("riwayatPesananArray", JSON.stringify(pesananList));
    alert("✅ Status pesanan berhasil diperbarui.");
  }

  function render() {
    container.innerHTML = "";
    if (pesananList.length === 0) {
      container.innerHTML = "<p>Tidak ada pesanan ditemukan.</p>";
      return;
    }

    pesananList.forEach((pesanan, index) => {
      const div = document.createElement("div");
      div.className = "pesanan-card";
      div.innerHTML = `
        <h3>🧺 ${pesanan.nama}</h3>
        <p><strong>Layanan:</strong> ${pesanan.tipeLayanan} - ${pesanan.layanan}</p>
        <p><strong>Tanggal & Jam:</strong> ${pesanan.tanggal}, ${pesanan.jam}</p>
        <p><strong>Alamat:</strong> ${pesanan.alamat}</p>
        <p><strong>Status Saat Ini:</strong> <em>${pesanan.status || "Dalam Proses"}</em></p>
        <label for="status-${index}"><strong>Ubah Status:</strong></label>
        <select id="status-${index}">
          <option value="Dalam Proses" ${pesanan.status === "Dalam Proses" ? "selected" : ""}>Dalam Proses</option>
          <option value="Dicuci" ${pesanan.status === "Dicuci" ? "selected" : ""}>Dicuci</option>
          <option value="Disetrika" ${pesanan.status === "Disetrika" ? "selected" : ""}>Disetrika</option>
          <option value="Dikirim" ${pesanan.status === "Dikirim" ? "selected" : ""}>Dikirim</option>
          <option value="Selesai" ${pesanan.status === "Selesai" ? "selected" : ""}>Selesai</option>
        </select>
        <button onclick="updateStatus(${index})">Update Status</button>
      `;
      container.appendChild(div);
    });
  }

  window.updateStatus = (index) => {
    const selected = document.getElementById(`status-${index}`).value;
    pesananList[index].status = selected;
    updateLocalStorage();
    render();
  };

  render();
});
