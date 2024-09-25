const path = require('path');
const fs = require('fs');

// Errors log file:
const errorsLogFile = path.resolve(__dirname, "../errors.log");
const activitiesLogFile = path.resolve(__dirname, "../activities.log");

// Log error:
function logError(message, err) {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    if (typeof err === "string") msgToLog += err + "\n"; // E.g. throw new "Blah..." in some internal library.
    if (err?.stack) msgToLog += `Stack: ${err.stack}\n`;
    msgToLog += "----------------------------------------------------------------------------------------------------\n";
    fs.appendFile(errorsLogFile, msgToLog, () => { }); // Do nothing if fail to log.
}

// Log activity:
function logActivity(message) {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    msgToLog += "----------------------------------------------------------------------------------------------------\n";
    fs.appendFile(activitiesLogFile, msgToLog, () => { }); // Do nothing if fail to log.
}

module.exports = {
    logError,
    logActivity
};
