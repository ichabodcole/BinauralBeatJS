# Binaural Setup
context = new webkitAudioContext()

bBeat = new BinauralBeat(context)
#get the ending masterGain node from the BinauralBeat instance.
bBeatNode = bBeat.getNode()

bBeatNode.connect(context.destination)

# Interface Code
started = false
$(".btn").click (e)->
    if(started == false)
        bBeat.start()
        started = true

# Wave Type Buttons
$("#btn-sine").click ->
    bBeat.setWaveType("sine")

$("#btn-square").click ->
    bBeat.setWaveType("square")

$("#btn-triangle").click ->
    bBeat.setWaveType("triangle")

$("#btn-sawtooth").click ->
    bBeat.setWaveType("sawtooth")

# Slider Inputs
$("#sldr-freq").change (e)->
    freq = Number(e.target.value)
    bBeat.setFrequency(freq)

$("#sldr-beat").change (e)->
    beats = Number(e.target.value)
    bBeat.setBeat(beats)

$("#sldr-volume").change (e)->
    volume = Number(e.target.value)
    bBeat.setVolume(volume/100)

$(".slider").trigger("change")

$('.btn').click();
