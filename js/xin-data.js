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

  var xin = root.xin;

  xin.Component({
    is: 'xin-data',

    behaviors: [xin.ContainerBehavior],

    properties: {
      adapter: {
        type: String,
        required: true,
      },

      options: {
        type: Object,
      },
    },

    ready: function() {
      var _connection;
      Object.defineProperties(this, {
        connection: {
          get: function() {
            if (!_connection) {
              _connection = new xin.data.Connection(this.adapter, this.options);
            }
            return _connection;
          }
        },
        name: {
          get: function() {
            return this.connection.name;
          }
        }
      });
    },

    fetch: function() {
      return this.connection.fetch.apply(this.connection, arguments);
    },

    persist: function() {
      return this.connection.persist.apply(this.connection, arguments);
    },

    remove: function() {
      return this.connection.remove.apply(this.connection, arguments);
    },
  });
})(this);