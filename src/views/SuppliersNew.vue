<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
          required
          placeholder="Select the Supplier's Bank" />
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="text"
          v-model="supplier.account_number"
          required
          :disabled="!supplier.bank_code"
          placeholder="Enter the account number for the businesses" />
      </b-form-group>

      <b-form-invalid-feedback v-if="!!supplier.account_number" :state="resolvedAccount">
        Cannot verify account number
      </b-form-invalid-feedback>
      <b-form-valid-feedback v-if="!!supplier.account_number" :state="resolvedAccount">
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
export default {
  data() {
    return {
      supplier: {},
      show: true,
      banks: [],
      accountName: null,
    };
  },
  computed: {
    resolvedAccount() {
      return false;
    },
  },
  methods: {
    onSubmit() {
      return true;
    },
    onReset() {
      return true;
    },
  },
};
</script>
