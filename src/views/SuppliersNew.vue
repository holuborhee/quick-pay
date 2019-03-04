<template>
  <b-form @submit.prevent="onSubmit">
    <b-alert
      :show="alert.countDown"
      dismissible
      :variant="alert.variant"
      @dismissed="alert.countDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p class="mb-0">{{alert.message}}</p>
    </b-alert>
    <b-form-group>
      <b-form-input
        type="text"
        v-model="supplier.name"
        required
        placeholder="Suppliers Name or Business Name" />
    </b-form-group>

    <b-form-group>
      <b-form-input
        type="text"
        v-model="supplier.description"
        placeholder="A little about the supplier" />
    </b-form-group>

    <b-form-group label="Suppliers Account Information">
      <b-form-group>
        <b-form-select
          v-model="supplier.bank_code"
          :options="banks"
          value-field="code"
          text-field="name"
          required
        />
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="text"
          v-model="supplier.account_number"
          required
          :disabled="!supplier.bank_code"
          placeholder="Enter the account number for the businesses" />
      </b-form-group>
      <p class="my-0 text-primary" v-if="resolvingAccount">Getting account info...</p>
      <b-form-invalid-feedback
        v-if="showFeedback"
        :state="resolvedAccount"
      >
        Cannot verify account number
      </b-form-invalid-feedback>
      <b-form-valid-feedback v-if="showFeedback" :state="resolvedAccount">
        {{accountName}}
      </b-form-valid-feedback>
    </b-form-group>

    <b-button :disabled="!resolvedAccount"
      block type="submit"
      variant="primary"
    >
      Add Supplier
    </b-button>
  </b-form>
</template>

<script >
import Api from '../Api';

export default {
  data() {
    return {
      alert: {
        variant: 'danger',
        message: null,
        countDown: 0,
      },
      supplier: {},
      banks: this.$banks,
      accountName: null,
      resolvingAccount: false,
    };
  },
  watch: {
    supplier: {
      handler(supplier) {
        this.accountName = null;
        if (supplier.account_number && supplier.account_number.length > 9) {
          this.resolveAccount();
        }
      },
      deep: true,
    },
  },
  computed: {
    resolvedAccount() {
      return !!this.accountName;
    },
    showFeedback() {
      return (
        this.supplier.account_number && this.supplier.account_number.length > 9
        && !this.resolvingAccount
      );
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.alert.countDown = dismissCountDown;
    },
    async resolveAccount() {
      this.resolvingAccount = true;
      const response = await Api.fetch('GET',
        `/resolve_account?accountNumber=${this.supplier.account_number}&bankCode=${this.supplier.bank_code}`);
      if (response.isSuccessful) this.accountName = response.data.account_name;
      this.resolvingAccount = false;
    },
    async onSubmit() {
      const response = await Api.fetch('POST', '/suppliers', this.supplier);

      this.alert = {
        variant: response.isSuccessful ? 'success' : 'danger',
        message: response.isSuccessful ? 'Supplier Details Successfully Added' : response.message,
        countDown: 5,
      };
      if (response.isSuccessful) this.supplier = {};
      return true;
    },
  },
};
</script>
