
class Logger {
  info(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.error(message);
  }
}

const logger = new Logger();

export default logger;