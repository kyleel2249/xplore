const postsPerPage = 2;
let currentPage = 1;
let allPosts = [];
let filteredPosts = [];

const grid = document.getElementById("news-grid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

fetch("data/posts.json")
  .then(res => res.json())
  .then(data => {
    allPosts = data;
    filteredPosts = data;
    renderPosts();
    updateButtons();
  });

function renderPosts() {
  grid.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  filteredPosts.slice(start, end).forEach(post => {
    grid.innerHTML += `
      <article class="news-card">
        <a href="${post.url}" class="news-image">
          <img src="${post.image}" alt="${post.title}">
        </a>
        <div class="news-content">
          <div class="news-category">${post.category}</div>
          <a href="${post.url}">
            <h3 class="news-title">${post.title}</h3>
          </a>
          <div class="news-meta">${post.date} • ${post.author}</div>
          <p class="news-excerpt">${post.excerpt}</p>
        </div>
      </article>
    `;
  });
}

function updateButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * postsPerPage >= filteredPosts.length;
}

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  filteredPosts = allPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "all" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  currentPage = 1;
  renderPosts();
  updateButtons();
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

prevBtn.onclick = () => {
  currentPage--;
  renderPosts();
  updateButtons();
};

nextBtn.onclick = () => {
  currentPage++;
  renderPosts();
  updateButtons();
};
