import useUserStore from "@/store/store";
import React, { useEffect } from "react";
import PaymentModal from "./paymentModal";
import { Wallet } from "lucide-react";

const Subscribed = () => (
  <div>
    <h2>Click to earn money on our platform</h2>
  </div>
);

const NotSubscribed = () => (
  <div className='flex flex-col items-center justify-center gap-4'>
    <h2>
      To earn on our platform, fund minimum of{" "}
      <span className='text-primary'>₦200</span>
    </h2>
    <PaymentModal
      icon={<Wallet />}
      text='Fund Account'
      className='text-base p-5 hover:text-base hover:tracking-wider'
      // className='px-4 py-6 bg-primary text-white text-base hover:bg-transparent border hover:text-primary hover:border-primary'
    />
  </div>
);

const EarnComponent = () => {
  const { isSubscribed } = useUserStore();
  useEffect(() => {
    console.log(isSubscribed);
  }, []);
  return (
    <div className='font-poppins'>
      {isSubscribed === false ? <NotSubscribed /> : <Subscribed />}
    </div>
  );
};

export default EarnComponent;
