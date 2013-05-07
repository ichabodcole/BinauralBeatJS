var ctx, mediaElement;
ctx = null;
mediaElement = document.createElement('audio');

describe('BinauralBeat', function () {
  before(function () {
    ctx      = allen.getAudioContext();
    gainNode = ctx.createGain();
  }),
  beforeEach(function () {
    this.bBeat = new BinauralBeat(ctx);
  }),

  describe('constructor', function () {
    it ('should return an instance of BinauralBeat', function () {
      expect(this.bBeat).to.be.instanceOf(BinauralBeat);
    });
  }),

  describe('properties', function () {
    it ('should have an input property which is an AudioNode', function () {
      expect(allen.isAudioNode(this.bBeat.input)).to.equal(true);
    }),
    it ('should have an output property which is an AudioNode', function () {
      expect(allen.isAudioNode(this.bBeat.output)).to.equal(true);
    }),
    it ('should have a frequency property set to 440', function () {
      expect(this.bBeat.frequency).to.equal(440);
    }),
    it ('should have a beatFrequency property set to 5', function () {
      expect(this.bBeat.beatFrequency).to.equal(5);
    }),
    it ('should have a waveType property set to 0', function () {
      expect(this.bBeat.waveType).to.equal(0);
    });
  }),

  describe('setFrequency', function () {
    it ('should have a method setFrequency', function () {
      expect(this.bBeat).to.respondTo('setFrequency');
    });
  }),

  describe('setBeatFrequency', function () {
    it ('should have a method setBeatFrequency', function () {
      expect(this.bBeat).to.respondTo('setBeatFrequency');
    });
  }),

  describe('setWaveType', function () {
    it ('should have a method setWaveType', function () {
      expect(this.bBeat).to.respondTo('setWaveType');
    });
  });

  describe('setWaveTable', function () {
    it ('should have a method setWaveTable', function () {
      expect(this.bBeat).to.respondTo('setWaveTable');
    }),
    it ('should take a WaveTable argument', function () {
      var _self = this;
      var waveTable = ctx.createWaveTable();
      expect(setWaveTable).to.not.throw();
      function setWaveTable () {
        _self.bBeat.setWaveTable(waveTable);
      }
    });
  }),

  describe('stop', function () {
    it ('should have a stop method', function () {
      expect(this.bBeat).to.respondTo('stop');
    });
  }),

  describe('start', function () {
    it ('should have a start method', function () {
      expect(this.bBeat).to.respondTo('start');
    });
  }),

  describe('connect', function () {
    it ('should have a method connect that takes an AudioNode', function () {
      var _self = this;
      expect(connect).to.not.throw();
      function connect () {
        _self.bBeat.connect(gainNode);
      }
    }),
    it ('should take a web audio component instance', function () {
      var _self = this;
      expect(connect).to.not.throw();
      function connect () {
        _self.bBeat.connect(new BinauralBeat(ctx));
      }
    });
  }),

  describe('disconnect', function () {
    it ('should have a method disconnect', function () {
      var _self = this;
      this.bBeat.connect(gainNode);
      expect(disconnect).to.not.throw();
      function disconnect (){
        _self.bBeat.disconnect();
      }
    });
  });
});