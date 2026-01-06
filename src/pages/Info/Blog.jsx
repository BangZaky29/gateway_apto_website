// =========================================
// FILE: src/pages/Info/Blog.jsx
// =========================================

import '../../styles/Style_forWebsite/Info.css';

export const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Cara Memaksimalkan Penggunaan Gateway NUANSA',
      excerpt: 'Tips dan trik untuk mendapatkan hasil maksimal dari platform kami',
      date: '15 Januari 2025',
      category: 'Tutorial'
    },
    {
      id: 2,
      title: 'Update Fitur Terbaru: Generator Surat Otomatis',
      excerpt: 'Kenali fitur baru yang memudahkan pembuatan dokumen bisnis Anda',
      date: '10 Januari 2025',
      category: 'Update'
    },
    {
      id: 3,
      title: 'Keamanan Data: Prioritas Utama Kami',
      excerpt: 'Bagaimana kami melindungi informasi pribadi dan transaksi Anda',
      date: '5 Januari 2025',
      category: 'Security'
    }
  ];

  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="container-max">
          <h1 className="info-hero-title">Blog Gateway NUANSA</h1>
          <p className="info-hero-subtitle">
            Artikel, tips, dan update terbaru dari tim kami
          </p>
        </div>
      </div>

      <div className="info-content">
        <div className="container-max">
          <div className="blog-grid">
            {posts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-category">{post.category}</div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{post.date}</span>
                  <button className="blog-card-link">Baca Selengkapnya →</button>
                </div>
              </article>
            ))}
          </div>

          <div className="blog-coming-soon">
            <h3>Lebih Banyak Artikel Segera Hadir</h3>
            <p>Kami sedang menyiapkan konten berkualitas untuk Anda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;