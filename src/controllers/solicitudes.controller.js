const db = require("../db/connection");

exports.crearSolicitud = async (req, res) => {
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
  try {
    await db.execute(
      `UPDATE SolicitudUsuario SET status_id = (SELECT id FROM Status WHERE nombre = 'aprobado') WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: "Solicitud aprobada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
