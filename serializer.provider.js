const Serializer = require('./Serializer');
const CsvJob     = require('./job/CsvJob');

let serializer = new Serializer();


serializer
    .register(CsvJob, async job => job, async data => new CsvJob(data.time));

module.exports = serializer;
