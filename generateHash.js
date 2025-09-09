// generateHash.js
const bcrypt = require('bcrypt');

(async () => {
  const password = 'Kokobongo123';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
})();
