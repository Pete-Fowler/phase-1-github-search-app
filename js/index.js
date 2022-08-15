const form = document.querySelector('#github-form');

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
    const linkP = document.createElement('p');
    const link = document.createElement('a');
    link.setAttribute('href', key.html_url);
    link.textContent = 'View Github page';
    linkP.append(link);

    const li = document.createElement('li');
    li.append(name, avatar, linkP);
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

