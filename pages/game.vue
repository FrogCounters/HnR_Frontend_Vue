<template>
  <div>
    <div v-if="connected" class="w-full flex flex-col items-center">
      <Pong :ws="ws" :starting="starting" @status-change="handleStatusChange" />
      <!-- <button @click="ready">Ready</button> -->
      <div class="mt-2">Playing against <strong>#{{ oppo_id }}</strong></div>
      <div class="mt-2">Status: <strong>{{ status }}</strong></div>
    </div>
    <div v-else class="p-8 mt-4">
      <div class="border w-24 p-4 text-2xl text-center mx-auto relative">
        {{ client_id }}
        <div class="absolute -top-2 left-1 px-2 bg-white text-xs">Your id:</div>
      </div>
      <div class="p-4 mt-2 text-center">
        <p>Challenge your friends to a game of <strong>Pong</strong>!</p>
        <p>But be warned, the loser will transfer <strong>one dining credit</strong> to the winner.</p>
      </div>
      <div class="w-full flex flex-row justify-center mt-3">
        <div>
          <div>Opponent Id:</div>
          <div class="flex">
            <input v-model="id" type="number" class="border px-2 py-1">
            <button @click="connect" class="py-1 px-2 rounded border">Start!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function() {
    return {
      ws: null,
      render: false,
      id: "",
      client_id: -1,
      oppo_id: -1,
      connected: false,
      starting: false,
      status: "Starting",
    }
  },
  created: function() {
    let client_id = Math.floor(Math.random() * 1000);
    this.client_id = client_id
    this.ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`)
    this.ws.addEventListener('message', this.listener)
  },
  methods: {
    connect: function() {
      let ws = this.ws
      ws.send(JSON.stringify({type: "connect", message: this.id}))
    },
    ready: function() {
      if (!this.ws) { return }
      let ws = this.ws
      ws.send(JSON.stringify({type: "update", message: "{'class':'ready'}"}))
    },
    listener: function(e) {
      let data = JSON.parse(e['data'])
      if (data['type'] == 'connect') {
        if (!this.connected) {
          let message = JSON.parse(data['message'])
          console.log(message)
          this.starting = message['start']
          this.oppo_id = message['client_id']
          this.connected = true
        }
      }
    },
    handleStatusChange: function(new_status) {
      console.log("status change")
      this.status = new_status
    }
  }
}
</script>