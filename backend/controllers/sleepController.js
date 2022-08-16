const User = require("../models/userModel");
const Sleep = require("../models/sleepModel");

const removeTime = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const createSleepEntry = async (req, res) => {
  const { sleepTime, wakeUpTime, date } = req.body;

  if (!sleepTime || !wakeUpTime || !date) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({
      message: "User not found!",
    });
  }

  const transformedDate = removeTime(new Date(date));

  const sleep = await Sleep.find({ user: req.user.id, date: transformedDate });

  if (sleep.length > 0) {
    return res.status(412).json({
      message: "There is already a sleep entry for that date!",
    });
  }

  const newSleep = await Sleep.create({
    sleepTime,
    wakeUpTime,
    date: transformedDate,
    user: req.user.id,
  });

  res.status(201).json(newSleep);
};

const getSleepEntries = async (req, res) => {
  const user = await User.findById(req.user.id);

  const daysBack = parseInt(req.query.daysBack || 7);

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const startFilterDate = new Date().setDate(new Date().getDate() - daysBack);

  const sleepEntries = await Sleep.find({
    user: req.user.id,
    date: { $gte: startFilterDate, $lt: new Date() },
  }).sort({
    date: -1,
  });

  res.status(200).json(sleepEntries);
};

const deleteSleepEntry = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({
      message: "Invalid user",
    });
  }

  const sleep = Sleep.find({ user: req.user.id, _id: req.params.id });

  if (!sleep) {
    return res.status(401).json({
      message: "The given entry is not found",
    });
  }

  const deletedSleep = await Sleep.deleteOne({
    _id: req.params.id,
    user: req.user.id,
  });
  res.status(201).json({ message: "Successfully removed" });
};

module.exports = {
  createSleepEntry,
  getSleepEntries,
  deleteSleepEntry,
};
