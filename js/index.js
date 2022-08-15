const form = document.querySelector('#github-form');

const repoSearch = (user) => {
  return fetch(`https://api.github.com/users/${user}/repos`)
  .then(res => res.json())
  .then(data => console.log(data));
}

const render = (data) => {
  const userList = document.querySelector('ul#user-list');
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
  .then(data => render(data));
}

form.addEventListener('submit', userSearch);

