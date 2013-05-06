(function() {
  var bBeat, bBeatNode, context, started;

  context = new webkitAudioContext();

  bBeat = new BinauralBeat(context);

  bBeatNode = bBeat.getNode();

  bBeatNode.connect(context.destination);

  started = false;

  $(".btn").click(function(e) {
    if (started === false) {
      bBeat.start();
      return started = true;
    }
  });

  $("#btn-sine").click(function() {
    return bBeat.setWaveType("sine");
  });

  $("#btn-square").click(function() {
    return bBeat.setWaveType("square");
  });

  $("#btn-triangle").click(function() {
    return bBeat.setWaveType("triangle");
  });

  $("#btn-sawtooth").click(function() {
    return bBeat.setWaveType("sawtooth");
  });

  $("#sldr-freq").change(function(e) {
    var freq;

    freq = Number(e.target.value);
    return bBeat.setFrequency(freq);
  });

  $("#sldr-beat").change(function(e) {
    var beats;

    beats = Number(e.target.value);
    return bBeat.setBeat(beats);
  });

  $("#sldr-volume").change(function(e) {
    var volume;

    volume = Number(e.target.value);
    return bBeat.setVolume(volume / 100);
  });

  $(".slider").trigger("change");

  $('.btn').click();

}).call(this);
