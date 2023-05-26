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
  const { receiver_mail, date_time, subject, audio_data } = request.body;
  pool.query(
    "INSERT INTO mail (sender_id, receiver_mail, date_time, subject,audio_data) VALUES ($1, $2, $3, $4, $5)",
    [sender_id, receiver_mail, date_time, subject, audio_data],

    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Mail created successfully`);
    }
  );
}


async function AddAndRetrieveUpdatedMails(userId, mailData) {
  const sender_id = parseInt(userId);
  const { receiver_mail, date_time, subject, audio_data } = mailData;
  await pool.query(
    "INSERT INTO mail (sender_id, receiver_mail, date_time, subject, audio_data) VALUES ($1, $2, $3, $4, $5)",
    [sender_id, receiver_mail, date_time, subject, audio_data]
  );

  const result = await pool.query(
    "SELECT * FROM mail WHERE receiver_mail = $1",
    [receiver_mail]
  );
  return result.rows;
}


async function getMailsByReceiverEmail(receiverEmail) {
  const result = await pool.query(
    "SELECT * FROM mail WHERE receiver_mail = $1",
    [receiverEmail]
  );
  return result.rows;
}


export { getMailByUserId, createMail, AddAndRetrieveUpdatedMails, getMailsByReceiverEmail };
