const db = require("../db/connection");

exports.validarUsuario = async (req, res) => {
  const { correo, password } = req.query;
  try {
    const [rows] = await db.query(`CALL ValidarUsuario(?, ?)`, [correo, password]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
