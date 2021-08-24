<template>
  <div>
    <div id="main-content" @click.self="onlyCloseSendModal">
      <p>あなたの残高：{{ user.myWallet }}</p>
      <p>送る金額</p>
      <input type="text" class="text" v-model="tippingWallet" />
      <p v-if="required" class="error-message">金額を入力してください。</p>
      <p v-if="numeric" class="error-message">数値で入力してください。</p>
      <p v-if="limit" class="error-message">所持金が足りません。</p>
      <div id="button-content">
        <p>
          <input
            @click="closeSendModal"
            class="modal-button"
            type="submit"
            value="送信"
            :disabled="activateSubmit"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      showContent2: false,
      tippingWallet: '',
    };
  },
  methods: {
    openSendModal() {
      this.$emit('openSendModal');
    },
    closeSendModal() {
      this.$emit('closeSendModal', this.tippingWallet);
      this.tippingWallet = '';
    },
    onlyCloseSendModal() {
      this.$emit('onlyCloseSendModal');
      this.tippingWallet = '';
    },
  },
  computed: {
    ...mapGetters(['user']),
    modalData() {
      return this.$store.getters.modalData;
    },
    required() {
      return this.tippingWallet == '';
    },
    numeric() {
      return this.tippingWallet != '' && !Number(this.tippingWallet);
    },
    limit() {
      return this.tippingWallet > this.$store.getters.user.myWallet;
    },
    activateSubmit() {
      if (this.tippingWallet == '') {
        return true;
      } else if (this.tippingWallet != '' && !Number(this.tippingWallet)) {
        return true;
      } else if (
        this.tippingWallet >= 0 &&
        this.tippingWallet > this.$store.getters.user.myWallet
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
#main-content {
  z-index: 2;
  width: 150%;
  padding-top: 40px;
  background: #fff;
  margin-bottom: 20px;
}
#button-content {
  background: #dcdcdc;
  margin: 0%;
  padding: 2em 0;
}
.modal-button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.modal-button:hover {
  background-color: #ff4500;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.text {
  margin-bottom: 20px;
  padding: 5px 10px;
}
.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}
input[type='submit'][disabled] {
  opacity: 0.4;
}
</style>
