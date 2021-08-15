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

      <tr v-for="(user, index) in users" v-bind:key="index">
        <td>{{ user.name }}</td>
        <td class="table-wallet">
          <button class="btn button2" v-on:click="openModal(users, index)">
            walletを見る
          </button>
        </td>
        <td>
          <button class="btn button2" @click="openSendModal(user.uid)">
            送る
          </button>
        </td>
      </tr>
    </table>

    <div id="overlay" v-show="showContent">
      <transition>
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
      </transition>
    </div>
    <div id="overlay2" v-show="showContent2">
      <transition>
        <SendModal
          v-show="showContent2"
          @openSendModal="openSendModal"
          @closeSendModal="closeSendModal"
          @onlyCloseSendModal="onlyCloseSendModal"
        ></SendModal>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SendModal from '@/components/SendModal.vue';

export default {
  components: {
    SendModal,
  },

  computed: {
    ...mapGetters(['user', 'users']),
  },
  data() {
    return {
      showContent: false,
      showContent2: false,
      selectUser: '',
      tippingWallet: '',
      clickedUserUid: '',
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
    openModal(users, index) {
      this.showContent = true;
      console.log(users[index]);
      return (this.selectUser = users[index]);
    },
    closeModal() {
      this.showContent = false;
    },

    // 「送る」ボタン
    openSendModal(clickedUserUid) {
      this.showContent2 = true;
      this.clickedUserUid = clickedUserUid;
    },
    closeSendModal(tippingWallet) {
      this.showContent2 = false;
      this.tippingWallet = tippingWallet;
      this.$store.dispatch('tipping', {
        tippingWallet: this.tippingWallet,
        clickedUserUid: this.clickedUserUid,
      });
    },
    onlyCloseSendModal() {
      this.showContent2 = false;
    },
  },
};
</script>
<style>
.v-leave-active,
.v-enter-active {
  transition: opacity 1s;
  transform: translate(0px, 0px);
  transition: transform 600ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10vh) translateY(0px);
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
#overlay2 {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
