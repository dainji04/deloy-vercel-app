<template>
  <div id="road-map" class="flex items-center gap-3 my-20">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/"> Home </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Items</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <div v-if="item">
    <h1>{{ item.name }}</h1>
    <p>This is A Details for {{ id }}</p>
    <img :src="item.img" alt="" />
    <p>{{ item.price }}$</p>
    <p>{{ item.sales }}</p>
    <p>{{ item.stock }}</p>
    Trạng Thái: <input type="checkbox" v-model="item.completed" />
  </div>
  <div v-else>
    <p>Loading item....</p>
  </div>
</template>
<script>
export default {
  props: ["id", "nameList"],
  data() {
    return {
      // id: this.$route.params.id,
      item: null,
    };
  },
  mounted() {
    console.log(`http://localhost:3000/${this.nameList}/${this.id}`);
    fetch(`http://localhost:3000/${this.nameList}/${this.id}`)
      .then((res) => res.json())
      .then((data) => (this.item = data))
      .catch((err) => console.log("error: " + err));
  },
};
</script>
<style lang=""></style>
