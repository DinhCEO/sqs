require('dotenv').config({});

const sqs    = require('sqs');
const config = require('./config');

const serializer = require('./serializer.provider');

let queue = sqs({
    access: config.aws.access,
    secret: config.aws.secret,
    region: config.aws.region
});


(async () => {
    queue.pull('survey-system-bus', async (data, callback) => {
        try {
            let job = await serializer.deserialize(data);

            await job.work();
        } catch (e) {
            console.error('Failed job');
        }

        callback();
    });

})().catch(console.error);
