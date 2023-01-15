<template>
  <div>
    <div v-if="status === 'Win'">
      <Congrats :meal_type="meal_type" />
    </div>
    <div v-if="status === 'Lose'">
      <Lose :meal_type="meal_type" />
    </div>
    <div v-if="connected" class="w-full flex flex-col items-center">
      <Pong
        :ws="ws"
        :starting="starting"
        :nusnet="nusnet"
        :width="windowWidth"
        @status-change="handleStatusChange"
      />
      <div class="mt-2">
        Playing against <strong>#{{ oppo_id }}</strong>
      </div>
      <div class="mt-2">
        Status: <strong>{{ status }}</strong>
      </div>
      <div class="mt-2">
        <div v-if="meal_type===0">No stakes.</div>
        <div v-else-if="meal_type===1">One <strong>breakfast</strong> credit on the line!</div>
        <div v-else-if="meal_type===2">One <strong>dinner</strong> credit on the line!</div>
      </div>
    </div>
    <div v-else class="p-8 mt-4">
      <div class="border w-24 p-4 text-2xl text-center mx-auto relative">
        <div class="rotate-180">
          {{ client_id }}
        </div>
        <div class="absolute -top-2 left-1 px-2 bg-white text-xs">Your id:</div>
      </div>
      <div class="p-4 mt-2 text-center">
        <p>Place your phone head-to-head with your opponent.</p>
        <p>Challenge them to <strong>Pong</strong>!</p>
        <p>
          But be warned, the loser will transfer
          <strong>one dining credit</strong> to the winner.
        </p>
      </div>
      <div class="w-full flex flex-row justify-center mt-3">
        <div>
          <div>Opponent Id:</div>
          <div class="flex flex-col">
            <input v-model="id" type="number" class="border px-2 py-1" />
            <div class="flex flex justify-center mt-2">
              <button @click="connect(1)" class="py-1 px-2 rounded border">
                Breakfast
              </button>
              <button @click="connect(2)" class="py-1 px-2 rounded border">
                Dinner
              </button>
              <button @click="connect(0)" class="py-1 px-2 rounded border">
                No bet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { SendRequest } from "../utils/connectApi";
import { useAuthStore } from "~/store/auth";
import { watchEffect } from "vue";
import { WS_URL } from "../utils/config";
import internal from "stream";

export default {
  name: "GamePage",

  setup() {
    const store = useAuthStore();
    const { checkAuth } = store;
    let o = storeToRefs(store);
    watchEffect(() => checkAuth(o.auth));

    return {
      o,
    };
  },

  data: function () {
    return {
      ws: null,
      render: false,
      id: "",
      client_id: -1,
      oppo_id: -1,
      connected: false,
      starting: false,
      status: "Starting",
      nusnet: "",
      dining_hall_id: 1,
      windowWidth: window.innerWidth,
      meal_type: 0,
    };
  },
  created: function () {
    let client_id = Math.floor(Math.random() * 1000);
    this.client_id = client_id;
    this.ws = new WebSocket(`${WS_URL}${client_id}`);
    this.ws.addEventListener("message", this.listener);

    const store = useAuthStore();
    let o = storeToRefs(store);
    this.nusnet = localStorage.getItem("nusnet");
    this.dining_hall_id = o.data.dining_hall_id;
  },
  methods: {
    connect: function (meal_type) {
      this.meal_type = meal_type
      let ws = this.ws;
      ws.send(JSON.stringify({ type: "connect", message: this.id, meal_type: this.meal_type }));
    },
    ready: function () {
      if (!this.ws) {
        return;
      }
      let ws = this.ws;
      ws.send(JSON.stringify({ type: "update", message: "{'class':'ready'}" }));
    },
    listener: function (e) {
      let data = JSON.parse(e["data"]);
      if (data["type"] == "connect") {
        if (!this.connected) {
          let message = JSON.parse(data["message"]);
          this.starting = message["start"];
          this.oppo_id = message["client_id"];
          this.meal_type = message["meal_type"];
          this.connected = true;
        }
      }
    },
    handleStatusChange: function (new_status, edata) {
      this.status = new_status;
      console.log("asda", this.o);
      if (this.status == "Lose") {
        // early return if no stakes
        if (this.meal_type == 0) { return }

        // perform transfer
        let nusnet = edata;
        SendRequest("POST", "userid", {
          token: localStorage.getItem("authData"),
          nusnet: nusnet,
        }).then((boob) => {
          console.log(boob);
          console.log("ihi", boob["user_id"]);
          SendRequest("POST", "transfer", {
            token: localStorage.getItem("authData"),
            nusnet: "",
            user_id: boob["user_id"],
            dining_hall_id: localStorage.getItem("hall_id"),
            meal_type: this.meal_type,
          });
        });
        /*
        SendRequest("POST", "transfer", {
          token: this.o.data.token,
          user_id: user_id,
          dining_hall_id: this.o.dining_hall_id,
          meal_type: 2,
        });*/
      }
    },
  },
};
</script>
