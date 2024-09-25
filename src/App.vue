<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";

// import { onBeforeMount } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import firebase from "firebase/compat/app";
import { Checklogin } from "./store/login";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    // const route = useRoute();
    // const router = useRouter();
    const checkLog = Checklogin();
    // check sign in
    checkLog.userCheck();
    // onBeforeMount(() => {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (!user) {
    //       router.replace("/");
    //     } else if (route.path == "/login" || route.path == "/sign-up") {
    //       router.replace("/");
    //     }
    //   });
    // });
    return {};
  },
};
</script>
