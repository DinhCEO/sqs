class BlowJob {

    constructor(user) {
        this.user = user;
    }

    work() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Aaaaaaaaaaa ' + this.user);
                resolve();
            }, 1000);
        });
    }
}

module.exports = BlowJob;
