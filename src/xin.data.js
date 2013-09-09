(function() {
    "use strict";

    window.xin = window.xin || {};

    var Repository,
        S4,
        defaultOptions = {
            host: location.host.replace(/[.\/\\\s]/, '-'),
            name: 'data'
        },
        adapters = {};

    var defaults = function(obj, def) {
        for(var i in def) {
            if (!obj[i]) {
                obj[i] = def[i];
            }
        }

        return obj;
    };

    var extend = function(obj, def) {
        for(var i in def) {
            obj[i] = def[i];
        }

        return obj;
    };

    S4 = function () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    Repository = function(options, callback) {
        var adapter;

        if (!(this instanceof Repository)) {
            return new Repository(options, callback);
        }

        this.options = options = defaults(options || {}, defaultOptions);

        if (!(this.options.adapter instanceof Array)) {
            adapter = [ this.options.adapter ];
        } else {
            adapter = this.options.adapter;
        }

        for(var i in adapter) {
            adapter = Repository.adapter(adapter);
            if (adapter) {
                break;
            }
        }
        if (!adapter) {
            throw new Error('No adapter found', options.adapter);
        }

        extend(this, adapter);

        this.init(callback);
    };

    Repository.prototype = {
        uuid: function() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
    };

    Repository.adapter = function(name, adapter) {
        if (!name) {
            throw new Error('Wrong parameters');
        }

        if (adapter) {
            adapters[name] = adapter;
            if (!defaultOptions.adapter) {
                defaultOptions.adapter = name;
            }
        } else {
            return adapters[name] || null;
        }
    };

    window.xin.data = {
        Repository: Repository
    };

})();