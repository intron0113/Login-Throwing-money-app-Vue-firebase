<template>
  <div class="container">
    <div class="login-message-area">
      <div class="login-name">{{ user.name }}さんようこそ!!</div>
      <div>
        <span class="wallet">残高 : {{ user.myWallet }}円</span>
        <button class="btn btn-border">ログアウト</button>
      </div>
    </div>

    <h1>ユーザ一覧</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['user']),
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
