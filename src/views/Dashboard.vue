<template>
  <div>
    <div class="login-message-area">
      <div>
        <span>{{ userName }}さんようこそ！！</span>
      </div>

      <div>
        <span>残高 : 1000</span>
        <button>ログアウト</button>
      </div>
    </div>

    <h1>ユーザ一覧</h1>

    <div class="user-list-wrapper">
      <h4>ユーザ名</h4>

      <ul class="user-list">
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      userName: '',
    };
  },
  computed: mapGetters(['getUserName']),
  // リロードしてもユーザー名が消えないようにする処理
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName;
      }
    });
  },
  mounted() {
    this.userName = this.getUserName;
  },
};
</script>
