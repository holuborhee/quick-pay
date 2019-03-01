<template>
  <div>
    <b-list-group>
      <b-list-group-item
        class="d-flex justify-content-between"
        v-for="(value, key) in supplier"
        :key="key"
      >
        <span class="text-capitalize">{{key}}:</span>
        <span>{{value}}</span>
      </b-list-group-item>
    </b-list-group>
    <div class="d-flex justify-content-between mt-5">
      <router-link to="#">Edit Details</router-link>
      <router-link to="#">Delete Supplier</router-link>
      <router-link to="/transfers/new">Initiate a Transfer</router-link>
    </div>
  </div>
</template>

<script>
import Api from '../Api';

export default {
  props: {
    suppliers: Array,
  },
  data() {
    return {
      supplier: {},
      accountName: null,
      bank: null,
    };
  },
  methods: {
    async resolveAccount(number, code) {
      const response = await Api.fetch('GET',
        `/resolve_account?accountNumber=${number}&bankCode=${code}`);
      if (response.isSuccessful) { return response.data.account_name; }
      return null;
    },
    async getSupplierDetails() {
      console.log(this.suppliers);
      if (this.suppliers.length > 0) {
        // eslint-disable-next-line eqeqeq
        const val = this.suppliers.find(s => s.id == this.$route.params.id);
        const {
          name, description, details,
        } = val;
        const account = await this.resolveAccount(details.account_number, details.bank_code);
        this.supplier = {
          name, description, bank: details.bank_name, account, number: details.account_number,
        };
      }
    },
  },
  async mounted() {
    await this.getSupplierDetails();
  },
};
</script>
