beforeEach(function() {

    this.addMatchers({

        toBeInstanceOf: function(Clazz) {
            return this.actual instanceof Clazz;
        },

        toBeTypedOf: function(type) {
            return (typeof this.actual == type);
        }

    });

});
