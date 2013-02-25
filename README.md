BinauralJS
==========

A Javascript/CoffeeScript library for generating binaural beats using the Web Audio API.
More on binaural beats <a target="_blank" href="http://en.wikipedia.org/wiki/Binaural_beats">Here</a>
Currently includes White, Brown, and Pink noise types

### Basic Usage
    context = new webkitAudioContext()
    bn1 = new BinauralBeat(context, frequency, beatRate, [type="sine", "square", "sawtooth", "triangle"])
    bn1.setVolume(0.5)
    bn1Node = bn1.getNode()
    bn1Node.connect(context.destination)
