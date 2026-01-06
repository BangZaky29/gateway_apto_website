// =========================================
// FILE: src/pages/Info/Security.jsx
// =========================================

export const Security = () => {
  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="container-max">
          <h1 className="info-hero-title">Keamanan</h1>
          <p className="info-hero-subtitle">Komitmen kami dalam melindungi data Anda</p>
        </div>
      </div>

      <div className="info-content">
        <div className="container-max">
          <section className="info-section">
            <h2>Keamanan Data Prioritas Kami</h2>
            <p>
              Di Gateway NUANSA, keamanan data Anda adalah prioritas utama kami. Kami menerapkan 
              standar keamanan industri terbaik untuk melindungi informasi pribadi dan transaksi Anda.
            </p>
          </section>

          <section className="info-section">
            <h2>Langkah-Langkah Keamanan</h2>
            <div className="security-features">
              <div className="security-feature">
                <div className="security-icon">🔐</div>
                <h3>Enkripsi SSL/TLS</h3>
                <p>
                  Semua data yang ditransmisikan antara browser Anda dan server kami dienkripsi 
                  menggunakan teknologi SSL/TLS terbaru untuk mencegah intersepsi.
                </p>
              </div>

              <div className="security-feature">
                <div className="security-icon">🛡️</div>
                <h3>Proteksi Data</h3>
                <p>
                  Informasi sensitif seperti password dan data pembayaran disimpan dengan enkripsi 
                  standar industri dan tidak pernah disimpan dalam bentuk plain text.
                </p>
              </div>

              <div className="security-feature">
                <div className="security-icon">🔍</div>
                <h3>Monitoring 24/7</h3>
                <p>
                  Tim keamanan kami memantau sistem secara real-time untuk mendeteksi dan merespons 
                  ancaman keamanan dengan cepat.
                </p>
              </div>

              <div className="security-feature">
                <div className="security-icon">✅</div>
                <h3>Verifikasi Multi-Faktor</h3>
                <p>
                  Kami menyediakan opsi keamanan tambahan dengan verifikasi OTP untuk melindungi 
                  akun Anda dari akses tidak sah.
                </p>
              </div>

              <div className="security-feature">
                <div className="security-icon">🔄</div>
                <h3>Backup Reguler</h3>
                <p>
                  Data Anda di-backup secara berkala untuk memastikan pemulihan cepat dalam situasi 
                  darurat atau kehilangan data.
                </p>
              </div>

              <div className="security-feature">
                <div className="security-icon">📋</div>
                <h3>Audit Keamanan</h3>
                <p>
                  Kami melakukan audit keamanan berkala dan penetration testing untuk mengidentifikasi 
                  dan memperbaiki potensi kerentanan.
                </p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Tips Keamanan untuk Pengguna</h2>
            <ul className="security-tips">
              <li>Gunakan password yang kuat dan unik untuk akun Anda</li>
              <li>Jangan pernah membagikan password atau OTP kepada siapapun</li>
              <li>Aktifkan verifikasi dua faktor jika tersedia</li>
              <li>Logout dari akun Anda setelah selesai menggunakan</li>
              <li>Perbarui browser dan sistem operasi Anda secara berkala</li>
              <li>Waspada terhadap email phishing yang mengaku dari kami</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Laporkan Masalah Keamanan</h2>
            <p>
              Jika Anda menemukan kerentanan keamanan atau masalah terkait keamanan, silakan 
              laporkan segera kepada kami:
            </p>
            <p><strong>Email:</strong> security@nuansasolution.id</p>
            <p>
              Kami menghargai dan akan merespons setiap laporan dengan serius untuk menjaga 
              keamanan platform dan pengguna kami.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Security;