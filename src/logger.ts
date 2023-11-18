interface LogCollection {
  created: string[]
  updated: string[]
}

class Logger {
  private logCollection: LogCollection = { created: [], updated: [] }

  info(message: string) {
    console.log(message);
  }

  error(message: string) {
    return new Error(message);
  }

  setLogMessage(status: 'created' | 'updated', msg: string) {
    this.logCollection[status] = [...this.logCollection[status], msg];
  }

  getCreatedStatusLogs() {
    if (!this.logCollection.created.length) {
      console.log('THERE WERE NOT RECORDS CREATED.');
      return;
    }
    console.log('THE FOLLOWING ITEMS WERE ADDED TO THE INVENTORY:')
    this.logCollection.created.forEach(log => {
      console.log(log);
    });
  }

  getUpdatedStatusLogs() {
    if (!this.logCollection.updated.length) {
      console.log("THERE WERE NOT RECORDS UPDATED.");
      return;
    }
    console.log('THE FOLLOWING ITEMS WERE UPDATED:')
    this.logCollection.updated.forEach(log => {
      console.log(log);
    });
  }
}

const logger = new Logger();

export default logger;