"use strict";

let request = require('request');
let q = require('q');

module.exports = function(authToken, auth, logRequests = true) {

    let headers = authToken ? {'X-Auth-Token': authToken} : null;

    this.get = function(url) {
        let deferred = q.defer();
        if (logRequests) console.log('\n========== GET  ========== ' + url);
        request.get({url: url, json: true, headers: headers, auth: auth}, (error, response, body) => {
            return error ? deferred.reject(error) : deferred.resolve(body)
        });
        return deferred.promise;
    };

    this.post = function(url, body) {
        let deferred = q.defer();
        if (logRequests) console.log('\n========== POST ========== ' + url + '\n\n' + JSON.stringify(body));
        request.post({url: url, body: body, json: true, headers: headers, auth: auth}, (error, response, body) => {
            return error ? deferred.reject(error) : deferred.resolve(body)
        });
        return deferred.promise;
    };

    this.put = function(url, body) {
        let deferred = q.defer();
        if (logRequests) console.log('\n========== PUT  ========== ' + url + '\n\n' + JSON.stringify(body));
        request.put({url: url, body: body, json: true, headers: headers, auth: auth}, (error, response, body) => {
            return error ? deferred.reject(error) : deferred.resolve(body)
        });
        return deferred.promise;
    };

};
