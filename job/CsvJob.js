class CsvJob {
    constructor(time) {
        this.time = time;
    }

    work() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('CSV ' + this.time);
                resolve();
            }, 1000);
        });
    }
}

module.exports = CsvJob;