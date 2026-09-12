# MonoRoutine — Habit & Task Manager (PWA)

Aplikasi web produktivitas bertema *Minimalist Monochrome* yang dirancang untuk menjaga konsistensi rutinitas harian dan memantau tenggat waktu tugas, siap di-install di perangkat mobile sebagai Progressive Web App (PWA).

## Fitur Utama

- **Rutinitas & Alarm Mandiri:** Pengingat berbasis *Web Audio API* (4 preset nada sintetis tanpa file eksternal) dilengkapi mode tunda (*snooze*) dan integrasi Web Notification.
- **Manajemen Tugas & Deadline:** Pengurutan otomatis tenggat waktu terdekat dengan opsi notifikasi H-2 (48 jam) dan H-1 (24 jam).
- **Pelacak Konsistensi:** Penghitung *streak* harian dan ringkasan penyelesaian kegiatan.
- **Jurnal & Refleksi:** Pencatatan evaluasi harian dengan *timestamp* otomatis.
- **Mode Siaga:** Fitur *Screen Wake Lock API* untuk menjaga layar tetap aktif saat mode fokus/siaga.
- **Penyimpanan Lokal & Backup:** Sepenuhnya berjalan di sisi klien (*client-side*) menggunakan `localStorage` dengan opsi ekspor/impor (JSON, CSV, TXT, dan cetak PDF).

## Teknologi

- HTML5 & Vanilla JavaScript
- Tailwind CSS (via CDN)
- Lucide Icons
- Web Audio API, Notification API, Screen Wake Lock API
