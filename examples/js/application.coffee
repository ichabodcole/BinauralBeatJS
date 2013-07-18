# Binaural Setup
context = new webkitAudioContext()
bBeat = new BinauralBeat(context)
leftChannel = bBeat.getChannel(0)
rightChannel = bBeat.getChannel(1)
# osc = context.createOscillator()
# osc.frequency.value = 200
gain = context.createGain()
analyserLeft  = context.createAnalyser()
analyserRight = context.createAnalyser()

bBeat.connect(gain)
gain.connect(context.destination)

leftChannel.connect(analyserLeft)
rightChannel.connect(analyserRight)

run = ->
    setTimeout ->
            # requestAnimationFrame(run)
            renderer.draw()
        ,50

canvas_width  = 800
canvas_height = 300
scale_left  = 0.5
scale_right = 0.5
points = 1024
visualizerLeft  = new AudioVisualizer(analyserLeft, 'red', points, scale_left)
visualizerRight = new AudioVisualizer(analyserRight, 'blue', points, scale_right)
renderer        = new Renderer(canvas_width, canvas_height, [visualizerLeft, visualizerRight])
run()
visualizerLeft.logData()
# analyser.connect(context.destination)
# osc.start(0)
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
$("#sldr-pitch").change (e)->
    pitch = Number(e.target.value)
    bBeat.setPitch(pitch)
    renderer.draw()

$("#sldr-beat").change (e)->
    beats = Number(e.target.value)
    console.log beats
    bBeat.setBeatRate(beats)
    renderer.draw()

$("#sldr-volume").change (e)->
    volume = Number(e.target.value)
    gain.gain.value = volume / 100

$("#btn-start").click (e)->
    bBeat.start()

$("#btn-stop").click (e)->
    bBeat.stop()

$(".slider").trigger("change")

# $('.btn').click();
# $("#btn-sine").click();


