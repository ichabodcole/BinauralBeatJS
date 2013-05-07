# Binaural Setup
context = new webkitAudioContext()
bBeat = new BinauralBeat(context)
gain = context.createGain();

bBeat.connect(gain)
gain.connect(context.destination);
# Interface Code
started = false
$(".btn").click (e)->
    if(started == false)
        bBeat.start()
        started = true

# Wave Type Buttons
$("#btn-sine").click ->
    bBeat.setWaveType(BinauralBeat.SINE)

$("#btn-square").click ->
    bBeat.setWaveType(BinauralBeat.SQUARE)

$("#btn-triangle").click ->
    bBeat.setWaveType(BinauralBeat.TRIANGLE)

$("#btn-sawtooth").click ->
    bBeat.setWaveType(BinauralBeat.SAWTOOTH)

# Slider Inputs
$("#sldr-freq").change (e)->
    freq = Number(e.target.value)
    bBeat.setFrequency(freq)

$("#sldr-beat").change (e)->
    beats = Number(e.target.value)
    console.log beats
    bBeat.setBeatFrequency(beats)

$("#sldr-volume").change (e)->
    volume = Number(e.target.value)
    gain.gain.value = volume / 100

$(".slider").trigger("change")

# $('.btn').click();
