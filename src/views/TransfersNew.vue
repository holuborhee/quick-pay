<template>
  <TransfersCharge v-if="toPay" :amount="totalAmount" @charge="doTransfer" />
  <b-form @submit.prevent="goToPay" v-else>
    <b-alert
      :show="alert.countDown"
      dismissible
      :variant="alert.variant"
      @dismissed="alert.countDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p class="mb-0">{{alert.message}}</p>
    </b-alert>
    <NewTransfer
      @filled="addNewTransferRow"
      v-for="transfer in transfers" :transfer="transfer"
      :key="transfer.id"
    />

    <b-button
      block type="submit"
      variant="primary"
      :disabled="!canTransfer"
    >
      Perform Transfer
    </b-button>
  </b-form>
</template>

<script>
import NewTransfer from '@/components/TransfersNew.vue';
import TransfersCharge from '@/components/TransfersCharge.vue';
import Api from '@/Api';

export default {
  components: {
    NewTransfer,
    TransfersCharge,
  },
  data() {
    return {
      transfers: [],
      count: 0,
      toPay: false,
      alert: {
        variant: 'danger',
        message: null,
        countDown: 0,
      },
    };
  },
  computed: {
    canTransfer() {
      // check if there is account number and amount for all supplier except last one
      const allExceptLast = this.transfers.slice(0);
      allExceptLast.pop();
      // eslint-disable-next-line max-len
      return allExceptLast.length > 0 && allExceptLast.every(transfer => !!transfer.amount && !!transfer.recipient);
    },
    totalAmount() {
      const allExceptLast = this.transfers.slice(0);
      allExceptLast.pop();
      let total = 0;
      allExceptLast.forEach((transfer) => {
        if (transfer.recipient && transfer.amount >= 0) total += +transfer.amount;
      });
      return total;
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.alert.countDown = dismissCountDown;
    },
    addNewTransferRow() {
      this.count += 1;
      this.transfers.push({ id: this.count, recipient: null, amount: null });
    },
    goToPay() {
      // check to be sure all accounts are resolved

      // set value of toPay to True
      this.toPay = true;
    },
    async doTransfer(card) {
      const transfers = this.transfers.slice(0);
      transfers.pop();
      const payload = { card, transfers };
      const response = await Api.fetch('POST', '/transfers', payload);
      this.toPay = false;
      if (response.isSuccessful) {
        this.transfers = [];
        this.count = 0;
        this.addNewTransferRow();

        this.alert = {
          variant: 'success',
          message: 'All Tranfer Successful',
          countDown: 5,
        };
      } else {
        this.alert = {
          variant: 'danger',
          message: 'Something Went Wrong with transfer',
          countDown: 5,
        };
      }
    },
  },
  mounted() {
    this.addNewTransferRow();
  },
};
</script>
