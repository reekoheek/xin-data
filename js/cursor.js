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

(function(root, factory) {
  'use strict';

  root.xin = root.xin || {};
  root.xin.data = root.xin.data || {};
  root.xin.data.Cursor = factory(root, root.xin);

})(this, function(root, xin) {
  'use strict';

  var Cursor = function(collection, criteria) {
    if (!(this instanceof Cursor)) {
      return new Cursor.apply(null, arguments);
    }

    Object.defineProperties(this, {

      collection: {
        value: collection,
        enumerable: false,
        writable: false,
        configurable: false,
      },

      criteria: {
        value: criteria,
        enumerable: true,
        writable: true,
        configurable: true,
      },

      _skip: {
        value: 0,
        enumerable: true,
        writable: true,
        configurable: true,
      },

      _limit: {
        value: -1,
        enumerable: true,
        writable: true,
        configurable: true,
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

  Cursor.prototype.fetch = function(parameters) {
    console.log('Cursor fetching ...', this.criteria);
    return xin.data.get(this.collection.adapter)
        .fetch(this, parameters);
  };

  Cursor.prototype.first = function(parameters) {
    console.log('Cursor fetching first ...', this.criteria);
    this.limit(1);
    return xin.data.get(this.collection.adapter)
        .fetch(this, parameters)
        .then(function(entries) {
          return entries[0];
        });
  };

  return Cursor;
});