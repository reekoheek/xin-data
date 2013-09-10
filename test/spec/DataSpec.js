(function() {

    describe('xin.data', function() {

        describe('Dependency', function() {
            it('can access localstorage', function() {
                expect(localStorage).toBeTypedOf("object");
            });

            it('has writable permission to localstorage', function() {
                expect(function() {
                    localStorage.clear();
                }).not.toThrow();
            });
        });

        describe('Repository', function() {

            it('can be constructed', function() {
                expect(new xin.data.Repository()).toBeInstanceOf(xin.data.Repository);
            });

            it('can be run as function', function() {
                expect(xin.data.Repository()).toBeInstanceOf(xin.data.Repository);
            });

            describe('CRUD', function() {
                it('can create a record', function() {
                    var next = false;

                    expect(function() {
                        var repo = new xin.data.Repository({}, function() {
                            repo.save({'name':'dodi', 'age': 21});
                            repo.save({'name':'budi', 'age': 22});
                            next = true;
                        });
                    }).not.toThrow();

                    waitsFor(function() {
                        return next;
                    });
                });

                it('can update a record', function() {
                    var repo = new xin.data.Repository({}, function() {
                        repo.save({'name':'susi', 'age': 20});
                        repo.all(function(err, data) {
                            var obj = data[0];
                            obj.name = "nunu";
                            repo.save(obj);
                            repo.get(data[0].key, function(err, record) {
                                expect(record).not.toEqual(obj);
                            });
                        });
                    });
                });

                describe('can read (a) record(s) which has been writen', function() {
                    it('can get all records', function() {
                        var repo = new xin.data.Repository({}, function() {
                            repo.save({'name':'banu', 'age': 20});
                            expect(function() {
                                repo.all(function(err, data) {
                                    if (err) throw new Error(err.message);
                                });
                            }).not.toThrow();
                        });
                    });

                    it('can get a single record', function() {
                        var repo = new xin.data.Repository({}, function() {
                            repo.save({'name':'susi', 'age': 20});
                            repo.all(function(err, data) {
                                expect(function() {
                                    repo.get(data[0].key, function(err, record) {
                                        if (err) throw new Error(err.message);
                                    });
                                }).not.toThrow();
                            });
                        });
                    });
                });

                describe('can delete (a) record(s)', function() {
                    var done = false;
                    var repo = new xin.data.Repository({}, function() {
                        repo.save({'name':'susi', 'age': 20});
                        repo.save({'name':'tuti', 'age': 22});
                        repo.save({'name':'noni', 'age': 23});
                        done = true;
                    });

                    waitsFor(function() {
                        return done;
                    });

                    it('can delete a single record', function() {
                        runs(function() {
                            repo.all(function(err, data) {
                                var key = data[0].key.toString();
                                repo.remove(key);
                                repo.get(key, function(err, record) {
                                    expect(record).toBe(null);
                                });
                            });
                        });
                        done = true;
                    });

                    waitsFor(function() {
                        return done;
                    });

                    it('can delete all records', function() {
                        runs(function() {
                            repo.nuke();
                            repo.all(function(err, data) {
                                expect(data.length).toBe(0);
                            });
                        });
                    });
                });

            });

        });
    });

})();
