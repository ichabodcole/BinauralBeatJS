(function() {
  window.Renderer = (function() {
    function Renderer(width, height, visualisers) {
      this.width = width;
      this.height = height;
      this.visualisers = visualisers;
      this.context = this.createCanvas(this.width, this.height);
    }

    Renderer.prototype.createCanvas = function(width, height) {
      var canvas, container, context;

      canvas = document.createElement('canvas');
      canvas.setAttribute('class', 'audio-visualizer');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      context = canvas.getContext('2d');
      container = document.getElementsByClassName('container')[0];
      container.appendChild(canvas);
      return context;
    };

    Renderer.prototype.draw = function() {
      var visualiser, _i, _len, _ref, _results;

      this.context.clearRect(0, 0, this.width, this.height);
      _ref = this.visualisers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        visualiser = _ref[_i];
        _results.push(visualiser.draw(this.context));
      }
      return _results;
    };

    return Renderer;

  })();

}).call(this);
