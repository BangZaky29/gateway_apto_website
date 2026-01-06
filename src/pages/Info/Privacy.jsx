// =========================================
// FILE: src/pages/Info/Privacy.jsx
// =========================================

import '../../styles/Style_forWebsite/Info.css';

export const Privacy = () => {
  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="container-max">
          <h1 className="info-hero-title">Kebijakan Privasi</h1>
          <p className="info-hero-subtitle">Terakhir diperbarui: 6 Januari 2025</p>
        </div>
      </div>

      <div className="info-content">
        <div className="container-max">
          <div className="info-legal">
            <section>
              <h2>1. Informasi yang Kami Kumpulkan</h2>
              <p>
                Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti:
              </p>
              <ul>
                <li>Nama lengkap dan informasi kontak (email, nomor telepon)</li>
                <li>Informasi akun dan kredensial login</li>
                <li>Informasi pembayaran dan transaksi</li>
                <li>Data penggunaan layanan dan preferensi</li>
              </ul>
            </section>

            <section>
              <h2>2. Penggunaan Informasi</h2>
              <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
              <ul>
                <li>Menyediakan, memelihara, dan meningkatkan layanan kami</li>
                <li>Memproses transaksi dan mengirim konfirmasi</li>
                <li>Mengirim update, newsletter, dan komunikasi terkait layanan</li>
                <li>Merespons pertanyaan dan memberikan dukungan pelanggan</li>
                <li>Melindungi keamanan dan mencegah penipuan</li>
              </ul>
            </section>

            <section>
              <h2>3. Berbagi Informasi</h2>
              <p>
                Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. 
                Kami hanya membagikan informasi dalam situasi berikut:
              </p>
              <ul>
                <li>Dengan persetujuan eksplisit Anda</li>
                <li>Untuk mematuhi hukum dan peraturan yang berlaku</li>
                <li>Dengan penyedia layanan pihak ketiga yang membantu operasi kami</li>
                <li>Untuk melindungi hak, properti, atau keamanan kami</li>
              </ul>
            </section>

            <section>
              <h2>4. Keamanan Data</h2>
              <p>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai 
                untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan 
                yang tidak sah.
              </p>
            </section>

            <section>
              <h2>5. Hak Anda</h2>
              <p>Anda memiliki hak untuk:</p>
              <ul>
                <li>Mengakses dan memperbarui informasi pribadi Anda</li>
                <li>Meminta penghapusan data Anda</li>
                <li>Menolak pemrosesan data tertentu</li>
                <li>Meminta portabilitas data</li>
              </ul>
            </section>

            <section>
              <h2>6. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
              </p>
              <p><strong>Email:</strong> privacy@nuansasolution.id</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Privacy;