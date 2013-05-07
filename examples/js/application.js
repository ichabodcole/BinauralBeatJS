(function() {
  var bBeat, context, gain, started;

  context = new webkitAudioContext();

  bBeat = new BinauralBeat(context);

  gain = context.createGain();

  bBeat.connect(gain);

  gain.connect(context.destination);

  started = false;

  $(".btn").click(function(e) {
    if (started === false) {
      bBeat.start();
      return started = true;
    }
  });

  $("#btn-sine").click(function() {
    return bBeat.setWaveType(BinauralBeat.SINE);
  });

  $("#btn-square").click(function() {
    return bBeat.setWaveType(BinauralBeat.SQUARE);
  });

  $("#btn-triangle").click(function() {
    return bBeat.setWaveType(BinauralBeat.TRIANGLE);
  });

  $("#btn-sawtooth").click(function() {
    return bBeat.setWaveType(BinauralBeat.SAWTOOTH);
  });

  $("#sldr-freq").change(function(e) {
    var freq;

    freq = Number(e.target.value);
    return bBeat.setFrequency(freq);
  });

  $("#sldr-beat").change(function(e) {
    var beats;

    beats = Number(e.target.value);
    console.log(beats);
    return bBeat.setBeatFrequency(beats);
  });

  $("#sldr-volume").change(function(e) {
    var volume;

    volume = Number(e.target.value);
    return gain.gain.value = volume / 100;
  });

  $(".slider").trigger("change");

}).call(this);
