<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <header>
      <router-link to="/" class="header-item">ダッシュボード</router-link>
      <router-link to="/login" class="header-item">ログイン画面</router-link>
      <router-link to="/register" class="header-item">登録画面</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.header-item {
  padding: 10px;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

/* *,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%; /*rem算出をしやすくするために*/

.btn,
a.btn,
button.btn {
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.5;
  */position: relative;
  display: inline-block;
  padding: 0.2rem 1rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}
</style>
