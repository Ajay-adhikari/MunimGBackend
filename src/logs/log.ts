import winston from 'winston';
import path from 'path';

// Get the current date in YYYY-MM-DD format
const dateString = new Date().toISOString().split('T')[0];

// Create a daily log file in the 'logs' directory
const logFilePath = path.join(__dirname, 'logs', `${dateString}.log`);

const log = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});

export default log;
