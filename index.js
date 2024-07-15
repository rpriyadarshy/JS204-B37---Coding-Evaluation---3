document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
    const recentPostsList = document.getElementById('recent-posts');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const logoutButton = document.getElementById('logout-button');
    const submitPostButton = document.getElementById('submit-post');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.close-button');
  
    let currentUser = null;
  
    // Initial setup
    updateAuthUI();
    displayPosts();
  
    // User authentication
    loginButton.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });
  
    signupButton.addEventListener('click', () => {
      signupModal.style.display = 'block';
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
      });
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
      if (event.target === signupModal) {
        signupModal.style.display = 'none';
      }
    });
  
    document.getElementById('login-submit').addEventListener('click', () => {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      // Dummy authentication
      if (username && password) {
        currentUser = username;
        updateAuthUI();
        loginModal.style.display = 'none';
      } else {
        alert('Please enter username and password.');
      }
    });
  
    document.getElementById('signup-submit').addEventListener('click', () => {
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
      // Dummy signup
      if (username && password) {
        currentUser = username;
        updateAuthUI();
        signupModal.style.display = 'none';
      } else {
        alert('Please enter username and password.');
      }
    });
  
    logoutButton.addEventListener('click', () => {
      currentUser = null;
      updateAuthUI();
    });
  
    // Create new post
    submitPostButton.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;
      const tags = document.getElementById('post-tags').value.split(',').map(tag => tag.trim());
  
      if (title && content) {
        const post = {
          id: Date.now(),
          title,
          content,
          tags,
          author: currentUser,
          date: new Date().toLocaleDateString(),
        };
        savePost(post);
        displayPosts();
        postForm.reset();
      } else {
        alert('Title and content are required.');
      }
    });
  
    function updateAuthUI() {
      if (currentUser) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        postForm.style.display = 'block';
      } else {
        loginButton.style.display = 'inline-block';
        signupButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        postForm.style.display = 'none';
      }
    }
  
    function savePost(post) {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  
    function displayPosts() {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      postsContainer.innerHTML = '';
      recentPostsList.innerHTML = '';
      posts.reverse().forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p class="meta">Posted on ${post.date} by ${post.author}</p>
          <p>${post.content}</p>
          <p>Tags: ${post.tags.join(', ')}</p>
          <a href="#" class="read-more">Read More</a>
        `;
        postsContainer.appendChild(postElement);
  
        const recentPostElement = document.createElement('li');
        recentPostElement.innerHTML = `<a href="#">${post.title}</a>`;
        recentPostsList.appendChild(recentPostElement);
      });
    }
  });









  // #Evaluation-C-04




let isPagination = true;
let currentPage = 1;
let totalPages = 1;
let toggleThrottleTimeout;

const postsContainer = document.getElementById('posts-container');
const toggleButton = document.getElementById('toggle-button');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const paginationControls = document.getElementById('pagination-controls');

toggleButton.addEventListener('click', throttle(toggleScrollingMode, 1000));
prevPageButton.addEventListener('click', fetchPreviousPage);
nextPageButton.addEventListener('click', fetchNextPage);
window.addEventListener('scroll', throttle(handleScroll, 200));

function toggleScrollingMode() {
  isPagination = !isPagination;
  if (isPagination) {
    paginationControls.style.display = 'block';
  } else {
    paginationControls.style.display = 'none';
  }
  fetchPosts();
}

function handleScroll() {
  if (!isPagination && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    fetchMorePosts();
  }
}

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  };
}

function fetchPosts() {
  const url = isPagination ? /api/posts?page=${currentPage}
  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalPages = data.totalPages;
      renderPosts(data.posts);
    });
}

function fetchPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchPosts();
  }
}

function fetchNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchPosts();
  }
}

function fetchMorePosts() {
  currentPage++;
  fetch(/api/posts?page=${currentPage})
    .then(response => response.json())
    .then(data => renderPosts(data.posts, true));
}

function renderPosts(posts, append = false) {
  if (!append) {
    postsContainer.innerHTML = '';
  }
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.innerText = post.title;
    postsContainer.appendChild(postElement);
  });
}

fetchPosts();

  // #Button-Throttling

  document.getElementById('create-button').addEventListener('click',throttle(createPost, 1000))
  document.getElementById('update-button').addEventListener('click',throttle(updatePost, 1000))
  document.getElementById('delete-button').addEventListener('click',throttle(deletePost, 1000))
  document.getElementById('reaction-button').forEach(button =>{
    button.addEventListener('click',throttle(handlereaction,800));
  });
  function createPost{
    //Create Post
  }
  function updatepost{
    //Upadte Post
  }
  function deletePost{
    //Delete Post
  }
  function handlereaction(){
    //handle Reaction
  }


  // #Auto-Save drafts


  let draftContent = '';

  function autosaveDraft(){
    draftContent = document.getElementById('post-content').value;
    localStorage.setItem('draftContent', draftContent);
  }

  setInterval(autoSaveDraft, 20000);

  document.getElementById('load-draft-button').addEventListener('click', ()=>{
    document.getElementById('post-content').value = localStorage.getItem('draftContent') || '';
  });




  // #Multiple-Filters

  Document.getElementById('filter-button').addEventListener('click', applyFilters);

  function applyFilters(){
    const titleFilter = document.getElementById('title-filter').value;
    const tagFilter = document.getElementById('tag-filter').value;
    const authorFilter = document.getElementById('author-filter').value;

    const filters = {
      title: titleFilter,
      tag: tagFilter,
      author: authorFilter
    };
    fetchPosts(filters);
  }
  function fetchPosts(filters){
    const query = new URLSearchParams(filters).toString();
    fetch('/api/posts?${query}')
    .then(response => response.json())
    .then(data => renderPosts(data));
  }


  // #Analytics-Page

  fetch('/api/analytics/likes')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(comment => 'Comment ${comment.id}');
    const likes = data.map(comment => comment.likes.length);

    const ctx = document.getElementById('likesChart').getContext('2d');
    new CharacterData(ctx,{
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of likes',
          data: likes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  });



  // #Debouncing-On-Search

  const searchinput = document.getElementById('search-input');
  searchInput.addEventListener('input', debounce(handlesearch,300));

  function debounce(fn, delay){
    let timeoutId;
    return function(...args){
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  function handleSearch(){
    const query = searchInput.value;
    fetch('/api/posts?search=${query}')
    .then(response => response.json())
    .then(data => renderPosts(data));
  }