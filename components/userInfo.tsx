import React, { useState } from "react";
import { UserData } from "@/app/dashboard/page";
import { IoPowerSharp } from "react-icons/io5";
import { Copy, CopyCheck, List, Send, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PaymentModal from "./paymentModal";
import { toast } from "react-toastify";
import useUserStore from "@/store/store";

const UserInfo: React.FC<{ data: UserData }> = ({ data }) => {
  const { referralCode } = useUserStore();
  console.log(referralCode);

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const formatBalance = (balance: number) => {
    return balance <= 0 ? balance.toFixed(2) : balance.toLocaleString();
  };

  return (
    <div className='w-full min-h-screen flex flex-col gap-1 font-poppins pt-1'>
      <Header firstName={data.firstName} onLogout={handleLogout} />
      <BalanceSection
        balance={data.balance}
        pendingBalance={data.pendingBalance}
        formatBalance={formatBalance}
      />
      <WelcomeSection />
    </div>
  );
};

const Header: React.FC<{ firstName: string; onLogout: () => void }> = ({
  firstName,
  onLogout,
}) => (
  <header className='flex justify-between py-2 bg-white md:px-2 px-4'>
    <h2>Welcome, {firstName}</h2>
    <div className='flex items-center gap-1 text-primary'>
      <IoPowerSharp size={18} className='font-bold' />
      <h2 onClick={onLogout} className='hover:cursor-pointer'>
        Logout
      </h2>
    </div>
  </header>
);

const BalanceSection: React.FC<{
  balance: number;
  pendingBalance: number;
  formatBalance: (balance: number) => string;
}> = ({ balance, formatBalance, pendingBalance }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopyText = (referralCode: string) => {
    const currentUrl = `${window.location.protocol}//${window.location.host}/signup?ref=${referralCode}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        toast.success("Referral link copied");
      })
      .catch((err) => {
        toast.error(`Failed to copy link: ${err.message}`);
      });
  };
  const { referralCode } = useUserStore();
  return (
    <section className='bg-white py-4'>
      <div className='flex flex-col justify-center items-center gap-4 text-center'>
        <h3>My Balance</h3>
        <h2 className='text-xl'>₦{formatBalance(balance)}</h2>
        <div className='flex justify-center items-center gap-4 pt-2'>
          <PaymentModal text={"FUND"} icon={<Wallet size={13} />} />
          <ActionButton icon={<Send size={13} />} text='WITHDRAW' />
        </div>
        <div className='flex items-center text-center text-primary hover:cursor-pointer'>
          Refer and Earn ₦200.{" "}
          {copied ? (
            <CopyCheck className='ml-4' size={23} />
          ) : (
            <Copy
              className='ml-4'
              size={20}
              onClick={() => handleCopyText(referralCode)}
            />
          )}
        </div>
      </div>
      <BalanceDetails
        balance={balance}
        pendingBalance={pendingBalance}
        formatBalance={formatBalance}
      />
    </section>
  );
};

const ActionButton: React.FC<{
  icon: React.ReactNode;
  text: string;
}> = ({ icon, text }) => (
  <Button className='bg-transparent text-primary border border-primary rounded-[4px] ease-in-out duration-200 hover:text-white text-sm flex gap-1 font-normal transition-all hover:scale-105 hover:border-0 hover:rounded-md text-center'>
    {icon}
    {text}
  </Button>
);

const BalanceDetails: React.FC<{
  pendingBalance: number;
  balance: number;
  formatBalance: (balance: number) => string;
}> = ({ balance, formatBalance, pendingBalance }) => (
  <div className='flex md:flex-row flex-col items-center justify-between px-8 py-2 gap-4'>
    <BalanceDetail
      label='Total Earnings'
      icon={<List size={14} />}
      amount={balance}
      formatBalance={formatBalance}
    />
    <BalanceDetail
      label='Pending Balance'
      icon={<Wallet size={14} />}
      amount={pendingBalance}
      formatBalance={formatBalance}
    />
    <BalanceDetail
      label='Amount Spent'
      icon={<Send size={14} />}
      amount={balance}
      formatBalance={formatBalance}
    />
  </div>
);

const BalanceDetail: React.FC<{
  label: string;
  icon: React.ReactNode;
  amount: number;
  formatBalance: (balance: number) => string;
}> = ({ label, icon, amount, formatBalance }) => (
  <div className='text-sm flex items-center flex-col gap-1'>
    <div className='flex flex-row gap-1 items-center w-max'>
      {icon}
      <p>{label}</p>
    </div>
    <p>₦{formatBalance(amount)}</p>
  </div>
);

const WelcomeSection: React.FC = () => (
  <section className='bg-white md:py-6 py-8 px-8 flex flex-col justify-center items-center text-center pb-24'>
    <div className='gap-[0.05rem] mb-8'>
      <h2 className='font-bold text-2xl'>Welcome to Nexus</h2>
      <p className='font-light text-sm'>
        Please select what you want to do on Hawkit today
      </p>
    </div>
    <div className='flex justify-start md:justify-between items-center md:flex-row flex-col md:gap-0 gap-8'>
      <WelcomeOption
        title='For Social Media Users and Advertisers'
        description='Buy Social Media Engagements and Get People to Post Your Adverts on their Social Media'
        details='Get real people on various social media to post your adverts and perform social engagement tasks for you on their social media account.'
        buttonText='GET STARTED NOW'
      />
      <WelcomeOption
        title='For Earners'
        description='Get Paid for Posting Adverts and Engagements on Your Social Media'
        details='Earn steady income by reselling products and posting adverts and performing social media engagement tasks for businesses and top brands on your social media account.'
        buttonText='BECOME A MEMBER'
      />
    </div>
  </section>
);

const WelcomeOption: React.FC<{
  title: string;
  description: string;
  details: string;
  buttonText: string;
}> = ({ title, description, details, buttonText }) => (
  <div className='flex flex-col gap-2 px-8 justify-between items-center md:w-1/2 w-full dark:bg-black'>
    <h2 className='text-sm font-normal underline-after'>{title}</h2>
    <p className='text-xl md:text-2xl font-semibold mb-4'>{description}</p>
    <p className='text-base'>{details}</p>
    <Button className='bg-primary'>{buttonText}</Button>
  </div>
);

export default UserInfo;
