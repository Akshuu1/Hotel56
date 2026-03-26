import { useState } from 'react'
import { X } from 'lucide-react'
import { galleryImages } from '../data/hotelData'
import './Gallery.css'

const categories = ['all', 'rooms', 'views', 'dining', 'exterior']

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter(img => img.category === filter)

  return (
    <main className="page-wrapper">
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img src="https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1920&q=80" alt="Gallery" />
          <div className="gallery-hero-overlay" />
        </div>
        <div className="container gallery-hero-content">
          <span className="section-label" style={{ color: 'var(--primary-container)' }}>Gallery</span>
          <h1>Explore Our Hotel</h1>
          <p>A visual journey through the rooms, views, and experiences at Hotel Shimla Regency.</p>
        </div>
      </section>

      <section className="gallery-main section-padding">
        <div className="container">
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'filter-active' : ''}`}
                onClick={() => setFilter(cat)}
                id={`gallery-filter-${cat}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="gallery-masonry">
            {filtered.map((img, i) => (
              <div
                key={i}
                className={`gallery-item ${i % 5 === 0 ? 'gallery-item-tall' : ''} ${i % 7 === 0 ? 'gallery-item-wide' : ''}`}
                onClick={() => setLightbox(img)}
                id={`gallery-img-${i}`}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-title">{img.title}</span>
                  <span className="gallery-item-category">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} id="lightbox">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <X size={24} />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="lightbox-info">
              <h3>{lightbox.title}</h3>
              <span className="badge badge-gold">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
