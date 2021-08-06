<template>
  <div class="login">
    <h2>ログイン画面</h2>
    <form class="form">
      <label class="label">
        <span class="label">
          メールアドレス
        </span>
        <input class="input" type="text" />
      </label>
      <br />
      <label class="label">
        <span class="label">
          パスワード
        </span>
        <input class="input" type="password" />
      </label>
      <br />
      <br />
      <button class="btn btn-border" type="submit">
        ログイン
      </button>
    </form>
    <p>
      <router-link to="/register" class="router-link"
        >新規登録はこちらから</router-link
      >
    </p>
  </div>
</template>
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
.login {
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
