const db = require("../db/connection");

exports.crearRespuesta = async (req, res) => {
  const { user_id, pregunta_id, response } = req.body;
  try {
    await db.execute(
      `INSERT INTO Respuestas (user_id, pregunta_id, response, status_id)
       VALUES (?, ?, ?, (SELECT id FROM Status WHERE nombre = 'pendiente'))`,
      [user_id, pregunta_id, response]
    );
    res.status(201).json({ message: "Respuesta creada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aprobarRespuesta = async (req, res) => {
  try {
    await db.execute(
      `UPDATE Respuestas SET status_id = (SELECT id FROM Status WHERE nombre = 'aprobado') WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: "Respuesta aprobada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respuestasAprobadasPorPregunta = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Respuestas WHERE pregunta_id = ? AND status_id = (SELECT id FROM Status WHERE nombre = 'aprobado')`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};