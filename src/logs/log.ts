import winston from 'winston';
import path from 'path';

// Get the current date in YYYY-MM-DD format
const dateString = new Date().toISOString().split('T')[0];

// Create a daily log file in the 'logs' directory
const logFilePath = path.join(__dirname, 'logs', `${dateString}.log`);

// Define the logger
const log = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // File transport: Logs to a file
    new winston.transports.File({
      filename: logFilePath,
    }),
    // Console transport: Logs to the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors to console output
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});

export default log;
