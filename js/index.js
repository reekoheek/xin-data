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
  root.xin.data = factory(root, root.xin);

})(this, function(root, xin) {
  'use strict';

  var adapterProto = {
    fetch: function() {
      throw new Error('Adapter "' + this.name + '" does not implement fetch method yet');
    }
  };

  var data = {
    adapters: {},

    get: function(name) {
      if (this.adapters[name]) {
        return this.adapters[name];
      }

      throw new Error('Adapter "' + name + '" not found');
    },

    set: function(name, adapter) {
      adapter.name = name;
      xin.setPrototypeOf(adapter, adapterProto);
      this.adapters[name] = adapter;
    },
  };

  return data;
});