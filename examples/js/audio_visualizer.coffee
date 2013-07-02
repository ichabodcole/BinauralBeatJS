class window.AudioVisualizer
  constructor: (analyser, color, points, scale_factor)->
    @analyser         = analyser
    @analyser.fftSize = points
    @color            = color
    @points           = points
    @num_bins         = 512
    @scale_factor     = scale_factor
    @data_array       = new Uint8Array(@analyser.frequencyBinCount)
    @last_data        = new Uint8Array(@analyser.frequencyBinCount)

  averageData: (data)->
    for num, i in data
      last_value = @last_data[i]
      data[i] = (num + last_value) * 0.5
    return data

  drawBoxes:(context, data, offset) ->
    context.fillStyle = @color
    for num, i in data
      x = i
      y = num * @scale_factor + offset
      context.fillRect(x, y, 1, -1)

  drawLines: (context, data, offset)->
    context.strokeStyle = @color
    context.beginPath()
    context.lineWidth = 2
    for num, i in data
      x1 = i
      y1 = num * @scale_factor + offset

      x2 = i+1
      y2 = data[i+1] * @scale_factor + offset
      context.moveTo(x1, y1)
      context.lineTo(x2, y2)
    context.stroke()

  draw: (context)->
    # for x in [0.5..@canvas_width] by 20
    #   context.moveTo(x, 0)
    #   context.lineTo(x, @canvas_height)
    # context.strokeStyle = color
    # context.stroke()
    data = @getData(@points)
    # data = @averageData(new_data)

    # length = data.length
    # bin_size = Math.floor(length / @num_bins)
    # bars = 30
    offset = 10
    # @drawBoxes(context, data, offset)
    @drawBoxes(context, data, offset)

    @last_data = data
  # drawDashedLine:(context, startX, startY, endX, endY, dashSize, gapSize)->
  #   context.moveTo(startX, startY)
  #   context.lineTo(endX, endY)

  logData: ->
    console.log @getData(1024)

  getData: (size)->

    # @analyser.smoothingTimeConstant = 1
    # @analyser.getByteFrequencyData(dataArray)
    @analyser.getByteTimeDomainData(@data_array)
    @data_array
    # @analyser



