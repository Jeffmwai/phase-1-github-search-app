document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    const toggleButton = document.getElementById('toggle-search');
    let searchType = 'user';
  
    githubForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value;
  
      if (searchType === 'user') {
        const users = await searchUsers(searchTerm);
        displayUsers(users);
      } else if (searchType === 'repo') {
        const repos = await searchRepos(searchTerm);
        displayRepos(repos);
      }
    });
  
    toggleButton.addEventListener('click', () => {
      searchType = searchType === 'user' ? 'repo' : 'user';
      toggleButton.textContent = `Search ${searchType === 'user' ? 'Users' : 'Repos'}`;
      searchInput.placeholder = `Search ${searchType === 'user' ? 'Users' : 'Repos'}...`;
    });
  
    async function searchUsers(username) {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const data = await response.json();
      return data.items;
    }
  
    async function searchRepos(repoName) {
      const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const data = await response.json();
      return data.items;
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${user.html_url}" target="_blank">${user.login}</a>`;
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach((repo) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(listItem);
      });
    }
  });
  