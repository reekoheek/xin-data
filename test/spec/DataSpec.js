(function() {

    describe('xin.data', function() {

        describe('default options', function() {
            var options;

            it('can read default options', function() {
                options = xin.data.options();
                expect(options).toBeTruthy();
                expect(options).toBeTypedOf('object');
            });

            it('can change options', function() {
                options = xin.data.options({
                    name: 'hello'
                });
                options = xin.data.options();
                expect(options.name).toEqual('hello');
            });

        });

        describe('Adapter', function() {
            it('can be added', function() {
                xin.data.Repository.adapter('dummy', {
                    name: 'dummy',
                    init: function() {
                        console.log('init dummy adapter');
                    }
                });

                var adapter = xin.data.Repository.adapter('dummy');
                expect(adapter.name).toEqual('dummy');
            });
        });

        describe('Repository', function() {
            it('can be constructed', function() {
                expect(new xin.data.Repository()).toBeInstanceOf(xin.data.Repository);
            });

            it('can be run as function', function() {
                expect(xin.data.Repository()).toBeInstanceOf(xin.data.Repository);
            });

            it('can write data', function() {
                var next = false;

                expect(function() {
                    var repo = new xin.data.Repository({name:'record'}, function() {
                        next = true;
                    });
                }).not.toThrow();

                waitsFor(function() {
                    return next;
                });

                runs(function() {
                    console.log('xx');
                });
            });

        });
    });

})();