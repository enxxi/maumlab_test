import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as moment from 'moment-timezone';

const env = process.env.NODE_ENV;
console.log(env);

const appendTimestamp = winston.format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().tz(opts.tz).format();
  }
  return info;
});

// 로그 저장 파일 옵션
const dailyOptions = {
  level: env === 'production' ? 'info' : 'silly',
  datePattern: 'YYYY-MM-DD',
  dirname: 'logs',
  filename: 'app.log.%DATE%',
  maxFiles: 30,
  zippedArchive: true,
  colorize: true,
  handleExceptions: true,
  json: false,
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    //콘솔 출력 옵션 지정
    new winston.transports.Console({
      level: env === 'production' ? 'info' : 'silly',
      format:
        env === 'production'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(process.env.APP_NAME, {
                prettyPrint: true,
              }),
            ),
    }),

    new winstonDaily(dailyOptions),
  ],
  //포멧 지정
  format: winston.format.combine(
    appendTimestamp({ tz: 'Asia/Seoul' }),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} - ${info.level} [${process.pid}]: ${info.message}`;
    }),
  ),
});
