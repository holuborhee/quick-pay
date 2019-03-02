<template>
  <b-form @submit.prevent="onSubmit">
    <b-alert
      variant="success"
      :show="true"
    >
      <p class="mb-0">&#8358;{{amount}} will be charged from your card</p>
    </b-alert>
    <b-form-group>
      <b-form-input
        type="text"
        v-model="card.number"
        required
        placeholder="Card Number" />
    </b-form-group>

    <b-form-group>
      <b-form-input
        type="text"
        v-model="card.cvv"
        placeholder="CVV here" />
    </b-form-group>
    <b-form-group>
      <b-form-input
        type="text"
        v-model="card.month"
        placeholder="Month card will expire (April is 04)" />
    </b-form-group>
    <b-form-group>
      <b-form-input
        type="text"
        v-model="card.year"
        placeholder="Year card will expire" />
    </b-form-group>

    <b-button :disabled="Object.keys(card).length < 4"
      block type="submit"
      variant="primary"
    >
      Complete Transfer
    </b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    amount: Number,
  },
  data() {
    return {
      card: {},
    };
  },
  methods: {
    onSubmit() {
      this.$emit('charge', this.card);
    },
  },
};
</script>
