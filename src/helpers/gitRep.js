const git = require('simple-git')();

const gitRep =  {
  getLastTag: () => {
    return new Promise((resolve, rej) => {
      git.listRemote(['--tags', 'git@git.sami.int.thomsonreuters.com:collab-eikonmessenger/em-luna.git'],
        (err, res) => {
        if(err) return rej(err);
        const versionRegexp = new RegExp('\\d*\\.\\d*\\.\\d*');
        const lastTag = res.split('\n')
          .slice(0, -1)
          .map(elem => versionRegexp.exec(elem)[0])
          // https://stackoverflow.com/questions/40201533/sort-version-dotted-number-strings-in-javascript
          .sort((a, b) => a.localeCompare(b, undefined, { numeric:true }))
          .pop();
        resolve(lastTag);
      })
    })
  },
};

export default gitRep;
