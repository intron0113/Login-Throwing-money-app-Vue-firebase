<template>
  <div class="container">
    <div class="login-message-area">
      <div class="login-name">{{ user.name }}さんようこそ!!</div>
      <div>
        <span class="wallet">残高 : {{ user.myWallet }}円</span>
        <button class="btn btn-border" @click="signOut">ログアウト</button>
      </div>
    </div>

    <h1>ユーザ一覧</h1>
    <table>
      <tr>
        <th>ユーザ名</th>
      </tr>
      <tr v-for="(user, index) in $store.getters.users" v-bind:key="index">
        <td>{{ index }}</td>
        <td>{{ user }}</td>
        <!-- <td><input class="button2" type="button" value="walletを見る" v-on:click="openModal" v-model="comment"></td>
          <td><input class="button2" type="button" value="送る"></td> -->
        <td>
          <button class="button2">
            walletを見る
          </button>
        </td>
        <td><button class="button2">送る</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['user']),

  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
  },
};
</script>
<style>
.container {
  margin: 0 2rem;
}
.login-message-area {
  margin: 50px;
  display: flex;
  justify-content: space-between;
}

.btn-border {
  border: 2px solid #3366ff;
  background: #fff;
  color: #3366ff;
}
.btn-border:hover {
  color: #fff;
  background: #3366ff;
}
.wallet {
  margin: 0 20px;
}
</style>
