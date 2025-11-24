import * as path from 'path';
import winston from 'winston';

const logsDir = path.join(__dirname, '../../logs');

/**
 * The Logger module provides a centralized logging mechanism using Winston.
 */
const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ message: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${info.level.toUpperCase()}] ${info.timestamp}: ${info.message}`
        )
      )
    }),

    new winston.transports.File({
      filename: path.join(logsDir, 'logger.log'),
      format: winston.format.combine(
        winston.format.uncolorize({ level: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${info.level.toUpperCase()}] ${info.timestamp}: ${info.message}`
        )
      )
    })
  ]
});

export default Logger;
