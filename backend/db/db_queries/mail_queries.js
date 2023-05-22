import pool from "../db_pool.cjs";

async function getMailByUserId(request, response) {
  const id = parseInt(request.user);
  pool.query(
    "SELECT * FROM mail WHERE sender_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
}

async function createMail(request, response) {
  const sender_id = parseInt(request.user);
  const {
    receiver_mail,
    date_time,
    subject,
    audio_data,
  } = request.body;
  pool.query(
    "INSERT INTO project (sender_id, receiver_mail, datetime, subject,audio_data) VALUES ($1, $2, $3, $4, $5)",
    [sender_id, receiver_mail, date_time, subject,audio_data],

    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Mail created successfully`);
    }
  );
}

export { getMailByUserId, createMail };
