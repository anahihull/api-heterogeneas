const db = require("../db/connection");
const { subirBase64AS3 } = require("../utils/s3Uploader");

exports.crearEvento = async (req, res) => {
  const { fecha, titulo, descripcion, costo, evento_url } = req.body;
  try {
    await db.execute(
      `INSERT INTO Evento (fecha, titulo, descripcion, costo, evento_url, status_id)
       VALUES (?, ?, ?, ?, ?, (SELECT id FROM Status WHERE nombre = 'pendiente'))`,
      [fecha, titulo, descripcion, costo || null, evento_url]
    );
    res.status(201).json({ message: "Evento creado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.aprobarEvento = async (req, res) => {
  try {
    await db.execute(
      `UPDATE Evento SET status_id = (SELECT id FROM Status WHERE nombre = 'aprobado') WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: "Evento aprobado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eventosFiltradosPorStatus = async (req, res) => {
  const { status } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Evento WHERE status_id = (SELECT id FROM Status WHERE nombre = ?) ORDER BY fecha ASC`,
      [status]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
