<template>
  <b-form>
    <NewTransfer
      @filled="addNewTransferRow"
      v-for="transfer in transfers" :transfer="transfer"
      :key="transfer.id"
    />

    <b-button
      block type="submit"
      variant="primary"
    >
      Perform Transfer
    </b-button>
  </b-form>
</template>

<script>
import NewTransfer from '@/components/TransfersNew.vue';

export default {
  components: {
    NewTransfer,
  },
  data() {
    return {
      transfers: [],
      count: 0,
    };
  },
  methods: {
    addNewTransferRow() {
      this.count += 1;
      this.transfers.push({ id: this.count, recipient: null, amount: null });
    },
  },
  mounted() {
    this.addNewTransferRow();
  },
};
</script>
