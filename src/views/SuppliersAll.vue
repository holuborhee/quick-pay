<template>
  <div>
    <router-link to="/suppliers/new" >Add a new supplier</router-link>
    <b-table striped hover
      :fields="fields" :items="suppliers"
      @row-clicked="handleSupplierSelected"
    />

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          :total-rows="this.suppliers.length"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../Api';
import EventBus from '../event-bus';

export default {
  name: 'SuppliersAll',
  data() {
    return {
      fields: ['name', 'description'],
      suppliers: [],
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    handleSupplierSelected(item) {
      this.$router.push(`/suppliers/${item.id}`);
    },
    async getSuppliers() {
      const response = await Api.fetch('GET', `/suppliers?perPage=${this.perPage}&page=${this.currentPage}`);
      this.suppliers = response.data;
      EventBus.$emit('ALL_SUPPLIERS', this.suppliers);
    },
  },
  async mounted() {
    await this.getSuppliers();
  },
};
</script>
