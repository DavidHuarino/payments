<template>
  <div class="payments-container">
    <payment
      v-for="(item, index) in payments"
      :key="index"
      :payment="item"
      :editPayment="editPayment"
      :currentIndex="index"
      @openPaymentEdit="addPayment"
      @incrementPercentage="increment"
      @decrementPercentage="decrement"
      @getCurrentIndex="getCurrentIndex"
    />
    <payment-modal
      v-show="isModalVisible"
      @close="closeModal"
      class="modal-payment"
    >
      <template v-slot:header>
        <h3 class="modal-payment__header">Modificar Estado</h3>
      </template>
      <template v-slot:body>
        <p class="modal-payment__content">
          Selecciona el estado en que se encuentra el pago.
        </p>
        <select v-model="selected">
          <option value="" selected disabled hidden>Por pagar</option>
          <option :value="false">Pendiente</option>
          <option :value="true">Pagado</option>
        </select>
      </template>

      <template v-slot:footer>
        <div class="modal-payment__footer">
          <button @click="removePayment" class="modal-payment__remove">
            Remove
          </button>
          <button class="modal-payment__save" @click="savePayment">
            Guardar
          </button>
        </div>
      </template>
    </payment-modal>
  </div>
</template>
<script>
import Payment from '../components/Payment.vue';
import PaymentModal from '../components/PaymentModal.vue';
export default {
  name: 'PaymentsMain',
  props: {
    editPayment: Boolean,
  },
  components: {
    Payment,
    PaymentModal,
  },
  data() {
    return {
      selected: false,
      isModalVisible: false,
      currentPayment: null,
      // editPayment: true,
      payments: [
        {
          title: 'Anticipo',
          currency: 182.0,
          percentage: 100,
          status: false,
        },
      ],
    };
  },
  mounted() {
    // fetch all payments
  },
  methods: {
    getCurrentIndex(index) {
      this.showModal();
      this.currentPayment = index;
    },
    savePayment() {
      if (this.selected) {
        this.payments[this.currentPayment].status = true;
        this.$emit(
          'decreaseTotal',
          this.payments[this.currentPayment].currency
        );
        // fetch to add the changes al backend
      }
      this.closeModal();
    },
    removePayment() {
      let cur = this.payments[this.currentPayment];
      let prev = this.payments[this.currentPayment - 1];
      Object.keys(prev).forEach((key) => {
        if (key === 'currency' || key === 'percentage') {
          prev[key] += cur[key];
        }
      });
      this.payments.splice(this.currentPayment - 1, 1, prev);
      this.payments.splice(this.currentPayment, 1);
      this.closeModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.currentPayment = null;
    },
    addPayment(payment, index) {
      //this.editPayment = false;
      this.$emit('update:editPayment', false);
      let currency = this.getRoundCurrency(this.payments[index].currency / 2);
      let percentage = this.getRoundCurrency(
        this.payments[index].percentage / 2
      );
      payment.currency = currency;
      payment.percentage = percentage;
      this.payments[index].currency = currency;
      this.payments[index].percentage = percentage;
      this.payments.splice(index + 1, 0, payment);
    },
    increment(index, newCurrency) {
      this.payments.splice(index - 1, 1, {
        ...this.payments[index - 1],
        currency: this.getRoundCurrency(
          this.payments[index - 1].currency - newCurrency
        ),
        percentage: this.payments[index - 1].percentage - 1,
      });
      this.payments.splice(index, 1, {
        ...this.payments[index],
        currency: this.getRoundCurrency(
          this.payments[index].currency + newCurrency
        ),
        percentage: this.payments[index].percentage + 1,
      });
    },
    decrement(index, newCurrency) {
      this.payments.splice(index - 1, 1, {
        ...this.payments[index - 1],
        currency: this.getRoundCurrency(
          this.payments[index - 1].currency + newCurrency
        ),
        percentage: this.payments[index - 1].percentage + 1,
      });
      this.payments.splice(index, 1, {
        ...this.payments[index],
        currency: this.getRoundCurrency(
          this.payments[index].currency - newCurrency
        ),
        percentage: this.payments[index].percentage - 1,
      });
    },
  },
};
</script>
<style lang="scss">
.modal-payment {
  text-align: left;
  &__header {
    font-size: 23px;
    font-weight: 600;
    color: #000000;
  }
  &__content {
    font-size: 16px;
    font-weight: 400;
    color: #0f172a;
  }
  &__remove {
    color: white;
    background: #1d4ed8;
    border: 1px solid #4aae9b;
    border-radius: 2px;
    width: 73px;
    height: 34px;
    border-radius: 5px;
  }
  &__save {
    color: white;
    background: #1d4ed8;
    border: 1px solid #4aae9b;
    border-radius: 2px;
    width: 73px;
    height: 34px;
    border-radius: 5px;
  }
  &__footer {
    text-align: right;
  }
}
.payments-container {
  display: grid;
  grid-auto-flow: column;
  // grid-template-columns: repeat(4, 1fr);
  // background-color: red;
  height: calc(100% - 76px);
  align-items: center;
  width: 100%;
  overflow-x: auto;
  //grid-template-columns: repeat(4, 1fr);
  //gap: 5px;
  /* background-color: blue; */
  /* align-items: center; */
  //height: 100%;
}
</style>
