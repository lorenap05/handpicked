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
