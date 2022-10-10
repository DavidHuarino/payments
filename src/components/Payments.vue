<template>
  <div class="container">
    <payments-header
      :total="total"
      :currency="currency"
      :editPayment.sync="editPayment"
    />
    <payments-main
      @decreaseTotal="decreaseTotal"
      :editPayment.sync="editPayment"
    />
  </div>
</template>
<script>
import PaymentsHeader from '../components/PaymentsHeader.vue';
import PaymentsMain from '../components/PaymentsMain.vue';
export default {
  name: 'Payments',
  components: {
    PaymentsHeader,
    PaymentsMain,
  },
  data() {
    return {
      total: 182,
      currency: 'UF',
      editPayment: true,
    };
  },
  methods: {
    decreaseTotal(currency) {
      this.total -= currency;
    },
  },
};
</script>
<style scoped>
.container {
  width: 848px;
  height: 274px;
  background-color: #fff;
}
</style>
