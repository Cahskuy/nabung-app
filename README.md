<h1 align="center">💰 Nabung App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" />
  <img src="https://img.shields.io/badge/Hono-F43F5E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis%20Cloud-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Nodemailer-yellowgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Zod-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deploy-Railway-000?style=for-the-badge&logo=railway&logoColor=white" />
</p>

---

**Nabung App** adalah aplikasi backend untuk mencatat **uang masuk dan uang keluar** secara aman dan terstruktur.  
Menggunakan stack modern seperti **Bun**, **Hono**, **Prisma**, dan terhubung ke database PostgreSQL (via Supabase), Redis untuk caching, dan Nodemailer untuk email notifikasi.

---

To install dependencies:

```bash
bun install
```

To migrate database:

```bash
bun run dev:migrate
```

To run:

```bash
bun run start
```

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

<h4>☁️ Deployment & Infrastruktur</h4>

| Layanan        | Peran                                                       |
| -------------- | ----------------------------------------------------------- |
| **Railway**    | Platform utama untuk deploy app.                            |
| **Cloudflare** | Sebagai reverse proxy, CDN, dan proteksi (DNS, HTTPS, dll). |

<h4>List Command</h4>

| Part          | Meaning                                                                       |
| ------------- | ----------------------------------------------------------------------------- |
| `bunx`        | Runs a local package binary (like Prisma CLI) without installing it globally. |
| `prisma`      | Invokes the Prisma CLI tool.                                                  |
| `migrate dev` | Tells Prisma to run a **development migration**:                              |

<h4>Implementasi Enkripsi dan Dekripsi AES</h4>
Enkripsi dan dekripsi nilai uang tabungan, meningkatkan keamanan dan mencegah potensi penyalahgunaan atau kebocoran data

| Aspek                      | Status  | Catatan                                        |
| -------------------------- | ------- | ---------------------------------------------- |
| AES-256-CBC                | ✅ Aman | Mode cipher kuat dan banyak digunakan          |
| Random IV per encrypt      | ✅ Aman | IV selalu baru tiap simpan balance             |
| Secret key via `.env`      | ✅ Aman | Tidak hardcoded di source code                 |
| IV disimpan bersama cipher | ✅ Aman | Format `iv:encrypted` → memudahkan decrypt     |
| Validasi panjang secret    | ✅ Aman | Cegah error karena panjang secret tidak sesuai |

<h5>Response API yang konsisten</h5>

| Field     | Penjelasan                                         |
| --------- | -------------------------------------------------- |
| `status`  | `"success"`, `"fail"`, atau `"error"`              |
| `message` | Penjelasan singkat dan human-readable              |
| `data`    | Objek atau array hasil operasi (null jika error)   |
| `errors`  | Hanya untuk validasi (field spesifik dengan pesan) |
