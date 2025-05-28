const db = require("../db/connection");
const { subirBase64AS3 } = require("../utils/s3Uploader");

exports.crearPublicacion = async (req, res) => {
  const { UserId, Title, Content, image_base64, categoria_id } = req.body;
  if (!UserId || !Title || !Content || !image_base64 || !categoria_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const image_url = await subirBase64AS3(image_base64, "publicaciones");
    console.log(image_url)
    await db.execute(
      `INSERT INTO Publicacion (UserId, Title, Content, image_url, status_id, categoria_id)
       VALUES (?, ?, ?, ?, (SELECT id FROM Status WHERE nombre = 'pendiente'), ?)`,
      [UserId, Title, Content, image_url, categoria_id]
    );
    res.status(201).json({ message: "Publicación creada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aprobarPublicacion = async (req, res) => {
  try {
    await db.execute(
      `UPDATE Publicacion SET status_id = (SELECT id FROM Status WHERE nombre = 'aprobado') WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: "Publicación aprobada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.publicacionesAprobadas = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Publicacion WHERE status_id = (SELECT id FROM Status WHERE nombre = 'aprobado')`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.publicacionesAprobadasPorCategoria = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Publicacion WHERE categoria_id = ? AND status_id = (SELECT id FROM Status WHERE nombre = 'aprobado')`,
      [req.params.categoria_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.publicacionesPorUsuarioYStatus = async (req, res) => {
  if (!req.params.userId || !req.query.status) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  const { userId } = req.params;
  const { status } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Publicacion WHERE UserId = ? AND status_id = (SELECT id FROM Status WHERE nombre = ?)`,
      [userId, status]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
