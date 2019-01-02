<template>
	<div class="flex text-2xl">
    <p
      v-for="(value, key) in timer"
      :key="key"
      class="mx-5 flex flex-col p-4 border rounded-full"
    >
      <span class="pb-1">{{ value }}</span>
      <span class="capitalize">{{ key }}</span>
    </p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				deadline: 'February 5, 2019 00:00:00',
				timer: {
          days: '',
          hours: '',
          mins: '',
          secs: ''
        }
			}
		},

		methods: {
			countdown() {
				const interval = setInterval(() => {
					const targetDate  = new Date(this.deadline).getTime()
					const currentDate = new Date().getTime()
					const diff   = targetDate - currentDate

					this.timer.days  = this.lead0(Math.floor(diff / (1000 * 60 * 60 * 24)))
					this.timer.hours = this.lead0(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
					this.timer.mins  = this.lead0(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
					this.timer.secs  = this.lead0(Math.floor((diff % (1000 * 60)) / 1000))

				}, 1000)
			},

			lead0(num) {
				return num < 10 ? '0' + num : num
			}
		},

		created() {
			this.countdown()
		}
	}
</script>

<style scoped>
	p {
		min-width: 90px;
	}
</style>
