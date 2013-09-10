(function() {

    "use strict";

    var storage = {};
    var adapter = {
        name: 'memory',

        init: function(callback) {
            var that = this;
            setTimeout(function() {
                if (callback) {
                    callback(null, that);
                }
            });
        },

        save: function(object, callback) {
            var id = this.uuid();
            var index, value;
            if (!object) {
                var err = {
                    code: "001",
                    message: "Cannot save while object is null"
                };
                if (callback) { return callback(err, null); }
                throw new Error(err);
            }
            // Creating
            object.id = id;
            storage[id] = object;
            if (callback) { return callback(null, object); }
        },

        // FIXME: Update should updating record with much more modification
        // Object should be wrapped in array :/
        // So it should be: repo.update({'x':'y'}, [{'x':'z'},{'i':'j'}], callback)
        update: function(criteria, object, callback) {
            var index, value, updateIndex, updateValue;
            if (!object) {
                var err = {
                    code: "002",
                    message: "Will not update anything"
                };
                if (callback) { return callback(err, null); }
                throw new Error(err);
            }
            for(var x in criteria) { index = x; value = criteria[x]; }
            for(var y in object) { updateIndex = y; updateValue = object[y]; }
            for(var i in storage) {
                for(var j in storage[i]) {
                    if (index == j && value == storage[i][j]) {
                        storage[i][j] = updateValue;
                        if (callback) { return callback(null, object); }
                    }
                }
            }
        },
        get: function(options, callback) {
            var index, value;
            for(var x in options) {
                index = x;
                value = options[x];
            }
            for(var i in storage) {
                for(var j in storage[i]) {
                    if (index == j && value == storage[i][j]) {
                        if (typeof callback == "function") { return callback(storage[i]); }
                        return storage[i];
                    }
                }
            }
            if (typeof callback == "function") { return callback(null); }
            return null;
        },

        all: function(callback) {
            if (typeof callback == "function") { return callback(storage); }
            return storage;
        },

        remove: function(options, callback) {
            var index, value;
            for(var x in options) {
                index = x;
                value = options[x];
            }
            for(var i in storage) {
                for(var j in storage[i]) {
                    if (index == j && value == storage[i][j]) {
                        delete storage[i];
                        if (typeof callback == "function") { return callback(); }
                    }
                }
            }
        },

        nuke: function(callback) {
            storage = {};
            if (typeof callback == "function") { return callback(); }
        }
    };

    xin.data.Repository.adapter('memory', adapter);

})();
