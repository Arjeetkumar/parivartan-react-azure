const STORAGE_KEY = 'parivartan_blogs';

// Data Management
function getBlogs() {
  const blogs = localStorage.getItem(STORAGE_KEY);
  return blogs ? JSON.parse(blogs) : [];
}

function saveBlogs(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

function addBlog(title, author, content) {
  const blogs = getBlogs();
  const newBlog = {
    id: Date.now().toString(),
    title,
    author,
    content,
    date: new Date().toLocaleDateString(),
    status: 'pending' // pending, approved
  };
  blogs.unshift(newBlog); // Add to top
  saveBlogs(blogs);
  return newBlog;
}

function approveBlog(id) {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === id);
  if (index !== -1) {
    blogs[index].status = 'approved';
    saveBlogs(blogs);
    return true;
  }
  return false;
}

function deleteBlog(id) {
  let blogs = getBlogs();
  blogs = blogs.filter(b => b.id !== id);
  saveBlogs(blogs);
}

// Rendering
function renderPublicBlogs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const blogs = getBlogs().filter(b => b.status === 'approved');

  if (blogs.length === 0) {
    container.innerHTML = '<p class="no-blogs">No blogs found. Be the first to write one!</p>';
    return;
  }

  container.innerHTML = blogs.map(blog => `
    <article class="blog-card">
      <h3>${blog.title}</h3>
      <div class="meta">By <strong>${blog.author}</strong> on ${blog.date}</div>
      <p class="excerpt">${blog.content.substring(0, 150)}...</p>
      <div class="full-content" style="display:none;">${blog.content.replace(/\n/g, '<br>')}</div>
      <button onclick="toggleBlog(this)" class="read-more">Read More</button>
    </article>
  `).join('');
}

function toggleBlog(btn) {
  const card = btn.closest('.blog-card');
  const excerpt = card.querySelector('.excerpt');
  const full = card.querySelector('.full-content');

  if (full.style.display === 'none') {
    excerpt.style.display = 'none';
    full.style.display = 'block';
    btn.textContent = 'Show Less';
  } else {
    excerpt.style.display = 'block';
    full.style.display = 'none';
    btn.textContent = 'Read More';
  }
}

function renderAdminLogs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const blogs = getBlogs().filter(b => b.status === 'pending');

  if (blogs.length === 0) {
    container.innerHTML = '<p>No pending approvals.</p>';
    return;
  }

  container.innerHTML = blogs.map(blog => `
    <div class="admin-blog-item">
      <div>
        <h4>${blog.title}</h4>
        <small>By ${blog.author} | ${blog.date}</small>
        <p>${blog.content.substring(0, 100)}...</p>
      </div>
      <div class="actions">
        <button onclick="handleApprove('${blog.id}')" class="btn-approve">Approve</button>
        <button onclick="handleDelete('${blog.id}')" class="btn-reject">Reject</button>
      </div>
    </div>
  `).join('');
}

// Global handlers for admin buttons (since they are injected as strings)
// Custom Modal Helpers
function showConfirmModal(message, onConfirm) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(4px);';

  const modal = document.createElement('div');
  modal.style.cssText = 'background:#0B1728;padding:30px;border-radius:15px;border:1px solid #D4AF37;text-align:center;max-width:350px;width:90%;color:white;box-shadow:0 10px 25px rgba(0,0,0,0.5);';

  const msg = document.createElement('p');
  msg.textContent = message;
  msg.style.marginBottom = '20px';
  msg.style.fontSize = '1.1em';

  const btnContainer = document.createElement('div');
  btnContainer.style.cssText = 'display:flex;gap:15px;justify-content:center;';

  const noBtn = document.createElement('button');
  noBtn.textContent = 'Cancel';
  noBtn.style.cssText = 'background:transparent;border:1px solid #D4AF37;color:#D4AF37;padding:10px 25px;cursor:pointer;border-radius:8px;font-weight:bold;transition:all 0.3s;';
  noBtn.onmouseover = () => noBtn.style.background = 'rgba(212, 175, 55, 0.1)';
  noBtn.onmouseout = () => noBtn.style.background = 'transparent';
  noBtn.onclick = () => document.body.removeChild(overlay);

  const yesBtn = document.createElement('button');
  yesBtn.textContent = 'Confirm';
  yesBtn.style.cssText = 'background:#D4AF37;color:#0D1D34;border:none;padding:10px 25px;cursor:pointer;border-radius:8px;font-weight:bold;transition:all 0.3s;';
  yesBtn.onmouseover = () => { yesBtn.style.background = '#F4E3A1'; };
  yesBtn.onmouseout = () => { yesBtn.style.background = '#D4AF37'; };
  yesBtn.onclick = () => {
    onConfirm();
    document.body.removeChild(overlay);
  };

  btnContainer.appendChild(noBtn);
  btnContainer.appendChild(yesBtn);
  modal.appendChild(msg);
  modal.appendChild(btnContainer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// Global Alert Modal for use in other files
window.showAlertModal = function (message, callback) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(4px);';

  const modal = document.createElement('div');
  modal.style.cssText = 'background:#0B1728;padding:30px;border-radius:15px;border:1px solid #D4AF37;text-align:center;max-width:350px;width:90%;color:white;box-shadow:0 10px 25px rgba(0,0,0,0.5);';

  const msg = document.createElement('p');
  msg.textContent = message;
  msg.style.marginBottom = '25px';
  msg.style.fontSize = '1.1em';

  const okBtn = document.createElement('button');
  okBtn.textContent = 'Okay';
  okBtn.style.cssText = 'background:#D4AF37;color:#0D1D34;border:none;padding:10px 30px;cursor:pointer;border-radius:8px;font-weight:bold;font-size:1em;';
  okBtn.onclick = () => {
    document.body.removeChild(overlay);
    if (callback) callback();
  };

  modal.appendChild(msg);
  modal.appendChild(okBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

window.handleApprove = (id) => {
  showConfirmModal('Approve this blog?', () => {
    approveBlog(id);
    renderAdminLogs('admin-container');
  });
};

window.handleDelete = (id) => {
  showConfirmModal('Delete this blog permanently?', () => {
    deleteBlog(id);
    renderAdminLogs('admin-container');
  });
};
