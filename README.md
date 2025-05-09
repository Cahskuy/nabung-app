# nabung-app

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

| Part          | Meaning                                                                       |
| ------------- | ----------------------------------------------------------------------------- |
| `bunx`        | Runs a local package binary (like Prisma CLI) without installing it globally. |
| `prisma`      | Invokes the Prisma CLI tool.                                                  |
| `migrate dev` | Tells Prisma to run a **development migration**:                              |

Enkripsi dan dekripsi nilai uang tabungan, meningkatkan keamanan dan mencegah potensi penyalahgunaan atau kebocoran data

| Aspek                      | Status  | Catatan                                        |
| -------------------------- | ------- | ---------------------------------------------- |
| AES-256-CBC                | ✅ Aman | Mode cipher kuat dan banyak digunakan          |
| Random IV per encrypt      | ✅ Aman | IV selalu baru tiap simpan balance             |
| Secret key via `.env`      | ✅ Aman | Tidak hardcoded di source code                 |
| IV disimpan bersama cipher | ✅ Aman | Format `iv:encrypted` → memudahkan decrypt     |
| Validasi panjang secret    | ✅ Aman | Cegah error karena panjang secret tidak sesuai |

Response API yang konsisten

| Field     | Penjelasan                                         |
| --------- | -------------------------------------------------- |
| `status`  | `"success"`, `"fail"`, atau `"error"`              |
| `message` | Penjelasan singkat dan human-readable              |
| `data`    | Objek atau array hasil operasi (null jika error)   |
| `errors`  | Hanya untuk validasi (field spesifik dengan pesan) |
