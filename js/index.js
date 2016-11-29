/**
 * @license
 * Copyright (c) 2015 Xinix Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

(function(root) {
  'use strict';

  var xin = root.xin || {};

  if (typeof xin.data === 'object') {
    return;
  }

  var adapters = {};
  xin.data = {
    register: function(name, adapter) {
      Object.setPrototypeOf(adapter, {
        name: name,
        fetch: function() {
          throw new Error('Adapter "' + name + '" does not implement fetch method yet');
        },
        persist: function() {
          throw new Error('Adapter "' + name + '" does not implement persist method yet');
        },
        remove: function() {
          throw new Error('Adapter "' + name + '" does not implement remove method yet');
        }
      });
      adapters[name] = adapter;
    },
    defaultOptions: {
      cacheAdapter: 'localstorage'
    }
  };

  /**
   * Connection
   */
  var Connection = xin.data.Connection = function(name, options) {
    var adapter = adapters[name];
    if (!adapter) {
      throw new Error('Adapter "' + name + '" not found');
    }

    this.options = options || {};

    Object.setPrototypeOf(this, adapter);

    if (this.initialize) {
      this.initialize();
    }
  };

  /**
   * Collection
   */

  var Collection = xin.data.Collection = function(uri, connection, options) {
    this.initialize(uri, connection, options);
  };

  var CollectionBehavior = xin.data.CollectionBehavior = Collection.prototype = {
    initialize: function(uri, connection, options) {
      this.uri = uri;
      this.connection = connection;
      this.options = options || {};
      this.cacheConnection = new Connection(xin.data.defaultOptions.cacheAdapter, {
        asCache: true
      });
    },

    find: function(criteria) {
      return new xin.data.Cursor(this, criteria);
    },

    newInstance: function() {
      return {};
    },

    save: function(row) {
      return this.connection.persist(this, row);
    },

    remove: function(model) {
      return this.connection.remove(this, model);
    },
  };

  if (xin.Behavior) {
    xin.Behavior('xin.data.CollectionBehavior', CollectionBehavior);
  }

  /**
   * Cursor
   */
  var Cursor = xin.data.Cursor = function(collection, criteria) {
    Object.defineProperties(this, {
      collection: {
        get: function() {
          return collection;
        }
      },

      connection: {
        get: function() {
          return collection.connection;
        }
      },

      cacheConnection: {
        get: function() {
          return collection.cacheConnection;
        }
      },

      criteria: {
        get: function() {
          if (criteria) {
            var t = typeof criteria;
            if (t === 'object') {
              return criteria;
            } else {
              return {$id: criteria};
            }
          }
          return criteria || null;
        }
      },

      _skip: {
        enumerable: true,
        writable: true,
        configurable: true,
        value: 0,
      },

      _limit: {
        enumerable: true,
        writable: true,
        configurable: true,
        value: -1,
      }
    });

  };

  Cursor.prototype.limit = function(limit) {
    if (arguments.length) {
      this._limit = limit;
      return this;
    } else {
      return this._limit;
    }
  };

  Cursor.prototype.skip = function(skip) {
    if (arguments.length) {
      this._skip = skip;
      return this;
    } else {
      return this._skip;
    }
  };

  Cursor.prototype._actualFetch = function(parameters) {
    return this.connection.fetch(this, parameters);
  };

  Cursor.prototype._cacheFetch = function(parameters) {
    return this.cacheConnection.fetch(this, parameters);
  };

  Cursor.prototype._cacheSave = function(collection, rows, parameters) {
    rows.forEach(function(row) {
      this.cacheConnection.persist(collection, row);
    }.bind(this));
  };

  Cursor.prototype.fetch = function(parameters) {
    console.log('Fetching "' + this.collection.uri + '" with criteria: ' + JSON.stringify(this.criteria));

    var options = this.collection.options;

    if (options.cache) {
      switch(options.cache) {
        case 'networkFirst':
          return this._actualFetch(parameters)
            .then(function(rows) {
              this._cacheSave(this.collection, rows, parameters);
              return rows;
            }.bind(this), function() {
              console.warn('fallback to cache');
              return this._cacheFetch(parameters);
            }.bind(this));
        default:
          return Promise.reject(new Error('Unimplemented cache strategy: ' + options.cache));
      }
    } else {
      return this._actualFetch(parameters);
    }
  };

  Cursor.prototype.first = function(parameters) {
    console.log('Fetching first "' + this.collection.uri + '" with criteria: ' + JSON.stringify(this.criteria));
    this.limit(1);
    return this.fetch(this, parameters)
        .then(function(entries) {
          return entries[0];
        });
  };
})(this);
