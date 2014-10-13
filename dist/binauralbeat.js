/*
BinauralBeatJS
v0.4.0
Author: Cole Reed
ichabodcole (AT) gmail.com

Copyright (c) 2014 Cole Reed, https://github.com/ichabodcole/

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
  var BinauralBeat;

  BinauralBeat = (function() {
    BinauralBeat.SINE = 'sine';

    BinauralBeat.SQUARE = 'square';

    BinauralBeat.SAWTOOTH = 'sawtooth';

    BinauralBeat.TRIANGLE = 'triangle';

    function BinauralBeat(ctx, options) {
      var _ref, _ref1, _ref2, _ref3;
      this.input = ctx.createGain();
      this.output = ctx.createGain();
      options = options != null ? options : {};
      this.pitch = (_ref = options.pitch) != null ? _ref : 440;
      this.beatRate = (_ref1 = options.beats) != null ? _ref1 : 5;
      this.waveType = (_ref2 = options.waveType) != null ? _ref2 : this.constructor.SINE;
      this.compressNodes = (_ref3 = options.compressNodes) != null ? _ref3 : false;
      this.started = false;
      this._createInternalNodes(ctx);
      this._routeNodes();
      this.setPitch(this.pitch);
      this.setWaveType(this.waveType);
    }

    BinauralBeat.prototype._createInternalNodes = function(ctx) {
      this.leftChannel = ctx.createOscillator();
      this.rightChannel = ctx.createOscillator();
      this.channelMerger = ctx.createChannelMerger();
      return this.compressor = ctx.createDynamicsCompressor();
    };

    BinauralBeat.prototype._routeNodes = function() {
      if (this.compressNodes) {
        this.input.connect(this.compressor);
        this.channelMerger.connect(this.compressor);
        return this.compressor.connect(this.output);
      } else {
        this.input.connect(this.output);
        return this.channelMerger.connect(this.output);
      }
    };

    BinauralBeat.prototype._startOscillators = function() {
      this.leftChannel.start(0);
      return this.rightChannel.start(0);
    };

    BinauralBeat.prototype._connectOscillators = function() {
      this.leftChannel.connect(this.channelMerger, 0, 0);
      return this.rightChannel.connect(this.channelMerger, 0, 1);
    };

    BinauralBeat.prototype._disconnectOscillators = function() {
      this.leftChannel.disconnect();
      return this.rightChannel.disconnect();
    };

    BinauralBeat.prototype._getChannelFrequency = function(channelNum) {
      var channelFrequency, frequencyOffset;
      frequencyOffset = this.beatRate / 2;
      if (channelNum === 0) {
        channelFrequency = this.pitch - frequencyOffset;
      } else {
        channelFrequency = this.pitch + frequencyOffset;
      }
      return channelFrequency;
    };

    BinauralBeat.prototype.getChannel = function(channel) {
      if (channel === 0) {
        return this.leftChannel;
      } else if (channel === 1) {
        return this.rightChannel;
      }
    };

    BinauralBeat.prototype.setPitch = function(pitchFreq) {
      this.pitch = pitchFreq;
      this.leftChannel.frequency.value = this._getChannelFrequency(0);
      return this.rightChannel.frequency.value = this._getChannelFrequency(1);
    };

    BinauralBeat.prototype.setBeatRate = function(beatRate) {
      this.beatRate = beatRate;
      return this.setPitch(this.pitch);
    };

    BinauralBeat.prototype.setWaveType = function(waveType) {
      this.waveType = waveType;
      return this.leftChannel.type = this.rightChannel.type = this.waveType;
    };

    BinauralBeat.prototype.setPeriodicWave = function(periodicWave) {
      this.leftChannel.setPeriodicWave(periodicWave);
      return this.rightChannel.setPeriodicWave(periodicWave);
    };

    BinauralBeat.prototype.start = function() {
      if (!this.started) {
        this._startOscillators();
        this.started = true;
      }
      return this._connectOscillators();
    };

    BinauralBeat.prototype.stop = function() {
      return this._disconnectOscillators();
    };

    BinauralBeat.prototype.connect = function(dest) {
      return this.output.connect(dest.input ? dest.input : dest);
    };

    BinauralBeat.prototype.disconnect = function() {
      return this.output.disconnect();
    };

    return BinauralBeat;

  })();

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return BinauralBeat;
    });
  } else {
    if (typeof window === "object" && typeof window.document === "object") {
      window.BinauralBeat = BinauralBeat;
    }
  }

}).call(this);
