var Resource = require('deployd/lib/resource')
    , Script = require('deployd/lib/script')
    , util = require('util')
    , debug = require('debug')('dpd-freetext-query')
    , request = require('request')
    , parseString = require('xml2js').parseString;

function FreetextResource() {
    Resource.apply(this, arguments);
}
util.inherits(FreetextResource, Resource);

FreetextResource.label = "Freetext-Query";
FreetextResource.events = ["get"];

module.exports = FreetextResource;

FreetextResource.prototype.clientGeneration = true;

FreetextResource.prototype.handle = function(ctx, next) {

    var slf = this;
    var domain = {
        query: ctx.query,
        body: ctx.body,
        requestFactory: function () { return request; },
        respond: function(result) {
            ctx.done(null, result);
        },
        xmlParser: { parseString: parseString }
    };
    if (ctx.method === "GET" && this.events.get) {
        this.events.get.run(ctx, domain, function(err) {
            if (err) ctx.done(err);
        });
    } else {
        next();
    }
};
