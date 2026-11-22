/* ============================================
   SNEAKERS GLOW STUDIO
   SOFTWARE ENGINEER — SCRIPT.JS
   Kalkulator harga dan validasi kode promo
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
    // Konfigurasi kode promo.
    const PROMO_CODE = "SEPATUKECE";
    const PROMO_DISCOUNT = 0.20;

    // Mengambil elemen formulir.
    const calcForm = document.getElementById("calc-form");
    const packageSelect = document.getElementById("package-select");
    const quantityInput = document.getElementById("quantity-input");
    const promoInput = document.getElementById("promo-input");

    // Mengambil elemen hasil perhitungan.
    const resPackage = document.getElementById("res-package");
    const resSubtotal = document.getElementById("res-subtotal");
    const resDiscount = document.getElementById("res-discount");
    const resPromoNote = document.getElementById("res-promo-note");
    const resTotal = document.getElementById("res-total");

    // Menghentikan script jika elemen utama tidak ditemukan.
    if (
        !calcForm ||
        !packageSelect ||
        !quantityInput ||
        !promoInput ||
        !resPackage ||
        !resSubtotal ||
        !resDiscount ||
        !resPromoNote ||
        !resTotal
    ) {
        console.error("Elemen kalkulator tidak lengkap. Periksa kembali index.html.");
        return;
    }

    // Format angka ke mata uang Rupiah.
    function formatRupiah(amount) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Menghitung harga paket, jumlah pasang, dan diskon promo.
    function hitungBiaya() {
        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        const unitPrice = Number(packageSelect.value);
        const packageName = selectedOption.dataset.name || selectedOption.textContent;
        const quantity = Number(quantityInput.value);

        // Validasi jumlah harus bilangan bulat minimal satu.
        if (
            !Number.isFinite(unitPrice) ||
            unitPrice <= 0 ||
            !Number.isInteger(quantity) ||
            quantity < 1
        ) {
            quantityInput.setCustomValidity("Jumlah pasang sepatu harus berupa bilangan bulat minimal 1.");
            quantityInput.reportValidity();
            quantityInput.setCustomValidity("");
            return;
        }

        const subtotal = unitPrice * quantity;
        const enteredPromo = promoInput.value.trim().toUpperCase();

        let discount = 0;
        let promoMessage = "Belum ada kode promo yang digunakan.";

        // Memeriksa kode promo tanpa membedakan huruf besar dan kecil.
        if (enteredPromo === PROMO_CODE) {
            discount = Math.round(subtotal * PROMO_DISCOUNT);
            promoMessage = "Kode promo SEPATUKECE berhasil digunakan. Diskon 20% aktif.";
        } else if (enteredPromo !== "") {
            promoMessage = "Kode promo tidak valid. Diskon tidak diterapkan.";
        }

        const total = subtotal - discount;

        // Menampilkan rincian perhitungan ke halaman.
        resPackage.textContent = `${packageName} (${formatRupiah(unitPrice)} × ${quantity} pasang)`;
        resSubtotal.textContent = formatRupiah(subtotal);
        resDiscount.textContent = formatRupiah(discount);
        resPromoNote.textContent = promoMessage;
        resTotal.textContent = formatRupiah(total);

        // Memberi penanda visual ketika kode promo berhasil digunakan.
        resPromoNote.classList.toggle("is-success", enteredPromo === PROMO_CODE);
    }

    // Menjalankan kalkulasi saat tombol Hitung Biaya ditekan.
    calcForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validasi HTML: required, min, dan step.
        if (!calcForm.reportValidity()) {
            return;
        }

        hitungBiaya();
    });

    // Menampilkan estimasi awal sesuai pilihan default pada formulir.
    hitungBiaya();
});
