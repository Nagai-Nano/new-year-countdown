<template>
	<div class="flex text-2xl">
		<p class="mx-5 flex flex-col p-4 border rounded-full">
			<span class="pb-1">{{ days }}</span>
			<span>Days</span>
		</p>
		<p class="mx-5 flex flex-col p-4 border rounded-full">
			<span class="pb-1">{{ hours }}</span>
			<span>Hours</span>
		</p>
		<p class="mx-5 flex flex-col p-4 border rounded-full">
			<span class="pb-1">{{ minutes }}</span>
			<span>Mins</span>
		</p>
		<p class="mx-5 flex flex-col p-4 border rounded-full">
			<span class="pb-1">{{ seconds }}</span>
			<span>Secs</span>
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				deadline: 'February 5, 2019 00:00:00',
				days: '',
				hours: '',
				minutes: '',
				seconds: ''
			}
		},

		methods: {
			countdown() {
				const interval = setInterval(() => {
					const targetDate  = new Date(this.deadline).getTime()
					const currentDate = new Date().getTime()
					const diff   = targetDate - currentDate
					
					this.days    = this.lead0(Math.floor(diff / (1000 * 60 * 60 * 24)))
					this.hours   = this.lead0(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
					this.minutes = this.lead0(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
					this.seconds = this.lead0(Math.floor((diff % (1000 * 60)) / 1000))
				  
				  console.log(this.days, this.hours, this.minutes, this.seconds)
				}, 1000)
			},

			lead0(num) {
				return num < 10 ? '0' + num : num
			}
		},

		mounted() {
			this.countdown()
		}
	}
</script>

<style scoped>
	p {
		min-width: 90px;
	}
</style>