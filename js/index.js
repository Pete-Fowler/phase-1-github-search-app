const form = document.querySelector('#github-form');
const reposList = document.querySelector('ul#repos-list');

const renderRepos = (data) => {
  reposList.textContent = '';
  for(const projectObj in data) {
    const project = data[projectObj];
    
    const name = document.createElement('a');
    name.textContent = project.name;
    name.setAttribute('href', project.html_url);
    const forks = document.createElement('p');
    forks.textContent = `Forks: ${project.forks}`;
    const pushed = document.createElement('p');
    pushed.textContent = `Last commit: ${project.pushed_at.slice(0, 10)}`;

    const li = document.createElement('li');
    li.append(name, forks, pushed);
    reposList.append(li);
  }
}

const repoSearch = (user) => {
  return fetch(`https://api.github.com/users/${user}/repos`)
  .then(res => res.json())
  .then(data => renderRepos(data));
}

const renderUsers = (data) => {
  const userList = document.querySelector('ul#user-list');
  userList.textContent = '';
  reposList.textContent = '';
  const users = data.items;
  for(user in users) {
    const key = users[user];
    const name = document.createElement('h3');
    name.textContent = key.login;
    const avatar = document.createElement('img');
    avatar.src = key.avatar_url;
    avatar.style.maxWidth = '100px';
    
    const linkBox = document.createElement('div');
    const linkP = document.createElement('p');
    const link = document.createElement('a');
    link.setAttribute('href', key.html_url);
    link.textContent = 'Github profile';
    linkP.append(link);
    
    const repoP = document.createElement('p');
    const repos = document.createElement('a');
    repos.textContent = 'Repositories'
    repos.id = "reposLink";
    repos.setAttribute('href', '#');
    repos.addEventListener('click', () => repoSearch(name.textContent));
    repoP.append(repos);
    linkBox.append(linkP, repoP);
    linkBox.style.float = 'right';
    const li = document.createElement('li');
    li.append(name, avatar, linkBox);
    userList.append(li);
  }

}

const userSearch = (e) => {
  e.preventDefault();
  const term = form.search.value;
  return fetch(`https://api.github.com/search/users?q=${term}`)
  .then(response => response.json())
  .then(data => renderUsers(data));
}

form.addEventListener('submit', userSearch);

