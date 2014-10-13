###
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
###
class BinauralBeat

  # WaveType constants
  @SINE     = 'sine'
  @SQUARE   = 'square'
  @SAWTOOTH = 'sawtooth'
  @TRIANGLE = 'triangle'

  constructor: (ctx, options)->
    @input  = ctx.createGain()
    @output = ctx.createGain()

    # Defaults
    options        = options ? {}
    @pitch         = options.pitch ? 440
    @beatRate      = options.beats ? 5
    @waveType      = options.waveType ? @constructor.SINE
    @compressNodes = options.compressNodes ? false
    @started       = false

    # setup functions
    @_createInternalNodes(ctx)
    @_routeNodes()
    @setPitch(@pitch)
    @setWaveType(@waveType)


  _createInternalNodes: (ctx)->
    @leftChannel   = ctx.createOscillator()
    @rightChannel  = ctx.createOscillator()
    @channelMerger = ctx.createChannelMerger()
    @compressor    = ctx.createDynamicsCompressor();

  # Setup Audio Routing
  _routeNodes: ()->
    # This can be helpful when passing other audio signals through this node
    if @compressNodes
      @input.connect(@compressor)
      @channelMerger.connect(@compressor)
      @compressor.connect(@output)
    else
      @input.connect(@output)
      @channelMerger.connect(@output)

  _startOscillators: ->
    @leftChannel.start(0)
    @rightChannel.start(0)

  _connectOscillators: ->
    @leftChannel.connect(@channelMerger, 0, 0)
    @rightChannel.connect(@channelMerger, 0, 1)

  _disconnectOscillators: ->
    @leftChannel.disconnect()
    @rightChannel.disconnect()

  _getChannelFrequency: (channelNum)->
    frequencyOffset = @beatRate / 2
    if channelNum == 0
      channelFrequency = @pitch - frequencyOffset
    else
      channelFrequency = @pitch + frequencyOffset
    return channelFrequency

  getChannel: (channel)->
    if channel == 0
      @leftChannel
    else if channel == 1
      @rightChannel

  setPitch: (pitchFreq)->
    @pitch = pitchFreq
    @leftChannel.frequency.value  = @_getChannelFrequency(0)
    @rightChannel.frequency.value = @_getChannelFrequency(1)

  setBeatRate: (beatRate)->
    @beatRate = beatRate
    @setPitch(@pitch)

  setWaveType: (waveType)->
    @waveType = waveType
    @leftChannel.type = @rightChannel.type = @waveType

  setPeriodicWave: (periodicWave)->
    @leftChannel.setPeriodicWave(periodicWave)
    @rightChannel.setPeriodicWave(periodicWave)

  start: ->
    unless @started
      @_startOscillators()
      @started = true
    @_connectOscillators()

  stop: ->
    @_disconnectOscillators()

  connect: (dest)->
    this.output.connect(if dest.input then dest.input else dest)

  disconnect: ->
    this.output.disconnect();

# Setup AMD or global object
if typeof define == 'function' && define.amd
  define ->
    return BinauralBeat
else
  if typeof window == "object" && typeof window.document == "object"
    window.BinauralBeat = BinauralBeat
