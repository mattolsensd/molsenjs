let Q = require('q');

let WorkQueue = require("./WorkQueue");

const asyncOp = (x) => {
    return Q.fcall(() => {
        console.log("processing", x);
        return x;
    });
};

let workQueue = new WorkQueue(asyncOp, x => "*" + x + "*");

let results = [];
results.push(workQueue.work('A'));
results.push(workQueue.work('B'));
results.push(workQueue.work('C'));

Q.all(results).then(res => console.log("results", res));
