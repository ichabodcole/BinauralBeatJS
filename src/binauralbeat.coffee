###
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
###
class window.BinauralBeat

	# WaveType connstants
	@SINE = 0
	@SQUARE = 1
	@SAWTOOTH = 2
	@TRIANGLE = 3

	constructor: (ctx, options)->
		@input  = ctx.createGain()
		@output = ctx.createGain()

		# Defaults
		options 	 		 = options ? {}
		@frequency 		 = options.frequency ? 440
		@beatFrequency = options.beats ? 5
		@waveType  		 = options.waveType ? 0
		compressNodes  = options.compressNodes ? false

		# setup functions
		@_createInternalNodes(ctx)
		@_routeNodes(compressNodes)
		@setFrequency(@frequency)
		@setWaveType(@waveType)

	_createInternalNodes: (ctx)->
		@leftChannel   = ctx.createOscillator()
		@rightChannel  = ctx.createOscillator()
		@channelMerger = ctx.createChannelMerger()
		@compressor		 = ctx.createDynamicsCompressor();

	# Setup Audio Routing
	_routeNodes: (compressNodes)->
		@leftChannel.connect(@channelMerger, 0, 0)
		@rightChannel.connect(@channelMerger, 0, 1)
		# This can be helpful when passing other audio signals through this node
		if compressNodes
			@input.connect(@compressor)
			@channelMerger.connect(@compressor)
			@compressor.connect(@output)
		else
			@input.connect(@output)
			@channelMerger.connect(@output)

	_getChannelFrequency: (channelNum)->
		frequencyOffset = @beatFrequency / 2
		if channelNum == 0
			channelFrequency = @frequency - frequencyOffset
		else
			channelFrequency = @frequency + frequencyOffset
		return channelFrequency

	setFrequency: (freq)->
		@frequency = freq
		@leftChannel.frequency.value  = @_getChannelFrequency(0)
		@rightChannel.frequency.value = @_getChannelFrequency(1)

	setBeatFrequency: (beatFreq)->
		@beatFrequency = beatFreq
		@setFrequency(@frequency)

	setWaveType: (waveType)->
		@waveType = waveType
		@leftChannel.type = @rightChannel.type = @waveType

	setWaveTable: (waveTable)->
		@leftChannel.setWaveTable(waveTable)
		@rightChannel.setWaveTable(waveTable)

	start: (startTime)->
		startTime = startTime ? 0
		@leftChannel.start(startTime)
		@rightChannel.start(startTime)

	stop: (stopTime)->
		stopTime = stopTime ? 0
		@leftChannel.stop(stopTime)
		@rightChannel.stop(stopTime)

	connect: (dest)->
		this.output.connect(if dest.input then dest.input else dest)

	disconnect: ->
		this.output.disconnect();
