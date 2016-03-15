var api = {
  getBio(username){
    username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => res.json())
  },
  getRepos(username){
    username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  },
  getPopularUsers(){
    var sinceUserID = Math.floor(0 + Math.random() * 1000);
    var url = `https://api.github.com/users?since=${sinceUserID}`;
    return fetch(url).then((res) => res.json());
  },
  getNotes(username) {
    var username = username.toLowerCase().trim();
    var url = `https://githubNoteTakerApplication.firebaseIO.com/${username}.json`;
    return fetch(url).then((res) => res.json());
  },
  addNote(username, note) {
    var username = username.toLowerCase().trim();
    var url = `https://githubNoteTakerApplication.firebaseIO.com/${username}.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;
