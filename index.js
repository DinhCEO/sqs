require('dotenv').config({});

const sqs    = require('sqs');
const config = require('./config');

const serializer = require('./serializer.provider');
const CsvJob     = require('./job/CsvJob');

let queue = sqs({
    access: config.aws.access,
    secret: config.aws.secret,
    region: config.aws.region
});


(async () => {

    setInterval(async () => {
        let job = new CsvJob(new Date());

        queue.push('survey-system-bus', await serializer.serialize(job));
    }, 500);

})().catch(console.error);