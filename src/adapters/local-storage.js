(function() {
    "use strict";

    var cache,
        storage = {
            get: function(key, def) {
                var val = localStorage[key];
                if (val) {
                    val = JSON.parse(val);
                }
                val = val || def || null;
                return val;
            },
            set: function(key, value) {
                if (value !== null) {
                    value = JSON.stringify(value);
                    localStorage[key] = value;
                } else {
                    delete localStorage[key];
                }
            }
        };

    var adapter = {

        name: 'local-storage',

        init: function(callback) {
            var that = this;
            setTimeout(function() {
                if (callback) {
                    callback(null, that);
                }
            });

            this.collectionKey = this.options.host + '.' + this.options.name;
            this.indexKey = this.collectionKey + '._index_';
        },

        save: function(object, callback) {
            var storageKey,
                index = storage.get(this.indexKey, []);

            if (!object.key) {
                object.key = this.uuid();
                storageKey = this.collectionKey + '.' + object.key;

                index.push(storageKey);
                storage.set(this.indexKey, index);
            } else {
                storageKey = this.collectionKey + '.' + object.key;
            }

            storage.set(storageKey, object);

            if (callback) {
                callback();
            }
        },

        get: function(key, callback) {
            var storageKey = this.collectionKey + '.' + key,
                row = storage.get(storageKey);

            if (callback) {
                callback(null, row);
            }
        },

        all: function(callback) {
            var index = storage.get(this.indexKey, []),
                results = [],
                row;
            for(var i in index) {
                row = storage.get(index[i]);
                results.push(row);
            }

            if (callback) {
                callback(null, results);
            }
        },

        remove: function(key, callback) {
            var index = storage.get(this.indexKey, []),
                storageKey = this.collectionKey + '.' + key,
                row = storage.set(storageKey, null),
                newIndex = [],
                found = false;

            for(var i in index) {
                if (index[i] == storageKey) {
                    found = true;
                    continue;
                }
                newIndex.push(index[i]);
            }

            if (found) {
                storage.set(this.indexKey, newIndex);
            } else {
            }

            if (callback) {
                callback();
            }
        },

        nuke: function(callback) {
            var index = storage.get(this.indexKey, []);

            for(var i in index) {
                storage.set(index[i], null);
            }

            storage.set(this.indexKey, []);

            if (callback) {
                callback();
            }
        }
    };

    xin.data.Repository.adapter('local-storage', adapter);
})();
