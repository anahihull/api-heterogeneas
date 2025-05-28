const db = require("../db/connection");
const { subirBase64AS3 } = require("../utils/s3Uploader");

exports.crearRecurso = async (req, res) => {
  if (!req.body.titulo || !req.body.descripcion || !req.body.materia_id || !req.body.recurso_base64) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const { titulo, descripcion, materia_id, recurso_base64 } = req.body;
  try {
    const recurso_url = await subirBase64AS3(recurso_base64, "recursos");
    await db.execute(
      `INSERT INTO Recurso (titulo, descripcion, materia_id, recurso_url, status_id)
       VALUES (?, ?, ?, ?, (SELECT id FROM Status WHERE nombre = 'pendiente'))`,
      [titulo, descripcion, materia_id, recurso_url]
    );
    res.status(201).json({ message: "Recurso creado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aprobarRecurso = async (req, res) => {
  try {
    await db.execute(
      `UPDATE Recurso SET status_id = (SELECT id FROM Status WHERE nombre = 'aprobado') WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: "Recurso aprobado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recursosPorStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Recurso WHERE status_id = (SELECT id FROM Status WHERE nombre = ?)`,
      [status]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recursosAprobadosPorMateria = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Recurso WHERE materia_id = ? AND status_id = (SELECT id FROM Status WHERE nombre = 'aprobado')`,
      [req.params.materia_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recursosPorUsuarioYStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT r.* FROM Recurso r JOIN Usuarios u ON r.UserId = u.UserId WHERE u.UserId = ? AND r.status_id = (SELECT id FROM Status WHERE nombre = ?)`,
      [userId, status]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
