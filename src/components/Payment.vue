<template>
  <div>
    <div class="card-payment" v-if="editPayment">
      <div
        class="card-payment__rounded"
        @click="sendCurrentIndex"
        :class="{ 'card-payment__active-payment': payment.status }"
      >
        <div
          class="card-payment__line"
          :class="{ 'card-payment__active-payment': payment.status }"
        >
          <button
            class="card-payment__button-create"
            @mouseenter="mouseOver"
            @click="createPayment"
            :disabled="payment.status"
          >
            +
          </button>
        </div>
      </div>
      <h3 class="card-payment__title">{{ payment.title }}</h3>
      <p class="card-payment__currency">
        {{ payment.currency }} UF <span>({{ payment.percentage }}%)</span>
      </p>
    </div>
    <div v-else class="card-payment">
      <div class="card-payment__rounded">
        <div class="card-payment__line"></div>
      </div>
      <form class="card-form">
        <input type="text" v-model="payment.title" class="card-form__title" />
        <div class="card-form__search">
          <p class="card-form__type-currency">UF</p>
          <input
            type="text"
            v-model="payment.currency"
            class="card-form__currency"
          />
        </div>
      </form>
      <div class="container-percentage">
        <button
          class="container-percentage__button"
          @click="decrementPercentage"
        >
          -
        </button>
        <span class="container-percentage__percentage"
          >{{ payment.percentage }}%</span
        >
        <button
          class="container-percentage__button"
          @click="incrementPercentage"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// import PaymentModal from '../components/PaymentModal.vue';
export default {
  name: 'Payment',
  // components: { PaymentModal },
  props: {
    payment: {
      Object,
      required: true,
    },
    editPayment: Boolean,
    currentIndex: {
      Number,
      required: true,
    },
  },
  data() {
    return {
      active: false,
      paymentCreate: {
        title: 'Nuevo',
        currency: 0,
        percentage: 0,
      },
    };
  },
  watch: {
    payment: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
    },
  },
  methods: {
    sendCurrentIndex() {
      if (this.payment.status) {
        return;
      }
      this.$emit('getCurrentIndex', this.currentIndex);
    },
    mouseOver() {
      console.log('holi boli');
      // this.active = !this.active;
    },
    createPayment() {
      this.$emit('openPaymentEdit', this.paymentCreate, this.currentIndex);
      //console.log(this.currentIndex);
    },
    incrementPercentage() {
      this.$emit(
        'incrementPercentage',
        this.currentIndex,
        this.getCurrencyByPercentage
      );
    },
    decrementPercentage() {
      this.$emit(
        'decrementPercentage',
        this.currentIndex,
        this.getCurrencyByPercentage
      );
    },
  },
  computed: {
    getCurrencyByPercentage() {
      return this.getRoundCurrency(
        this.payment.currency / this.payment.percentage
      );
    },
  },
};
</script>
<style lang="scss">
.container-percentage {
  // background-color: #1d4ed8;
  display: flex;
  // width: 100%;
  justify-content: space-around;
  align-items: center;
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 0.583333px solid #3460dc;
  }
  &__percentage {
    font-weight: 400;
    font-size: 14px;
    margin: 0 6px;
  }
}
.card-form {
  // background-color: #1d4ed8;
  width: 100%;
  flex: 1 1 0%;
  margin-bottom: 6px;
  &__title {
    width: 70%;
    margin-bottom: 8px;
  }
  &__currency {
    width: 70%;
  }
  &__search {
    position: relative;
  }
  &__type-currency {
    position: absolute;
    right: 17%;
    width: 21px;
    height: 17px;
    font-weight: 600;
    font-size: 14px;
    color: #94a3b8;
  }
}
.card-payment {
  // background-color: red;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__rounded {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    // background-color: #fff;
    // border: 3px solid #fff;
    background-color: #f8fafc;
    border: 3px solid #1d4ed8;
    position: relative;
    // background-color: blue;
    margin-bottom: 10px;
    cursor: pointer;
  }
  &__active-payment {
    background: #059669;
    border: 1px solid #059669;
  }
  &__line {
    width: 70px;
    border: 1px solid #e2e8f0;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    // &:hover {
    //   border: 1px solid red;
    // }
  }
  &__button-create {
    position: absolute;
    left: 100%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    // border: 3px;
    cursor: pointer;
    background-color: #fff;
    color: #fff;
    &:hover {
      background-color: #e2e8f0;
      color: #000;
      z-index: 50;
    }
    // background-color: #e2e8f0;
  }
  &__tittle {
    font-weight: 600;
    font-size: 20px;
  }
  &__currency {
    font-weight: 400;
    font-size: 14px;
    color: #0f172a;
  }
}
</style>
