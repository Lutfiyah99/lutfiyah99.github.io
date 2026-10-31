//DARK MODE

// 1. Paksa halaman selalu mulai dengan mode 'light' (abaikan tema device)
document.documentElement.setAttribute('data-theme', 'light');

// 2. Fungsi untuk tombol ganti tema (Light <-> Dark)
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// SECTION HOME/INTRODUCE TEXT

// Kata berjalan
const kata = ['Student Network Computer', 'Frontend Developer', 'Web Developer', 'System Administrator'];

let indexKata = 0;
let indexHuruf = 0;
let terhapus = false;

const kataAwal = document.getElementById('textBerganti');

function kataBerjalan() {
    const kataSekarang = kata[indexKata];

    if (terhapus) {
        kataAwal.textContent = kataSekarang.substring(0, indexHuruf - 1);
        indexHuruf--;
    } else {
        kataAwal.textContent = kataSekarang.substring(0, indexHuruf + 1);
        indexHuruf++;
    }

    let kecepatan = terhapus ? 70 : 120;

    if (!terhapus && indexHuruf === kataSekarang.length) {
        kecepatan = 2000;
        terhapus = true;
    }

    else if (terhapus && indexHuruf === 0) {
        terhapus = false;
        
        indexKata = (indexKata + 1) % kata.length;
        kecepatan = 500;
    }

    setTimeout(kataBerjalan, kecepatan);
}

document.addEventListener('DOMContentLoaded', kataBerjalan);

// SECTION PORTOFOLIO
const btnPorto = document.querySelectorAll('.btnPortfolio');
const cardPorto = document.querySelectorAll('.container-project');

btnPorto.forEach(btn => {
    btn.addEventListener('click', () => {

        btnPorto.forEach(button => {
            button.classList.remove('active', 'text-pink-400');
        });

        btn.classList.add('active', 'text-pink-400');

        cardPorto.forEach(card => {
            card.classList.add('hidden');
        });

        const targetBtn = btn.getAttribute('data-target');
        const taregetCard2 = document.getElementById(targetBtn);

        if (taregetCard2) {
            taregetCard2.classList.remove('hidden');
        };
    });
})

// SECTION RESUME
const buttons = document.querySelectorAll('.btn');
const cards = document.querySelectorAll('.container-card');

buttons.forEach( button => {
    button.addEventListener('click', () => {
        // 1. Reset semua tombol: hapus kelas aktif / warna pink
        buttons.forEach( btn => {
            btn.classList.remove('active', 'text-pink-400'); // atau hapus 'active' jika kamu pakai class itu
        });

        // 2. Berikan efek aktif ke tombol yang sedang diklik
        button.classList.add('active', 'text-pink-400');

        // 3. Sembunyikan semua card dengan menambahkan kelas 'hidden'
        cards.forEach( card => {
            card.classList.add('hidden');
        });

        // 4. Ambil target dari atribut data-target dan tampilkan card yang sesuai
        const targetId = button.getAttribute('data-target');
        const targetCard = document.getElementById(targetId);

        if (targetCard) {
            targetCard.classList.remove('hidden');
        }
    });
});

// SECTION TESTIMONIAL
const cardTesti = document.querySelectorAll('.testi-card');
const panahKiri = document.getElementById('prevTesti');
const panahKanan = document.getElementById('nextTesti');

let indextestiSekarang = 0;

function ukuranLayar() {
    return window.innerWidth < 768 ? 1 : 2;
};

function updateSlidetesti() {
    if (cardTesti === 0) return;

    const cardTerlihat = ukuranLayar();

    cardTesti.forEach(card => {
        card.classList.add('hidden');
    });

    for (let i = 0; i < cardTerlihat; i++ ) {
        const indexTerlihat = (indextestiSekarang + i) % cardTesti.length;
        cardTesti[indexTerlihat].classList.remove('hidden');
    };
};

if (panahKiri) {
    panahKiri.addEventListener('click', () => {
        indextestiSekarang = (indextestiSekarang + 1 ) % cardTesti.length;
        updateSlidetesti();
    });
};

if (panahKanan) {
    panahKanan.addEventListener('click', () => {
        indextestiSekarang = (indextestiSekarang - 1 + cardTesti.length) % cardTesti.length;
        updateSlidetesti();
    });
};

window.addEventListener('resize', updateSlidetesti);

updateSlidetesti();

// SECTION CONTACT
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function(e) {
        // 1. Mencegah halaman reload otomatis
        e.preventDefault(); 
        
        // Ubah teks tombol menjadi loading agar interaktif
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        // 2. Mengirim data form di latar belakang (Background)
        fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                // 3. JIKA SUKSES: Reset/Kosongkan semua input kembali ke default
                form.reset(); 
                alert("Pesan berhasil terkirim!");
            } else {
                alert("Terjadi kesalahan: " + res.message);
            }
        })
        .catch(error => {
            console.log(error);
            alert("Gagal mengirim pesan. Silakan coba lagi nanti.");
        })
        .then(() => {
            // Kembalikan tombol ke status awal setelah proses selesai
            submitBtn.innerText = "SEND MESSAGE";
            submitBtn.disabled = false;
        });
    });