<template>
	<div class="w-full h-full">
		<div class="absolute w-full h-full text-center text-white flex flex-col items-center justify-center">
			<h1 style="opacity: .9" class="text-5xl tracking-wide capitalize mb-4">chúc mừng năm hợi</h1>
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
				sparkArr: [],
        next: ''
			}
		},

		methods: {
      fetchData() {
        const postId   = localStorage.getItem('postId')
        const token    = localStorage.getItem('token')
        const interval = parseInt(localStorage.getItem('interval'))
        const limit    = localStorage.getItem('limit')

        if(!postId || !token)
          return

        setInterval(() => {
          fetch(`https://graph.facebook.com/v3.2/${postId}/comments?access_token=${token}&pretty=0&fields=id&limit=${limit}&after=${this.next}`)
            .then(response => response.json())
            .then(data => {
              if(data.data.length > 0) {
                this.next = data.paging.cursors.after
                this.addFirework(data.data.length)
              }
            })
        }, interval)
      },

			setDimension() {
				const canvas = this.$refs.canvas
				canvas.width = window.innerWidth
  			canvas.height = window.innerHeight
			},

			addFirework(length) {
				 for(let i = 1; i <= length; i++) {
						this.fireworkArr.push(new Fireworks(this.$refs.canvas))
				 }
			},

			render() {
				const canvas = this.$refs.canvas
				const { width, height } = canvas
				const ctx = canvas.getContext('2d')

				const animate = () => {
					requestAnimationFrame(animate)

					ctx.fillStyle = 'rgba(0,0,0, .1)'
    			ctx.fillRect(0, 0, width, height)

    			this.fireworkArr.forEach((fw, index) => {
			      fw.update(ctx, this.sparkArr)
			      if(fw.life) {
			        this.fireworkArr.splice(index,1)
			      }
			    })

			    this.sparkArr.forEach((s, index) => {
			      if(s.life <= 0) {
			        this.sparkArr.splice(index,1)
			      }
			      s.update(ctx)
			    })
				}

				animate()
			}
		},

		components: {
			Countdown
		},

    created() {
      this.fetchData()
    },

		mounted() {
			this.setDimension()
			this.render()
		}
	}
</script>
