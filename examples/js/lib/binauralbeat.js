/*
BinauralBeatJS
v0.2.0
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
    BinauralBeat.SINE = 0;

    BinauralBeat.SQUARE = 1;

    BinauralBeat.SAWTOOTH = 2;

    BinauralBeat.TRIANGLE = 3;

    function BinauralBeat(ctx, options) {
      var _ref, _ref1, _ref2, _ref3;

      this.input = ctx.createGain();
      this.output = ctx.createGain();
      options = options != null ? options : {};
      this.frequency = (_ref = options.frequency) != null ? _ref : 440;
      this.beatFrequency = (_ref1 = options.beats) != null ? _ref1 : 5;
      this.waveType = (_ref2 = options.waveType) != null ? _ref2 : 0;
      this.compressNodes = (_ref3 = options.compressNodes) != null ? _ref3 : false;
      this._createInternalNodes(ctx);
      this._routeNodes();
      this.setFrequency(this.frequency);
      this.setWaveType(this.waveType);
    }

    BinauralBeat.prototype._createInternalNodes = function(ctx) {
      this.leftChannel = ctx.createOscillator();
      this.rightChannel = ctx.createOscillator();
      this.channelMerger = ctx.createChannelMerger();
      return this.compressor = ctx.createDynamicsCompressor();
    };

    BinauralBeat.prototype._routeNodes = function() {
      this.leftChannel.connect(this.channelMerger, 0, 0);
      this.rightChannel.connect(this.channelMerger, 0, 1);
      if (this.compressNodes) {
        this.input.connect(this.compressor);
        this.channelMerger.connect(this.compressor);
        return this.compressor.connect(this.output);
      } else {
        this.input.connect(this.output);
        return this.channelMerger.connect(this.output);
      }
    };

    BinauralBeat.prototype._getChannelFrequency = function(channelNum) {
      var channelFrequency, frequencyOffset;

      frequencyOffset = this.beatFrequency / 2;
      if (channelNum === 0) {
        channelFrequency = this.frequency - frequencyOffset;
      } else {
        channelFrequency = this.frequency + frequencyOffset;
      }
      return channelFrequency;
    };

    BinauralBeat.prototype.setFrequency = function(freq) {
      this.frequency = freq;
      this.leftChannel.frequency.value = this._getChannelFrequency(0);
      return this.rightChannel.frequency.value = this._getChannelFrequency(1);
    };

    BinauralBeat.prototype.setBeatFrequency = function(beatFreq) {
      this.beatFrequency = beatFreq;
      return this.setFrequency(this.frequency);
    };

    BinauralBeat.prototype.setWaveType = function(waveType) {
      this.waveType = waveType;
      return this.leftChannel.type = this.rightChannel.type = this.waveType;
    };

    BinauralBeat.prototype.setWaveTable = function(waveTable) {
      this.leftChannel.setWaveTable(waveTable);
      return this.rightChannel.setWaveTable(waveTable);
    };

    BinauralBeat.prototype.start = function(startTime) {
      startTime = startTime != null ? startTime : 0;
      this.leftChannel.start(startTime);
      return this.rightChannel.start(startTime);
    };

    BinauralBeat.prototype.stop = function(stopTime) {
      stopTime = stopTime != null ? stopTime : 0;
      this.leftChannel.stop(stopTime);
      return this.rightChannel.stop(stopTime);
    };

    BinauralBeat.prototype.connect = function(dest) {
      return this.output.connect(dest.input ? dest.input : dest);
    };

    BinauralBeat.prototype.disconnect = function() {
      return this.output.disconnect();
    };

    return BinauralBeat;

  })();

}).call(this);
