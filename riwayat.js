document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("daftarRiwayat");
  const filterStatus = document.getElementById("filterStatus");
  const sortOrder = document.getElementById("sortOrder");

  let pesananList = [];

  // Ambil dari array
  const data = localStorage.getItem("riwayatPesananArray");
  try {
    const parsed = JSON.parse(data);
    pesananList = Array.isArray(parsed) ? parsed : [];
  } catch {
    pesananList = [];
  }

  function renderPesanan(list) {
    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>Belum ada pesanan.</p>";
      return;
    }

    list.forEach(pesanan => {
      const card = document.createElement("div");
      card.className = "card-riwayat";
      card.innerHTML = `
        <h3>${pesanan.nama}</h3>
        <p><strong>Layanan:</strong> ${pesanan.tipeLayanan} (${pesanan.layanan})</p>
        <p><strong>Tanggal:</strong> ${pesanan.tanggal}, ${pesanan.jam}</p>
        <p><strong>Berat:</strong> ${pesanan.berat} kg</p>
        <p><strong>Harga:</strong> Rp${pesanan.totalHarga.toLocaleString("id-ID")}</p>
        <p><strong>Alamat:</strong> ${pesanan.alamat}</p>
        <p><strong>Status:</strong> ${pesanan.status}</p>
        <p><strong>Pembayaran:</strong> ${pesanan.metodePembayaran}</p>
        <div class="card-actions">
          <button class="lacak" onclick="location.href='tracking.html'">Lacak Status</button>
          <button class="kurir" onclick="alert('Kurir: 0812-3456-7890')">Hubungi Kurir</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function applyFilterSort() {
    let filtered = pesananList;

    const status = filterStatus.value;
    const sort = sortOrder.value;

    if (status !== "all") {
      filtered = filtered.filter(p => p.status === status);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.tanggal + " " + a.jam);
      const dateB = new Date(b.tanggal + " " + b.jam);
      return sort === "baru" ? dateB - dateA : dateA - dateB;
    });

    renderPesanan(filtered);
  }

  filterStatus.addEventListener("change", applyFilterSort);
  sortOrder.addEventListener("change", applyFilterSort);

  renderPesanan(pesananList); // initial load
});
