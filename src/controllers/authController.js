const bcrypt = require("bcrypt");

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const isUserValid = username === process.env.ADMIN_USER;
  const isPassValid = await bcrypt.compare(password, process.env.ADMIN_PASS);

  console.log("Tentativa de login:", { username, isUserValid, isPassValid });

  if (isUserValid && isPassValid) {
    req.session.user = username;
    console.log("Sessão criada após login:", req.session); // <-- AQUI
    return res.json({ message: "Login bem-sucedido" });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout feito" });
  });
};

// Checar autenticação
exports.checkAuth = (req, res) => {
  console.log("Checagem de autenticação - Sessão:", req.session); // <-- AQUI
  if (req.session.user) {
    return res.json({ authenticated: true, user: req.session.user });
  }
  res.status(401).json({ authenticated: false });
};