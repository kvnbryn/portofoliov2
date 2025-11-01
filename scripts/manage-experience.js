// portofoliov2-main/scripts/manage-experience.js

// Kita gunakan 'require' agar kompatibel dengan file .cjs di proyek Anda
const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');

// --- Konfigurasi Path ---
// Path ini sudah disesuaikan dengan struktur folder Anda yang sudah benar
const dataFilePath = path.join(
  process.cwd(),
  'app',
  'routes',
  'experiences_._index',
  'experiences.data.js'
);
const mdxFolderPath = path.join(process.cwd(), 'app', 'routes');

// Fungsi untuk mengubah judul menjadi slug (contoh: "Bug Baru" -> "bug-baru")
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-alfanumerik
    .replace(/\-\-+/g, '-'); // Hapus tanda hubung ganda
}

// Fungsi untuk membuat tanggal hari ini (YYYY-MM-DD)
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// Fungsi untuk membuat konten file .mdx
function createMdxContent(title, description, image, date) {
  return `---
title: "${title}"
abstract: "${description}"
date: '${date}'
banner: "${image}"
---

## ${title}

Tuliskan detail experience Anda di sini...
`;
}

// Fungsi untuk memperbarui file experiences.data.js
async function updateDataFile(slug, title, description, image, date) {
  console.log('Membaca file data...');
  let content = await fs.readFile(dataFilePath, 'utf-8');

  // Buat entri baru sebagai string
  const newEntry = `
  {
    slug: '${slug}',
    title: "${title}",
    description: "${description}",
    image: "${image}",
    date: "${date}",
  },
];`; // Kita sisipkan koma dan kurung tutupnya

  // Ganti '];' di akhir file dengan entri baru + '];'
  content = content.replace(/\];(\s*)$/, `,${newEntry}`);

  // Tulis kembali file yang sudah dimodifikasi
  await fs.writeFile(dataFilePath, content, 'utf-8');
  console.log(`✅ Sukses! File 'experiences.data.js' telah diperbarui.`);
}

// Fungsi utama untuk menjalankan "panel"
async function run() {
  console.log('--- Panel Tambah Experience Baru ---');

  // 1. Ajukan pertanyaan
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Apa Judul Experience Anda?',
      validate: input => !!input || 'Judul tidak boleh kosong.',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Deskripsi singkat (untuk di daftar):',
    },
    {
      type: 'input',
      name: 'image',
      message: 'URL/Link ke gambar (lanskap):',
    },
    {
      type: 'input',
      name: 'date',
      message: 'Tanggal (YYYY-MM-DD):',
      default: getTodayDate(),
    },
  ]);

  const { title, description, image, date } = answers;
  const slug = slugify(title);

  try {
    // 2. Buat file .mdx baru
    const mdxFileName = `experiences.${slug}.mdx`;
    const mdxFilePath = path.join(mdxFolderPath, mdxFileName);
    const mdxContent = createMdxContent(title, description, image, date);

    await fs.writeFile(mdxFilePath, mdxContent, 'utf-8');
    console.log(`✅ Sukses! File '${mdxFileName}' telah dibuat di app/routes/`);

    // 3. Update file data.js
    await updateDataFile(slug, title, description, image, date);

    console.log('\n--- Otomatisasi Selesai ---');
    console.log('Sekarang Anda tinggal menjalankan "git add .", "git commit", dan "git push".');
    console.log(`File MDX baru Anda siap diedit di: app/routes/${mdxFileName}`);

  } catch (error) {
    console.error('--- GAGAL ---');
    console.error('Terjadi kesalahan:', error.message);
  }
}

// Jalankan fungsi utamanya
run();