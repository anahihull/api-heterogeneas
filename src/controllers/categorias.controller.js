const db = require("../db/connection");

exports.getCategorias = async (req, res) => {
  try {
    const { id } = req.query;
    let query = 'SELECT * FROM portal.Categorias';
    let params = [];

    if (id) {
      query = 'SELECT * FROM portal.Categorias WHERE id = ?';
      params = [id];
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 