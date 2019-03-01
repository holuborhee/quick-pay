<template>
  <div class="mb-3">
    <b-form inline class="d-flex justify-content-between">
      <b-form-select
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="transfer.recipient"
        :options="suppliers"
        value-field="recipient_code"
        text-field="name"
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

      <b-button variant="danger">X</b-button>
    </b-form>
    <p v-if="Object.keys(selectedSupplierBank).length > 0">
      {{selectedSupplierBank.bank_name}},
      {{selectedSupplierBank.account_number}},
      {{selectedSupplierBank.account_name}}
    </p>
  </div>
</template>

<script>
import Api from '../Api';

export default {
  props: {
    transfer: Object,
  },
  data() {
    return {
      suppliers: [],
      selectedSupplierBank: {},
    };
  },
  watch: {
    'transfer.recipient': function (newVal, oldVal) { // eslint-disable-line func-names
      if (newVal && !oldVal) this.$emit('filled');
      // eslint-disable-next-line eqeqeq
      const supplier = this.suppliers.find(su => su.recipient_code == newVal);
      this.selectedSupplierBank = supplier.details;
    },
  },
  methods: {
    async getAllSuppliers() {
      const response = await Api.fetch('GET', '/suppliers?perPage=50&page=1');
      this.suppliers = response.data;
    },
  },
  async mounted() {
    await this.getAllSuppliers();
  },
};
</script>
