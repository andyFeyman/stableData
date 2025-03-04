import * as winston from 'winston';

const { format } = winston;


const logger = winston.createLogger({
    level: 'info', // 日志级别： error, warn, info, verbose, debug, silly
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'ChainMonitor' }, // 可选：添加默认的元数据
    transports: [
      // 将日志输出到控制台
      new winston.transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      }),
      // 将日志输出到文件 (例如 xxx.log)
      new winston.transports.File({ filename: 'logs/chainMonitor.log' }),
      // 将错误日志输出到单独的文件 (例如 error.log)
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
  });

  export default logger;