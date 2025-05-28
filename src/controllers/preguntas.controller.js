const db = require("../db/connection");

exports.crearPregunta = async (req, res) => {
  const { fecha, content } = req.body;
  try {
    await db.execute(`INSERT INTO Preguntas (fecha, content) VALUES (?, ?)`, [fecha, content]);
    res.status(201).json({ message: "Pregunta creada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPreguntas = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM Preguntas`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.preguntasPorUsuarioYStatus = async (req, res) => {
  const { userId, status } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT * FROM Preguntas p
       JOIN Respuestas r ON r.pregunta_id = p.id
       WHERE r.user_id = ? AND r.status_id = (SELECT id FROM Status WHERE nombre = ?)`,
      [userId, status]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
