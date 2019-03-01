<template>
  <b-form inline class="d-flex justify-content-between mb-5">
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="transfer.recipient"
      :options="{ '1': 'One', '2': 'Two', '3': 'Three' }"
    >
      <option slot="first" :value="null">Choose...</option>
    </b-form-select>

    <b-form-input
      type="number"
      v-model="transfer.amount"
      :min="1"
      class="mb-2 mr-sm-2 mb-sm-0"
      required
      :disabled="!transfer.recipient"
      placeholder="Enter amount to transfer"
    />

    <b-button variant="danger">Remove</b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    transfer: Object,
  },
  watch: {
    'transfer.recipient': function (newVal, oldVal) { // eslint-disable-line func-names
      if (newVal && !oldVal) this.$emit('filled');
    },
  },
};
</script>
