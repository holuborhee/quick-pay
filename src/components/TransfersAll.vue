<template>
  <div>
    <div id="empty-transfer" v-if="transfers.length < 1">
      <h2 class="text-warning">You have not made any transfer</h2>
      <router-link to="/transfers/new">Initiate A Transfer</router-link>
    </div>
    <b-table v-else striped hover
      :fields="fields" :items="transfers"
      @row-clicked="handleTransferSelected"
    />
  </div>
</template>

<script>
import Api from '@/Api';

export default {
  name: 'TransfersAll',
  data() {
    return {
      fields: ['id', 'amount', 'createdAt', 'currency'],
      transfers: [],
    };
  },
  methods: {
    handleTransferSelected(item) {
      this.$router.push(`/transfers/${item.id}`);
    },
    async getPreviousTranfers() {
      const response = await Api.fetch('GET', '/transfers');
      /*
        Amount should be converted back to naira here
        in a normal scenario
      */

      this.transfers = response.data;
    },
  },
  mounted() {
    this.getPreviousTranfers();
  },
};
</script>

<style>
  #empty-transfer {
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
