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

      <b-button variant="danger" @click.native="removeRecipient">X</b-button>
    </b-form>
    <p v-if="Object.keys(selectedSupplierBank).length > 0" class="text-success">
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
    'transfer.recipient': async function (newVal, oldVal) { // eslint-disable-line func-names
      if (newVal && !oldVal) this.$emit('filled');
      // eslint-disable-next-line eqeqeq
      const supplier = this.suppliers.find(su => su.recipient_code == newVal);
      this.selectedSupplierBank = supplier.details;
      // eslint-disable-next-line camelcase
      const { account_number, bank_code } = this.selectedSupplierBank;
      this.selectedSupplierBank.account_name = await this.resolveAccount(account_number, bank_code);
    },
  },
  methods: {
    async getAllSuppliers() {
      const response = await Api.fetch('GET', '/suppliers?perPage=50&page=1');
      this.suppliers = response.data;
    },
    async resolveAccount(number, code) {
      const response = await Api.fetch('GET',
        `/resolve_account?accountNumber=${number}&bankCode=${code}`);
      if (response.isSuccessful) { return response.data.account_name; }
      return null;
    },
    async removeRecipient() {
      // preform remove recipient here, emit recipient detail
      alert('yet to be implemented'); // eslint-disable-line no-alert
    },
  },
  async mounted() {
    await this.getAllSuppliers();
  },
};
</script>
