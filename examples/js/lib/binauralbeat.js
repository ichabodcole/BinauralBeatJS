/*
BinauralBeatJS
v1.0
Author: Cole Reed
ichabodcole (AT) gmail.com

Copyright (c) 2013 Cole Reed, https://github.com/ichabodcole/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function() {
  window.BinauralBeat = (function() {
    function BinauralBeat(context, freq, beat, waveType) {
      this.context = context;
      this.freq = freq != null ? freq : 440;
      this.beat = beat != null ? beat : 5;
      this.waveType = waveType != null ? waveType : "sine";
      this.userVolume = 1;
      this.masterGain = this.context.createGain();
    }

    BinauralBeat.prototype.getNode = function() {
      return this.masterGain;
      return null;
    };

    BinauralBeat.prototype.setBeat = function(beat) {
      this.beat = beat;
      return null;
    };

    BinauralBeat.prototype.setFrequency = function(freq) {
      this.freq = freq;
      return null;
    };

    BinauralBeat.prototype.setVolume = function(volume) {
      return null;
    };

    return BinauralBeat;

  })();

}).call(this);
