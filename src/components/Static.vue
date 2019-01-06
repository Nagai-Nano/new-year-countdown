<template>
  <div class="w-full h-full">
    <div class="absolute w-full h-full text-center text-white flex flex-col items-center justify-center">
      <h1 style="opacity: .9; font-size: 4rem;" class="tracking-wide capitalize mb-3">chúc mừng năm hợi</h1>
      <Countdown />
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
  import { Fireworks, Spark } from '@/Fireworks'
  import Countdown from './Countdown'

  export default {
    data() {
      return {
        fireworkArr: [],
        sparkArr: []
      }
    },

    methods: {
      addFirework() {
         if(this.fireworkArr.length < 20) {
            this.fireworkArr.push(new Fireworks(this.$refs.canvas))
         }
      },

      render() {
        const canvas = this.$refs.canvas
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const { width, height } = canvas
        const ctx = canvas.getContext('2d')

        const animate = () => {
          requestAnimationFrame(animate)

          ctx.fillStyle = 'rgba(0, 0, 0, .1)'
          ctx.fillRect(0, 0, width, height)

          this.fireworkArr.forEach((fw, index) => {
            fw.update(ctx, this.sparkArr)
            if(fw.life) {
              this.fireworkArr.splice(index, 1)
            }
          })

          this.sparkArr.forEach((s, index) => {
            if(s.life <= 0) {
              this.sparkArr.splice(index, 1)
            }
            s.update(ctx)
          })

          this.addFirework()
        }

        animate()
      }
    },

    mounted() {
      this.render()
    },

    components: {
      Countdown
    }
  }
</script>
