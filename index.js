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
  