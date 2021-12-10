'use strict';

const {logLevel} = require('./config');
const winston = require('winston');
const {createLogger, transports, format} = winston;
const {combine, timestamp, printf} = format;

const myFormat = printf((args) => {
  const splat = Symbol.for('splat');
  const {level, message, [splat]: params} = args;
  return `${level.toUpperCase()} ${message} ${params || ''}`;
});

const logger = createLogger({
  level: logLevel,
  format: combine(
      timestamp(),
      myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'debug.log', level: 'debug'}),
  ],
});

module.exports = logger;
