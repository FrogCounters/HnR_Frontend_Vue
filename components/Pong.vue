<template>
  <div>
    <canvas id="gc" width="200" height="200" class="border touch-none"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Pong',
  props: {
    ws: {
      required: true,
    },
    starting: {
      required: true,
    }
  },
  data: function() {
    return {
      x: 0,
      y: 0,
      dx: 0.1,
      dy: 0.1,
      w: 0,
      h: 0,
      px: 100,
      py: 200-30,
      pw: 40,
      ph: 8,
      ballDiameter: 4,
      lastTick: 0,
      in: true,
      touched: false,
      gameRunning: false,
    }
  },
  mounted: function() {
    let canvas = document.getElementById('gc')
		let context = canvas.getContext('2d')
    this.canvas = canvas
    this.context = context
    this.w = canvas.width
    this.h = canvas.height

    // websocket
    let ws = this.ws
    ws.addEventListener('message', this.listener)

    // ticks
    setInterval(this.tick, 20)

    // listeners
    canvas.addEventListener("touchstart", this.touchstart);
    canvas.addEventListener("touchend", this.touchend);
    canvas.addEventListener("touchmove", this.touchmove);

    // start game in 1s
    setTimeout(() => {
      this.start(this.starting)
    }, 500);
  },
  methods: {
    start: function(start) {
      this.lastTick = Date.now()
      this.gameRunning = true
      if (start) {
      } else {
        this.hideBall()
      }
    },
    update: function() {
      // tick info
      let t = Date.now()
      let dt = t - this.lastTick
      this.lastTick = t

      // delta move
      let x = this.x
      let dx = this.dx
      let y = this.y
      let dy = this.dy

      let _dx = dt * this.dx
      let _dy = dt * this.dy
      let _x = x + _dx
      let _y = y + _dy

      if (_y > this.py && y <= this.py) {
        let __dx = (this.py - y) / _dy * _dx
        let __x = x + __dx
        if (__x > this.px && __x < this.px + this.pw) {
          this.x = __x; this.y = this.py; this.dx = dx; this.dy = -dy;
          return
        }
      }

      // move ball
      this.x = _x
      this.y = _y

      // wall bounce
      let tmp = this.bounce(this.x, this.dx, this.w);
      this.x = tmp[0]
      this.dx = tmp[1]
    },
    scoring: function() {
      if (this.y >= this.h) {
        console.log(this.y, this.h)
        this.lose()
      }
    },
    lose: function() {
      console.log("lose")
      this.gameRunning = false
    },
    opponent: function() {
      if (this.in && this.y < 0) {
        let payload = {
          'x': this.x,
          'y': this.y,
          'dx': this.dx,
          'dy': this.dy,
        }
        this.ws.send(JSON.stringify({"type": "update", "message": JSON.stringify(payload)}))
        this.hideBall()
      }
    },
    hideBall: function() {
      this.x = -10
      this.y = -10
      this.dx = 0
      this.dy = 0
      this.in = false
    },
    recvUpdate: function(message) {
      this.x = this.w - message['x']
      this.dx = -message['dx']
      this.y = -message['y']
      this.dy = -message['dy']
      this.in = true
      this.lastTick = Date.now()
    },
    bounce: function(x, dx, max) {
      if (x < 0) { 
        return [0, -dx]
      } else if (x > max) {
        return [max, -dx];
      } else {
        return [x, dx];
      }
    },
    draw: function() {
      let canvas = this.canvas;
      let context = this.context;

      // clear all
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height)

      // draw ball
      context.fillStyle = 'black';
      context.fillRect(this.x, this.y, this.ballDiameter, this.ballDiameter)

      // draw paddle
      context.fillRect(this.px, this.py, this.pw, this.ph)
    },
    tick: function() {
      if (this.gameRunning) {
        if (this.in) {
          this.update()
          this.scoring()
          this.opponent()
        }
        this.draw()
      }
    },
    cap: function(x, max) {
      if (x < 0) {
        return 0;
      } else if (x > max) {
        return max;
      } else {
        return x;
      }
    },
    touchstart: function(e) {
      if (this.touched) { return }
      this.touched = true
      let touch = e.touches[0]
      this.touchStartX = touch.clientX
      this.paddleStartX = this.px
    },
    touchend: function(e) {
      this.touched = false
    },
    touchmove: function(e) {
      let touch = e.touches[0]
      this.px = this.cap(this.paddleStartX + (touch.clientX - this.touchStartX), this.w-this.pw)
    },
    listener: function(e) {
      console.log(e)
      let data = JSON.parse(e['data'])
      if (data['type'] == 'connect') {
        let message = JSON.parse(data['message'])
        this.start(message['start'])
      } else if (data['type'] == 'update') {
        let message = JSON.parse(data['message'])
        this.recvUpdate(message)
      }
    }
  }
}
</script>

<style>
.nuxt-logo {
  height: 180px;
}
</style>
