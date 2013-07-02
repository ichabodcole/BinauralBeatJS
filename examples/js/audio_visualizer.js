(function() {
  window.AudioVisualizer = (function() {
    function AudioVisualizer(analyser, color, points, scale_factor) {
      this.analyser = analyser;
      this.analyser.fftSize = points;
      this.color = color;
      this.points = points;
      this.num_bins = 512;
      this.scale_factor = scale_factor;
      this.data_array = new Uint8Array(this.analyser.frequencyBinCount);
      this.last_data = new Uint8Array(this.analyser.frequencyBinCount);
    }

    AudioVisualizer.prototype.averageData = function(data) {
      var i, last_value, num, _i, _len;

      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        num = data[i];
        last_value = this.last_data[i];
        data[i] = (num + last_value) * 0.5;
      }
      return data;
    };

    AudioVisualizer.prototype.drawBoxes = function(context, data, offset) {
      var i, num, x, y, _i, _len, _results;

      context.fillStyle = this.color;
      _results = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        num = data[i];
        x = i;
        y = num * this.scale_factor + offset;
        _results.push(context.fillRect(x, y, 1, -1));
      }
      return _results;
    };

    AudioVisualizer.prototype.drawLines = function(context, data, offset) {
      var i, num, x1, x2, y1, y2, _i, _len;

      context.strokeStyle = this.color;
      context.beginPath();
      context.lineWidth = 2;
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        num = data[i];
        x1 = i;
        y1 = num * this.scale_factor + offset;
        x2 = i + 1;
        y2 = data[i + 1] * this.scale_factor + offset;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
      }
      return context.stroke();
    };

    AudioVisualizer.prototype.draw = function(context) {
      var data, offset;

      data = this.getData(this.points);
      offset = 10;
      this.drawBoxes(context, data, offset);
      return this.last_data = data;
    };

    AudioVisualizer.prototype.logData = function() {
      return console.log(this.getData(1024));
    };

    AudioVisualizer.prototype.getData = function(size) {
      this.analyser.getByteTimeDomainData(this.data_array);
      return this.data_array;
    };

    return AudioVisualizer;

  })();

}).call(this);
