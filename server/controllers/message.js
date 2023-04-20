const Messages = require("../model/message");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully." });

    return res.json({ msg: "failed to send message to the db" });
  } catch (err) {
    next(err);
    console.log("ERR O',", err)
  }
};

const getAllMessage = async (req, res, next) => {};

module.exports = { addMessage, getAllMessage };
