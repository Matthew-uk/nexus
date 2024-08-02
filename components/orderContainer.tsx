import React from "react";
import Orders from "./orders";
import OrderTabs from "./orderTabs";
import SingleOrder from "./singleOrder";

const OrderContainer = () => {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <Orders />
        <OrderTabs />
      </div>
      <div>
        <SingleOrder />
      </div>
    </main>
  );
};

export default OrderContainer;
