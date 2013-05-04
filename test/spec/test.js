var ctx, mediaElement;
ctx = null;
mediaElement = document.createElement('audio');

describe("BinauralBeat", function () {
  before(function () {
    ctx = allen.getAudioContext();
    bBeat = new BinauralBeat(ctx);
    // done();
  }),

  describe('User Volume', function () {
    it('should default to 1', function(){
      expect(bBeat.userVolume).to.equal(1);
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
    });
  }),

  describe('setBeat', function () {
    it ("should have a setBeat method", function () {
      expect(bBeat).to.respondTo('setBeat');
    });
  }),

  describe ('setVolume', function () {
    it ("should a setVolume method", function () {
      expect(bBeat).to.respondTo('setVolume');
    });
    // it('should normalize inputs to be above 0', function () {
    //   bBeat.setVolume(-1);
    //   expect(bBeat.getVolume).to.be.at.least(0);
    //   ();
    // });
  });
});