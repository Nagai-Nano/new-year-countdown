<template>
	<div class="w-full h-full">
		<div class="absolute w-full h-full text-center text-white flex flex-col items-center justify-center">
      <h1 style="opacity: .9; font-size: 4rem;" class="tracking-wide capitalize mb-3">chúc mừng năm hợi</h1>
			<Countdown @happyNewYear="happyNewYear" />
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
				sparkArr: [],
        next: '',
        interval: 0
			}
		},

		methods: {
      fetchData() {
        const postId = localStorage.getItem('postId')
        const token  = localStorage.getItem('token')

        if(!postId || !token)
          return

        this.interval = setInterval(() => {
          fetch(`https://graph.facebook.com/v3.2/${postId}/comments?access_token=${token}&pretty=0&fields=id&limit=15&after=${this.next}`)
            .then(response => response.json())
            .then(data => {
              const length = data.data.length
              if(length > 0) {
                this.next = data.paging.cursors.after
                this.addFirework(length)
              }
            })
        }, 2000)
      },

			addFirework(length) {
				 for(let i = 1; i <= length; i++) {
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

          if(this.fireworkArr.length < 0) return

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
				}

				animate()
			},

      happyNewYear() {
        clearInterval(this.interval)
        this.addFirework(20)

        setInterval(() => {
          if(this.fireworkArr.length < 20)
            this.fireworkArr.push(new Fireworks(this.$refs.canvas))
        }, 100)

      }
		},

		components: {
			Countdown
		},

		mounted() {
      this.fetchData()
			this.render()
		}
	}
</script>
