const http = require("http");
var version = process.env.HELLOWORLD_VERSION;

const winston = require('winston');
const moment = require('moment-timezone');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;    // log 출력 포맷 정의
});

const appendTimestamp = format((info, opts) => {
    if(opts.tz)
	      info.timestamp = moment().tz(opts.tz).format();
	return info;
});

const options = {
  // log파일
  /*file: {
    level: 'info',
    filename: `${appRoot}/logs/winston-test.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'winston-test' }),
      timestamp(),
      myFormat    // log 출력 포맷
    )
  },*/
  
  // 개발 시 console에 출력
  console: {
    level: 'info',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    format: combine(
	  label({ label: 'GR Test' }),
	  appendTimestamp({ tz: 'Asia/Seoul '}),
      myFormat
    )
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
  ],
  exitOnError: false, 
});

http.createServer(function (request, response) {

   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'})

   // Send the response body as "Hello World"
   response.end('Hello World\n')
}).listen(3000)

// Console will print the message
logger.info('Server running')
