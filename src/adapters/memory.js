(function() {

    var adapter = {

        name: 'memory',

        init: function(callback) {

        },

        save: function(object, callback) {

        },

        get: function(key, callback) {

        },

        all: function(callback) {

        },

        remove: function() {

        },

        nuke: function() {

        }
    };

    xin.data.Repository.adapter('memory', adapter);

})();