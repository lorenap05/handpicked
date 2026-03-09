// ==========================================
//  script.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Apply photo-bg tiles from data-bg attribute ---
  document.querySelectorAll('.tile-photo-bg[data-bg]').forEach(tile => {
    tile.style.backgroundImage = `url('${tile.dataset.bg}')`;
  });

  // --- Back to top ---
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Share buttons ---
  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showToast('Link copied to clipboard!'))
        .catch(() => showToast('Copy this URL: ' + window.location.href));
    }
  }
  document.getElementById('shareBtn')?.addEventListener('click', handleShare);
  document.getElementById('sharePageBtn')?.addEventListener('click', handleShare);

  // --- Sub-nav active link ---
  const navLinks = document.querySelectorAll('.sub-nav a:not(.has-dropdown)');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      navLinks.forEach(l => l.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // --- Add to cart ---
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.currentTarget.closest('.product-card');
      const name = card?.querySelector('.product-name')?.textContent?.trim() ?? 'Item';
      const shortName = name.length > 40 ? name.slice(0, 40) + '…' : name;

      btn.textContent = 'Added \u2713';
      btn.classList.add('added');
      btn.disabled = true;

      // Update cart count
      const countEl = document.querySelector('.cart-count');
      if (countEl) countEl.textContent = String(parseInt(countEl.textContent || '0') + 1);

      showToast(`"${shortName}" added to cart`);

      setTimeout(() => {
        btn.textContent = 'Add to cart';
        btn.classList.remove('added');
        btn.disabled = false;
      }, 1800);
    });
  });

  // --- Search ---
  const searchInput = document.querySelector('.search-input');
  const searchBtn   = document.querySelector('.search-btn');

  function doSearch() {
    const q = searchInput?.value.trim();
    if (q) showToast(`Searching for: "${q}"`);
  }
  searchBtn?.addEventListener('click', doSearch);
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // --- Color swatches ---
  document.querySelectorAll('.color-swatches').forEach(group => {
    group.querySelectorAll('.swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        group.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
      });
    });
  });

  // =========================================================
  //  PRODUCT DETAIL MODAL  (home-education.html)
  // =========================================================

  const productModalData = {
    laptoppro15: {
      name: 'LaptopPro 15',
      scores: [
        { icon: '🖥️', num: '9.8', name: 'Raw Power',    desc: 'Top 1% benchmark performance across every laptop we have tested.' },
        { icon: '🔋', num: '9.5', name: 'Endurance',    desc: '14.5 hrs real-world battery — full workday and well beyond.' },
        { icon: '🏗️', num: '9.4', name: 'Build Quality', desc: 'CNC-milled aluminium chassis with MIL-SPEC drop rating.' },
        { icon: '🖼️', num: '9.2', name: 'Display',       desc: 'OLED 2.8K 120 Hz panel with 100 % DCI-P3 colour coverage.' },
      ],
      benchmarks: [
        { cat: 'CPU — Cinebench R23',   result: '18,420 pts', rating: '★★★★★' },
        { cat: 'GPU Score',             result: '8,940 pts',  rating: '★★★★★' },
        { cat: 'RAM Speed',             result: '6,400 MT/s', rating: '★★★★★' },
        { cat: 'Boot Time',             result: '4.2 sec',    rating: '★★★★★' },
        { cat: 'Battery — PCMark 10',   result: '14.5 hrs',   rating: '★★★★★' },
      ],
      comparisons: [
        { name: 'LaptopPro 15',   pct: 92, hl: true  },
        { name: 'MacBook Pro 14"', pct: 88, hl: false },
        { name: 'Dell XPS 15',    pct: 78, hl: false },
        { name: 'ASUS ProArt 16', pct: 71, hl: false },
      ],
    },

    airbook13: {
      name: 'AirBook 13',
      scores: [
        { icon: '⚡', num: '7.8', name: 'Speed',       desc: 'Snappy ARM-based chip handles everyday tasks with ease.' },
        { icon: '🪶', num: '9.7', name: 'Portability', desc: 'Just 1.1 kg and 12.9 mm thin — lightest laptop in its class.' },
        { icon: '🔋', num: '8.8', name: 'Endurance',   desc: '11 hrs real-world — reliable through the longest study days.' },
        { icon: '💰', num: '8.2', name: 'Value',       desc: 'Competitive mid-range pricing for a genuinely premium feel.' },
      ],
      benchmarks: [
        { cat: 'CPU — Geekbench 6',   result: '14,200 pts', rating: '★★★★☆' },
        { cat: 'Weight',              result: '1.1 kg',     rating: '★★★★★' },
        { cat: 'Chassis Thickness',   result: '12.9 mm',    rating: '★★★★★' },
        { cat: 'Boot Time',           result: '5.8 sec',    rating: '★★★★★' },
        { cat: 'Battery — Real-world',result: '11 hrs',     rating: '★★★★★' },
      ],
      comparisons: [
        { name: 'AirBook 13',          pct: 84, hl: true  },
        { name: 'Lenovo ThinkPad X1',  pct: 79, hl: false },
        { name: 'HP Dragonfly G4',     pct: 76, hl: false },
        { name: 'Samsung Galaxy Book', pct: 68, hl: false },
      ],
    },

    zenboox: {
      name: 'ZenBook X',
      scores: [
        { icon: '💪', num: '7.2', name: 'Performance', desc: 'Solid everyday performance for students and home users.' },
        { icon: '💸', num: '9.5', name: 'Value',       desc: 'Exceptional price-to-spec ratio — best bang for your buck.' },
        { icon: '🔋', num: '8.0', name: 'Endurance',   desc: '10 hrs everyday use — gets through a full school day.' },
        { icon: '🖥️', num: '7.8', name: 'Display',     desc: 'FHD IPS anti-glare panel, comfortable for all-day viewing.' },
      ],
      benchmarks: [
        { cat: 'CPU — Cinebench R23',   result: '11,200 pts', rating: '★★★★☆' },
        { cat: 'GPU Score',             result: '4,100 pts',  rating: '★★★☆☆' },
        { cat: 'RAM',                   result: '16 GB DDR5', rating: '★★★★☆' },
        { cat: 'Storage Read Speed',    result: '3,200 MB/s', rating: '★★★★☆' },
        { cat: 'Battery — Real-world',  result: '10 hrs',     rating: '★★★★☆' },
      ],
      comparisons: [
        { name: 'ZenBook X',         pct: 88, hl: true  },
        { name: 'Lenovo IdeaPad 5',  pct: 74, hl: false },
        { name: 'Acer Aspire 5',     pct: 72, hl: false },
        { name: 'HP Pavilion 15',    pct: 69, hl: false },
      ],
    },
  };

  function openModal(productKey) {
    const data = productModalData[productKey];
    if (!data) return;

    // Product name in header
    document.getElementById('modalProductName').textContent = data.name;

    // Core score cards
    document.getElementById('modalScores').innerHTML = data.scores.map(s => `
      <div class="modal-score-card">
        <div class="modal-score-icon">${s.icon}</div>
        <div class="modal-score-num">${s.num}</div>
        <div class="modal-score-name">${s.name}</div>
        <div class="modal-score-desc">${s.desc}</div>
      </div>
    `).join('');

    // Benchmark table
    document.getElementById('benchTable').innerHTML = `
      <thead>
        <tr>
          <th>Category / Test</th>
          <th>Result</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        ${data.benchmarks.map(b => `
          <tr>
            <td>${b.cat}</td>
            <td>${b.result}</td>
            <td class="bench-rating">${b.rating}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    // Market comparison bars
    document.getElementById('modalCompare').innerHTML = data.comparisons.map(c => `
      <div class="compare-bar-row">
        <div class="compare-bar-label${c.hl ? ' hl' : ''}">${c.name}</div>
        <div class="compare-bar-bg">
          <div class="compare-bar-fill${c.hl ? ' hl' : ''}" style="width:${c.pct}%"></div>
        </div>
        <div class="compare-bar-score${c.hl ? ' hl' : ''}">${c.pct}%</div>
      </div>
    `).join('');

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  // Wire up CTA buttons
  document.querySelectorAll('.pcl-cta-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.product));
  });

  // Close modal via X button, backdrop click, or Escape key
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // --- Toast helper ---
  function showToast(msg) {
    document.querySelector('.toast')?.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed', bottom: '28px', left: '50%',
      transform: 'translateX(-50%)',
      background: '#232f3e', color: '#fff',
      padding: '10px 22px', borderRadius: '24px',
      fontSize: '0.85rem', zIndex: '9999',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      whiteSpace: 'nowrap', opacity: '0',
      transition: 'opacity 0.2s', pointerEvents: 'none',
      fontFamily: 'Arial, sans-serif',
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => { t.style.opacity = '1'; }));
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 250); }, 2500);
  }

});
