<template>
  <div class="d-flex min-vh-100">
    <b-modal ref="viewModal" hide-footer @hidden="$router.push('/')">
      <router-view :suppliers="currentSuppliers" />
    </b-modal>
    <main class="w-75 d-flex flex-column justify-content-between">
      <div id="nav">
        <router-link id="logo" to="/" >QuickPay</router-link>
        <router-link to="/suppliers">View All Suppliers</router-link>
        <router-link to="/suppliers/new">Add A Supplier</router-link>
      </div>
      <section>
        <div class="d-flex justify-content-between">
          <h3>List of Previous Tranfers</h3>
          <router-link to="/transfers/new">Initiate A Tranfer</router-link>
        </div>
        <TransfersAll />
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import TransfersAll from '@/components/TransfersAll.vue';
import EventBus from '@/event-bus';

export default {
  name: 'home',
  components: {
    TransfersAll,
  },
  data() {
    return {
      currentSuppliers: [],
      transfers: [],
    };
  },
  watch: {
    $route(to) {
      if (to.name !== 'home') this.$refs.viewModal.show();
    },
  },
  mounted() {
    EventBus.$on('ALL_SUPPLIERS', (payLoad) => {
      console.log(payLoad);
      this.currentSuppliers = payLoad;
    });
  },
};
</script>

<style>
  main {
    min-height: 75vh;
    margin: auto;
  }


  #nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #nav #logo {
    font-size: 3rem;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
