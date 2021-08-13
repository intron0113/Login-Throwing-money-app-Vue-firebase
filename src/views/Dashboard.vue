<template>
  <div class="container">
    <div class="login-message-area">
      <div class="login-name">{{ user.name }}さんようこそ!!</div>
      <div>
        <span class="wallet">残高 : {{ user.myWallet }}円</span>
        <button class="btn btn-border" @click="signOut">ログアウト</button>
      </div>
    </div>
    <div class="table-container"></div>
    <h1>ユーザ一覧</h1>
    <table>
      <tr>
        <th>ユーザ名</th>
      </tr>

      <tr v-for="(otheruser, index) in users" v-bind:key="index">
        <td>{{ otheruser.name }}</td>
        <td class="table-wallet">
          <button class="btn button2" v-on:click="openModal(users, index)">
            walletを見る
          </button>
        </td>
        <td><button class="btn button2">送る</button></td>
      </tr>
    </table>

    <div id="overlay" v-show="showContent">
      <div
        v-show="showContent"
        @open="showContent = true"
        @close="showContent = false"
        id="wallet-content"
      >
        <div id="wallet-contentname">
          <p>{{ selectUser.name }}さんの残高</p>
          <p>{{ selectUser.myWallet }}</p>
        </div>
        <div id="button-content">
          <div v-on:click="closeModal" class="modal-button">
            close
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user', 'users']),
  },
  data() {
    return {
      showContent: false,
      selectUser: '',
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
    openModal(users, index) {
      this.showContent = true;
      return (this.selectUser = users[index]);
    },
    closeModal() {
      this.showContent = false;
    },
  },
};
</script>
<style>
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

#wallet-content {
  z-index: 2;
  background: #fff;
  width: 20%;
  margin-bottom: 20px;
}

#wallet-contentname {
  padding: 1em 1em 0 1em;
}

#button-content {
  background: #d2d2d2;
  width: 100%;
  height: 50px;
  padding-top: 10px;
}

.modal-button {
  background-color: red;
  color: white;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  width: 30%;

  margin: 0 10px 0 auto;
}

.container {
  margin: 0 6rem;
}
.login-message-area {
  margin: 50px 0;
  display: flex;
  justify-content: space-between;
}

.table-wallet {
  padding-left: 200px;
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
.button2 {
  border: 2px solid #00d991;
  background: #fff;
  color: #3366ff;
}
.button2:hover {
  color: #fff;
  background: #00d991;
}

.wallet {
  margin: 0 20px;
}
</style>
