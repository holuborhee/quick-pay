<template>
  <div>
    <b-table striped hover :items="transfers" @row-clicked="handleTransferSelected" />
  </div>
</template>

<script>
export default {
  name: 'TransfersAll',
  data() {
    return {
      transfers: [
        {
          isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald',
        },
        {
          isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw',
        },
        {
          isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson',
        },
        {
          isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney',
        },
      ],
    };
  },
  methods: {
    handleTransferSelected(item) {
      this.$router.push(`/transfers/${item.first_name}`);
    },
  },
};
</script>
