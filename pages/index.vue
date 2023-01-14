<template>
  <div>
    <div class="flex flex-row">
      <input v-model="id" class="border">
      <button @click="connect">Connect</button>
    </div>
    <Pong v-if="ws" :ws="ws" />
    <button v-if="connected" @click="ready">Ready</button>
    <div>Your client id: {{ client_id }}</div>
    <div v-if="connected">Connected to: {{ oppo_id }}</div>
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
    }
  },
  created: function() {
    let client_id = Math.floor(Math.random() * 1000);
    this.client_id = client_id
    this.ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`)
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
  }
}
</script>
