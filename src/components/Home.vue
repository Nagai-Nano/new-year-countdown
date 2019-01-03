<template>
	<div class="w-full h-full flex justify-center items-center font-sans">
    <div class="w-1/2">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="block text-grey-darker text-lg font-bold mb-2">
            Post ID
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="xxxxxxxxxx"
            v-model="postId"
          />
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-lg font-bold mb-2">
            Access Token
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            v-model="token"
          />
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-lg font-bold mb-2">
            Time Interval (ms)
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="1000"
            v-model="interval"
          />
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-lg font-bold mb-2">
            Limit
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="15"
            v-model="limit"
          />
        </div>
        <button class="w-full bg-blue text-lg hover:bg-blue-dark text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        postId: '',
        token: '',
        interval: '2000',
        limit: '15'
      }
    },

    methods: {
      onSubmit() {
        if(!this.postId || !this.token || !this.interval || !this.limit || parseInt(this.interval) < 100 || parseInt(this.limit) < 1)
          return

        localStorage.setItem('postId', this.postId)
        localStorage.setItem('token', this.token)
        localStorage.setItem('interval', this.interval)
        localStorage.setItem('limit', this.limit)
        this.$router.push('/gopro')
      }
    }
  }
</script>
