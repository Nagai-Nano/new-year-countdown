const colors = [
	"#ffffff",
	"#FF0000",
	"#33FF33",
	"#CCFF00",
	"#FF9900",
	"#3399FF",
	"#FF3399",
	"#CC0066",
	"#00FF00"
]

const randNum = num => (Math.floor(Math.random() * num))
const maxNum = (num1, num2) => Math.max(randNum(num1 + 1), num2)

class Fireworks {
	constructor(canvas) {
		this.radius = maxNum(5, 2)
		this.width = canvas.width
		this.height = canvas.height
    this.x = this.width / 2
    this.y = this.height
    this.color = colors[randNum(colors.length)]
    this.velocity = {
      x: this.randX(),
      y: Math.random() * 3 + 3
    }
    this.maxY = Math.random() * this.height / maxNum(6, 4) + this.height / maxNum(10, 2)
    this.life = false
	}

  randX() {
    if(maxNum(6, 3) > 3) {
      return Math.random() * maxNum(6, 2)
    }
    return Math.random() * maxNum(6, 3) - maxNum(5, 3) 
  }

	draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  maximumY(sparkArr) {
    if(this.y <= this.maxY) {
      this.life = true
      for(let i = 0; i < 10; i++) {
        sparkArr.push(new Spark(this.x, this.y, this.radius, this.color))
      }
    }

    if(this.x <= 0 || this.x >= this.width) {
      this.life = true
      for(let i = 0; i < 10; i++) {
        sparkArr.push(new Spark(this.x, this.y, this.radius, this.color))
      }
    }
  }

  update(ctx, sparkArr) {
    this.y -= this.velocity.y
    this.x += this.velocity.x
    this.maximumY(sparkArr)
    this.draw(ctx)
  }
}

class Spark {
	constructor(x, y, radius, color) {
		this.x = x
    this.y = y
    this.radius = radius / 2
    this.color = color
    this.velocity = {
      x: Math.random() * 3 - 1,
      y: Math.random() * 3 - 1
    }
    this.friction = 0.015
    this.life = 150
	}

	draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update(ctx) {
    this.velocity.y -= this.friction
    this.life -= 1
    this.y -= this.velocity.y
    this.x += this.velocity.x
    this.draw(ctx)
  }
}

export { Fireworks, Spark }