<template>
  <div class="register">
    <h2>新規登録画面</h2>
    <form class="form" @submit.prevent>
      <label class="label">
        <span class="label">
          ユーザー名
        </span>
        <input class="input" type="text" v-model="username" />
      </label>
      <br />
      <label class="label">
        <span class="label">
          メールアドレス
        </span>
        <input class="input" type="text" v-model="email" />
      </label>
      <br />
      <label class="label">
        <span class="label">
          パスワード
        </span>
        <input class="input" type="password" v-model="password" />
      </label>
      <br />
      <br />
      <button class="btn btn-border" type="submit" @click="register">
        新規登録
      </button>
    </form>
    <p>
      <router-link to="/login" class="router-link"
        >ログインはこちらから</router-link
      >
    </p>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register: function() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        name: this.username,
      });
    },
  },
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.register {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
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
.router-link {
  color: #3366ff;
}
</style>
