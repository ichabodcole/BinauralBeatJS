###
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
###
class window.BinauralBeat
	constructor: (@context, @freq=440, @beat=5, @waveType="sine")->
		@userVolume = 1
		# @leftChannel  = null
		# @rightChannel = null
		# @defaultfadeLength = 2
		@masterGain = @context.createGain()
		# @compressor = @context.createDynamicsCompressor()
		# @channelMerger = @context.createChannelMerger()
		@waveTypes = {sine:0, square:1, sawtooth:2, triangle:3}

		# @createChannels()
		# @setWaveType(@waveType)
		# @mergeChannels()
		# return @channelMerger.connect(@masterGain)

	# createChannels: ->
	# 	@leftChannel  = @createChannel(@getFreqLeft())
	# 	@rightChannel = @createChannel(@getFreqRight())
	# 	null

	# createChannel: (freq)->
	# 	osc = @context.createOscillator()
	# 	osc.frequency.value = freq
	# 	return osc

	# mergeChannels: ->
	# 	@leftChannel.connect(@channelMerger, 0, 0)
	# 	@rightChannel.connect(@channelMerger, 0, 1)
	# 	null

	# getFreqLeft: ->
	# 	freq = @freq - @getBeatSplit()
	# 	return freq

	# getFreqRight: ->
	# 	freq = @freq + @getBeatSplit()
	# 	return freq

	# getBeatSplit: ->
	# 	return @beat / 2

	# setGain: (gain)->
	# 	@masterGain.gain.value = gain
	# 	null

	# start: ->
	# 	@leftChannel.start(0)
	# 	@rightChannel.start(0)
	# 	null

	# stop: ->
	# 	@leftChannel.stop(0)
	# 	@rightChannel.stop(0)
	# 	null

	# #Public Methods
	getNode: ->
		return @masterGain
		null

	setBeat: (@beat)->
		# @setFrequency(@freq)
		null

	setFrequency: (@freq)->
		# @leftChannel.frequency.value = @getFreqLeft()
		# @rightChannel.frequency.value = @getFreqRight()
		null

	setWaveType: (@waveType)->
		# @waveTypeNum = @waveTypes[@waveType]
		# @leftChannel.type = @rightChannel.type = @waveType

	setVolume: (volume)->
		volume = 0 if volume < 0
		volume = 1 if volume > 1
		@userVolume = volume
		# @setGain(volume)
		null

	# mute: (bool)->
	# 	@setGain(0)
	# 	null

	# unmute: ->
	# 	@setGain(@userVolume)
	# 	null

	# fadeTo: (value, fadeLength)->
	# 	fadeLength = fadeLength || @defaultfadeLength
	# 	currentTime = @context.currentTime
	# 	#time the fade should complete
	# 	fadeTime = currentTime + fadeLength
	# 	#set the start time
	# 	@masterGain.gain.setValueAtTime(@userVolume, currentTime)
	# 	@masterGain.gain.linearRampToValueAtTime(value, fadeTime)

	# fadeOut: (fadeLength)->
	# 	fadeLength = fadeLength || @defaultfadeLength
	# 	@fadeTo(0, fadeLength)

	# fadeIn: (fadeLength)->
	# 	fadeLength = fadeLength || @defaultfadeLength
	# 	@fadeTo(@userVolume, fadeLength)

	# end: ->
	# 	@stop()
