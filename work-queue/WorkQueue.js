function WorkQueue(asyncOp, display) {
    this.asyncOp = asyncOp;
    this.display = display || defaultDisplay;
    this.working = [];
}

function work(x) {
    console.log("work", this.display(x));
    if (this.working.length > 0) {
        console.log("Already working", this.display(x));
        let tail = arrTail(this.working);
        let delayedWork = this.delayWork(tail, x);
        this.working.push(delayedWork);
        return delayedWork;
    } else {
        console.log("Starting work", this.display(x));
        let immediateWork = this.doWorkAndCleanUp(x);
        this.working.push(immediateWork);
        return immediateWork;
    }
}

function delayWork(tail, x) {
    console.log("delayWork", this.display(x));
    return tail.then(() => {
        console.log("Kicking off queued work", this.display(x));
        return this.doWorkAndCleanUp(x);
    });
}

function doWorkAndCleanUp(x) {
    console.log("doWorkAndCleanUp", this.display(x));
    return this.asyncOp(x).then(result => {
        this.working.shift();
        console.log("Finished work", this.display(x));
        return result;
    });
}

function arrTail(arr) {
    return arr.slice(arr.length - 1)[0];
}

const defaultDisplay = x => x;


WorkQueue.prototype.work = work;
WorkQueue.prototype.delayWork = delayWork;
WorkQueue.prototype.doWorkAndCleanUp = doWorkAndCleanUp;

module.exports = WorkQueue;
