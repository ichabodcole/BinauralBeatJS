var ctx, mediaElement;
ctx = null;
mediaElement = document.createElement('audio');

describe("BinauralBeat", function () {
  before(function () {
    ctx = allen.getAudioContext();
    bBeat = new BinauralBeat(ctx);
    // done();
  }),

  describe('Default Values', function () {
    describe('userVolume', function () {
      it('should default to 1', function(){
        expect(bBeat.userVolume).to.equal(1);
      });
    }),

    describe('beat', function () {
      it('should default to 5', function () {
        expect(bBeat.beat).to.equal(5);
      });
    }),

    describe('freq', function () {
      it('should default to 440', function () {
        expect(bBeat.freq).to.equal(440);
      });
    }),

    describe('waveType', function () {
      it('should default to "sine"', function () {
        expect(bBeat.waveType).to.equal('sine');
      });
    });
  });

  describe('getNode', function () {
    it('should have a getNode method', function () {
      expect(bBeat).to.respondTo('getNode');
    }),
    it('should return an AudioNode', function () {
      var node = bBeat.getNode();
      var isRegNode = allen.isRegularAudioNode(node);
      expect(isRegNode).to.be.true;
    });
  }),

  describe('setFrequency', function () {
    it ("should have a setFrequency method", function () {
      expect(bBeat).to.respondTo('setFrequency');
    }),
    it('should change the frequency value', function () {
      bBeat.setFrequency(500);
      expect(bBeat.freq).to.equal(500);
    });
  }),

  describe('setBeat', function () {
    it ("should have a setBeat method", function () {
      expect(bBeat).to.respondTo('setBeat');
    }),
    it ("should change the beat value", function () {
      bBeat.setBeat(3);
      expect(bBeat.beat).to.equal(3);
    });
  }),

  describe('setWaveType', function () {
    it('should have a setWaveType method', function () {
      expect(bBeat).to.respondTo('setWaveType');
    }),
    it('should change the wave type to a integer', function () {
      bBeat.setWaveType('square');
      expect(bBeat.waveType).to.equal('square');
    });
  }),

  describe ('setVolume', function () {
    it ("should a setVolume method", function () {
      expect(bBeat).to.respondTo('setVolume');
    }),
    it ("should change the user volume", function () {
      bBeat.setVolume(0.5);
      expect(bBeat.userVolume).to.equal(0.5);
    }),
    it('should normalize inputs to be above 0', function () {
      bBeat.setVolume(-1);
      expect(bBeat.userVolume).to.be.at.least(0);
    }),
    it('should normalize inputs to be below 1', function () {
      bBeat.setVolume(1.5);
      expect(bBeat.userVolume).to.be.at.most(1);
    });
  });
});