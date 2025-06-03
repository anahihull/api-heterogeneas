const db = require("../db/connection");

exports.getStatues = async (req, res) => {
  try {
    const { id } = req.query;
    let query = 'SELECT * FROM portal.Status';
    let params = [];

    if (id) {
      query = 'SELECT * FROM portal.Status WHERE id = ?';
      params = [id];
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
