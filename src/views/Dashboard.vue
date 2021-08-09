<template>
  <div>
    <div class="login-message-area">
      <div class="login-name">{{ user.name }}さんようこそ!!</div>
      <div>
        <span>残高 : {{ user.wallet }}</span>
        <button>ログアウト</button>
      </div>
    </div>

    <h1>ユーザ一覧</h1>
  </div>
</template>

<script>
// import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      userName: '',
    };
  },
  computed: mapGetters(['user']),
  // リロードしてもユーザー名が消えないようにする処理
  // created() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.userName = user.displayName;
  //     }
  //   });
  // },
  // mounted() {
  //   this.userName = this.user;
  // },
};
</script>
