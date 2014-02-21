BinauralBeatJS
==========

<p>A Javascript/CoffeeScript library for generating binaural beats using the Web Audio API. <a target="_blank" href="http://htmlpreview.github.com/?https://github.com/ichabodcole/BinauralBeatJS/blob/master/examples/index.html" title="BinauralBeatJS Demo">DEMO</a><br>
More on binaural beats <a target="_blank" href="http://en.wikipedia.org/wiki/Binaural_beats">Here</a></p>

### Installation
    bower install binauralbeatjs

### Basic Usage
    // Create a new AudioContext to connect to
    var context = new webkitAudioContext()

    // Create a BinauralBeat instance, options is a hash with the below defaults if nothing is provided.
    var bBeat = new BinauralBeat(context, options{pitch: 440, beatRate: 5, waveType: 0, compressNodes: false});

    // Create a new gain node to control volume
    var volume = context.createGain();

    // Connect to the BinauralBeat node to the gain node
    bBeat.connect(volume)

    // Connect the gain node to the context output.
    volume.connect(context.destination)

    // Control volume like this
    volume.gain.value = .8

    // Finally
    bBeat.start()

In addition to standard script linking, BinauralBeatJS is AMD compliant and works great with requirejs.