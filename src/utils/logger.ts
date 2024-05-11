import { format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, colorize, label, timestamp, json, simple } = format;
const { Console, DailyRotateFile } = transports;
const dailyRotateFileObj = {
  format: combine(
    label({ label: '警告' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
  ),
  level: 'warn',
  dirname: 'warnOrError',
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '1m',
  maxFiles: '31d',
};

export const loggerWarnOrErrorFiles = createLogger({
  level: 'warn',
  transports: [
    new Console({
      format: combine(colorize(), simple()),
    }),
    new DailyRotateFile(dailyRotateFileObj),
  ],
  exceptionHandlers: [new DailyRotateFile(dailyRotateFileObj)],
  rejectionHandlers: [new DailyRotateFile(dailyRotateFileObj)],
});

export const logger = createLogger({
  level: 'debug',
  transports: [
    new Console({
      format: combine(colorize(), simple()),
    }),
    new DailyRotateFile({
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
      level: 'debug',
      dirname: 'debug',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '1m',
      maxFiles: '31d',
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(dailyRotateFileObj)],
  rejectionHandlers: [new DailyRotateFile(dailyRotateFileObj)],
});
