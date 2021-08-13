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

      <tr v-for="(otheruser, index) in users" v-bind:key="index">
        <td>{{ otheruser.name }}</td>
        <td>
          <button class="button2" v-on:click="openModal(index)">
            walletを見る
          </button>
        </td>
        <td><button class="button2">送る</button></td>
      </tr>
    </table>

    <div
      v-show="showContent"
      v-on:click="closeModal"
      @open="showContent = true"
      @close="showContent = false"
    >
      <div id="overlay" v-show="showContent">
        <div id="main-content">
          <p>{{ $store.getters.modalDatas }}さんの残高</p>
          <!-- <p>{{ $store.getters.modalDatas.id }}</p> -->
          <div id="button-content">
            <p>
              <button v-on:click="closeModal" class="modal-button">
                close
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- :index='usersIndex' -->
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
      usersIndex: '',
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
    openModal(index) {
      this.showContent = true;
      // モーダルセットようのデータ作成
      this.usersIndex = index;
      // this.usersIndex.forEach((userIndex, index) => { // 修正箇所： idの振り直し
      //   userIndex.id = index;
      // })
      const usersIndex = this.usersIndex;
      // storeに渡す
      this.$store.getters('modalSet', usersIndex);
    },
    closeModal() {
      this.showContent = false;
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
