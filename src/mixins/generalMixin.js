import Vue from 'vue';
Vue.mixin({
  methods: {
    // capitalizeFirstLetter(str) {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // },
    getRoundCurrency(value) {
      return Math.round(value * 10) / 10;
    },
  },
});
