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

  xin.Component({
    is: 'xin-model',

    properties: {
      find: Object,

      skip: {
        type: Number,
        value: 0,
      },

      entry: {
        type: Object,
        notify: true,
        value: function() {
          return {};
        }
      },

      parameters: {
        type: Object,
        value: function() {
          return {};
        }
      },

      autoFetch: Boolean,

      collection: Object,

      newInstance: Boolean,

    },

    fetch: function() {
      if (this.newInstance) {
        throw new Error('Cannot fetch new instance model');
      }

      if (!this.collection) {
        throw new Error(this.__getId() + ' Collection not bound!');
      }

      return this.collection
        .find(this.find)
        .first(this.parameters)
        .then(function(entry) {
          this.set('entry', entry);
          this.fire('fetch', entry);
          return entry;
        }.bind(this));
    },

    save: function() {
      if (!this.collection) {
        throw new Error(this.__getId() + ' Collection not bound!');
      }

      return this.collection.save(this.entry);
    }
  });
})(this);
