<template>
  <div class="max-w-[1170px] mx-auto">
    <div id="road-map" class="flex items-center gap-3 my-20">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link to="/"> Home </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>Cart</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="table w-full">
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="products"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </a-table>
    </div>
    <div class="flex justify-between">
      <button class="border border-solid border-[#ccc] rounded-lg py-3 px-6">
        Return to shop
      </button>
      <button class="border border-solid border-[#ccc] rounded-lg py-3 px-6">
        Update cart
      </button>
    </div>
    <div class="mt-20 flex justify-between">
      <div class="flex gap-4">
        <input
          class="border border-solid border-[#000] h-fit rounded-md py-3 px-6"
          type="text"
          placeholder="Coupon Code"
        />
        <button
          class="bg-primary text-white h-fit py-3 px-6 rounded-md font-medium"
        >
          Apply Coupon
        </button>
      </div>
      <div class="border border-solid border-black py-8 px-6 rounded-md">
        <div class="w-[422px]">
          <h1 class="text-base font-semibold mb-6">Cart total</h1>
          <div class="flex justify-between border-b-2 border-[#ccc] pb-4">
            <p>Subtotal:</p>
            <p>${{ subTotal }}</p>
          </div>
          <div class="flex justify-between border-b-2 border-[#ccc] py-4">
            <p>Shipping:</p>
            <div>
              <p v-if="subTotal > 500">Free</p>
              <p v-else>$30</p>
            </div>
          </div>
          <div class="flex justify-between border-b-2 border-[#ccc] py-4">
            <p>Total:</p>
            <div>
              <p v-if="subTotal > 500">${{ subTotal }}</p>
              <p v-else>${{ subTotal + 30 }}</p>
            </div>
          </div>
        </div>

        <!-- <div>
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />
        </div> -->
        <router-link to="/checkout">
          <button
            class="mt-4 bg-primary text-white font-medium py-4 px-12 rounded-md"
            @click="submit"
          >
            procees to checkout
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onBeforeMount } from "vue";
// import { StripeCheckout } from "@vue-stripe/vue-stripe";
import firebase from "firebase/compat/app";
export default {
  setup() {
    const columns = [
      {
        title: "Product",
        dataIndex: "product",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
      {
        title: "Subtotal",
        dataIndex: "subtotal",
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    const formState = reactive({
      "input-number": 1,
    });

    return {
      formState,
      columns,
      products: ref([]),
      subTotal: ref(null),
      rowSelection,
    };
  },

  mounted() {
    const url = "http://localhost:3000/user-products";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
        this.products.forEach((product, index) => {
          product.key = index + 1;
          product.subtotal = product.price * product.quantity;
          this.subTotal += product.subtotal;
          product.subtotal = "$" + product.subtotal;
          product.price = "$" + product.price;
        });
      })
      .catch((err) => console.log("err: ", err));
  },
};
</script>
