import { readFileSync } from 'node:fs';
export const event = {
  name: 'Bundle Neverdie Festival', edition: '09', date: '1 & 2 Mei 2027',
  venue: 'Kompleks Sukan KHTP, Kulim, Kedah',
  page: 'https://www.facebook.com/profile.php?id=100063553256783',
  group: 'https://www.facebook.com/groups/296109614676375/',
  map: 'https://www.google.com/maps/search/?api=1&query=Kompleks+Sukan+KHTP+Kulim+Kedah'
};
export const routes = ['/', '/tentang', '/program', '/sorotan', '/galeri'];
export const meta = {
 '/': ['Bundle Neverdie Festival 2027 · Vol. 09 · Kulim, Kedah', 'Bundle Neverdie Festival Vol. 09 kembali pada 1 & 2 Mei 2027 di Kompleks Sukan KHTP, Kulim, Kedah. Pertemuan komuniti bundle, vintage dan brotherhood.'],
 '/tentang': ['Tentang Komuniti & Brotherhood · Bundle Neverdie Festival', 'Kenali komuniti Bundle Neverdie: ruang untuk peniaga bundle dan vintage, usaha bersama brotherhood dan persahabatan merentas sempadan.'],
 '/program': ['Program 2027 · 1–2 Mei · Bundle Neverdie Festival Kulim', 'Program Bundle Neverdie Festival Vol. 09 pada 1 & 2 Mei 2027 di Kulim, Kedah. Jualan bundle dan vintage, ruang peniaga serta pertemuan komuniti.'],
 '/sorotan': ['Sorotan Acara & Tour · Bundle Neverdie Festival', 'Imbas kembali acara Bundle Neverdie 2026, Tour Alor Setar Disember 2025, Returns Ogos 2025 dan cerita komuniti antarabangsa.'],
 '/galeri': ['Galeri Komuniti & Tour Alor Setar · Bundle Neverdie Festival', 'Album foto penyokong antarabangsa, komuniti bundle dan vintage, serta Bundle Neverdie Festival Tour Alor Setar, Kedah, Disember 2025.']
};
const albums=JSON.parse(readFileSync('content/albums.json','utf8'));
export const international=albums.antarabangsa;
export const tour=albums.tour;
export const community=albums.komuniti;
export const faq = [
 ['Bilakah Bundle Neverdie Festival 2027?', 'Pada 1 & 2 Mei 2027, untuk Vol. 09.'],
 ['Di manakah festival berlangsung?', 'Di Kompleks Sukan KHTP, Kulim, Kedah.'],
 ['Apakah tujuan festival?', 'Membantu peniaga memasarkan barangan bundle dan vintage serta menghubungkan komuniti, pelanggan dan pengumpul.'],
 ['Siapakah yang menggerakkan acara?', 'Acara bersama Bundle Group (Brotherhood), melalui kerjasama komuniti, tanpa tajaan mana-mana pihak.'],
 ['Adakah jadual lengkap sudah diumumkan?', 'Masa dan butiran aktiviti akan diumumkan melalui saluran Facebook komuniti.'],
 ['Di mana boleh melihat acara lepas?', 'Halaman Sorotan menyimpan rekod acara. Album foto boleh dibuka melalui pautan Galeri di halaman tersebut.']
];
