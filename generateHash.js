// generateHash.js
const bcrypt = require('bcrypt');

(async () => {
  const password = 'jander97';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
})();
