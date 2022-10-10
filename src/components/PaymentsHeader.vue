<template>
  <div class="header">
    <div class="header__payment">Pagos</div>
    <div class="header__container-payment">
      <button
        class="header__save"
        v-if="!editPayment"
        @click="$emit('update:editPayment', true)"
      >
        guardar
      </button>
      <a
        v-else
        @click="$emit('update:editPayment', false)"
        class="header__update"
      >
        Editar
      </a>
      <span class="header__shop">Por cobrar</span>
      <span class="header__currency">{{ total }} {{ currency }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaymentsHeader',
  props: {
    total: {
      String,
      required: true,
    },
    currency: {
      String,
      required: true,
    },
    editPayment: Boolean,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 76px;
  border: 1px solid #f1f5f9;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  // justify-content: space-around;
  justify-content: space-between;
  align-items: center;
  &__update {
    font-size: 16px;
    font-weight: 600;
    color: #3460dc;
    cursor: pointer;
    margin-right: 6px;
  }
  &__payment {
    font-weight: 600;
    font-size: 23px;
    color: #3460dc;
  }
  &__shop {
    font-size: 23px;
    font-weight: 400;
    color: #94a3b8;
    margin-right: 6px;
  }
  &__container-payment {
    text-align: right;
    display: flex;
    align-items: center;
  }
  &__currency {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    text-align: right;
    color: #0f172a;
  }
  &__save {
    width: 73px;
    height: 34px;
    background-color: #1d4ed8;
    padding: 8px 12px;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
  }
}
</style>
