const bcrypt = require("bcrypt");

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const isUserValid = username === process.env.ADMIN_USER;
  const isPassValid = await bcrypt.compare(password, process.env.ADMIN_PASS);

  if (isUserValid && isPassValid) {
    req.session.user = username;
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
  if (req.session.user) {
    return res.json({ authenticated: true, user: req.session.user });
  }
  res.status(401).json({ authenticated: false });
};
