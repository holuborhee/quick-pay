<template>
  <div>
    <router-link to="/suppliers/new" >Add a new supplier</router-link>
    <b-table striped hover
      :fields="fields" :items="suppliers"
      @row-clicked="handleTransferSelected"
    />
  </div>
</template>

<script>
export default {
  name: 'SuppliersAll',
  data() {
    return {
      fields: ['recipient_code', 'name'],
      suppliers: [
        {
          domain: 'test',
          type: 'nuban',
          currency: 'NGN',
          name: 'Flesh',
          details: {
            account_number: '01000000000',
            account_name: null,
            bank_code: '044',
            bank_name: 'Access Bank',
          },
          metadata: {
            job: 'Eater',
          },
          recipient_code: 'RCP_2x5j67tnnw1t98k',
          active: true,
          id: 28,
          createdAt: '2017-02-02T19:39:04.000Z',
          updatedAt: '2017-02-02T19:39:04.000Z',
        },
        {
          integration: 100073,
          domain: 'test',
          type: 'nuban',
          currency: 'NGN',
          name: 'Flesh',
          details: {
            account_number: '0100000010',
            account_name: null,
            bank_code: '044',
            bank_name: 'Access Bank',
          },
          metadata: {},
          recipient_code: 'RCP_1i2k27vk4suemug',
          active: true,
          id: 27,
          createdAt: '2017-02-02T19:35:33.000Z',
          updatedAt: '2017-02-02T19:35:33.000Z',
        },
      ],
    };
  },
  methods: {
    handleTransferSelected(item) {
      this.$router.push(`/suppliers/${item.id}`);
    },
  },
};
</script>
