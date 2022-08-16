const mongoose = require("mongoose");
const sleepSchema = mongoose.Schema(
  {
    sleepTime: {
      type: String,
      required: [true, "Please enter valid sleep time"],
    },
    wakeUpTime: {
      type: String,
      required: [true, "Please enter valid wake up time"],
    },
    date: {
      type: Date,
      required: [true, "Please enter a valid date"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sleep", sleepSchema);
