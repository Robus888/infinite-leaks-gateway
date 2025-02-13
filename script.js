
const folders = [
  {
    id: 1,
    title: "Pro Package 1",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    time: "13 minutes ago",
    link: "https://crazy.com"
  },
  {
    id: 2,
    title: "Pro Package 2",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    time: "28 minutes ago",
    link: "https://lol.com"
  },
  {
    id: 3,
    title: "Pro Package 3",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    time: "45 minutes ago",
    link: "https://example.com/folder3"
  },
  {
    id: 4,
    title: "Pro Package 4",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    time: "1 hour ago",
    link: "https://example.com/folder4"
  },
  {
    id: 5,
    title: "Pro Package 5",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    time: "2 hours ago",
    link: "https://example.com/folder5"
  },
  {
    id: 6,
    title: "Pro Package 6",
    imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    time: "3 hours ago",
    link: "https://example.com/folder6"
  },
  {
    id: 7,
    title: "Pro Package 7",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    time: "4 hours ago",
    link: "https://example.com/folder7"
  },
  {
    id: 8,
    title: "Pro Package 8",
    imageUrl: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
    time: "5 hours ago",
    link: "https://example.com/folder8"
  },
  {
    id: 9,
    title: "Pro Package 9",
    imageUrl: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    time: "6 hours ago",
    link: "https://example.com/folder9"
  },
  {
    id: 10,
    title: "Pro Package 10",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    time: "7 hours ago",
    link: "https://example.com/folder10"
  }
];

function createFolderCard(folder) {
  return `
    <div class="card">
      <img src="${folder.imageUrl}" alt="${folder.title}" class="card-image" loading="lazy">
      <div class="card-content">
        <h3 class="card-title">${folder.title}</h3>
        <p class="card-time">${folder.time}</p>
        <a href="${folder.link}" target="_blank" rel="noopener noreferrer" class="view-button">
          View Folder
        </a>
      </div>
    </div>
  `;
}

function renderFolders(foldersList) {
  const grid = document.getElementById('foldersGrid');
  grid.innerHTML = foldersList.map(folder => createFolderCard(folder)).join('');
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredFolders = folders.filter(folder => 
      folder.title.toLowerCase().includes(searchQuery)
    );
    renderFolders(filteredFolders);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderFolders(folders);
  initSearch();
});
