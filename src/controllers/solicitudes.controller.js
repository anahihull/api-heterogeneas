const db = require("../db/connection");

exports.crearSolicitud = async (req, res) => {
  if (!req.body || !req.body.nombre || !req.body.correo || !req.body.password || !req.body.motivo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const { nombre, correo, password, motivo } = req.body;
  try {
    await db.execute(
      `INSERT INTO SolicitudUsuario (nombre, correo, password, motivo, status_id)
       VALUES (?, ?, ?, ?, (SELECT id FROM Status WHERE nombre = 'pendiente'))`,
      [nombre, correo, password, motivo]
    );
    res.status(201).json({ message: "Solicitud creada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPendientes = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM SolicitudUsuario WHERE status_id = (SELECT id FROM Status WHERE nombre = 'pendiente')`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aprobarSolicitud = async (req, res) => {
  const { id } = req.params; // Changed from req.query to req.params to get the id from the URL parameter
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    await db.execute(
      `UPDATE SolicitudUsuario SET status_id = (SELECT id FROM Status WHERE nombre = 'aprobado') WHERE id = ?`,
      [id]
    );
    res.json({ message: "Solicitud aprobada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
