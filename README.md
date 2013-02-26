BinauralJS
==========

<p>A Javascript/CoffeeScript library for generating binaural beats using the Web Audio API. <a target="_blank" href="http://htmlpreview.github.com/?https://github.com/ichabodcole/BinauralJS/blob/master/example/app.html" title="NoiseGenJS Demo">DEMO</a><br>
More on binaural beats <a target="_blank" href="http://en.wikipedia.org/wiki/Binaural_beats">Here</a></p>

### Basic Usage
    context = new webkitAudioContext()
    bn1 = new BinauralBeat(context, frequency, beatRate, [type="sine", "square", "sawtooth", "triangle"])
    bn1.setVolume(0.5)
    bn1Node = bn1.getNode()
    bn1Node.connect(context.destination)
