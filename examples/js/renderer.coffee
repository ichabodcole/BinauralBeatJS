class window.Renderer
  constructor: (width, height, visualisers)->
    @width       = width
    @height      = height
    @visualisers = visualisers
    @context = @createCanvas(@width, @height)

  createCanvas: (width, height)->
    canvas = document.createElement('canvas')
    canvas.setAttribute('class', 'audio-visualizer')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    context = canvas.getContext('2d')

    container = document.getElementsByClassName('container')[0]
    container.appendChild(canvas)
    return context

  draw: ->
    @context.clearRect(0, 0, @width, @height)
    for visualiser in @visualisers
      visualiser.draw(@context)
