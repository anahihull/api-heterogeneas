const db = require("../db/connection");

exports.getMaterias = async (req, res) => {
  try {
    const { id } = req.query;
    let query = 'SELECT * FROM portal.Materias';
    let params = [];

    if (id) {
      query = 'SELECT * FROM portal.Materias WHERE id = ?';
      params = [id];
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
