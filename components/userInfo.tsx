import React from "react";
import { UserData } from "@/app/dashboard/page";
import { IoPowerSharp } from "react-icons/io5";
import { List, Send, Wallet } from "lucide-react";
import { Button } from "./ui/button";

const UserInfo: React.FC<{ data: UserData }> = ({ data }) => (
  <div className="w-full min-h-screen flex flex-col gap-1 font-poppins pt-1">
    {/* Section 1 */}
    <div className="flex justify-between py-2 bg-white px-2">
      <h2>Welcome, {data.firstName}</h2>
      <div className="flex items-center gap-1 text-primary">
        <IoPowerSharp size={18} className='font-bold'/> 
        <h2>Logout</h2>
      </div>
    </div>

    {/* Section 2 */}
    <div className="bg-white py-4">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <h3>My Balance</h3>
        <h2 className="text-xl">₦0.00</h2>
        <div className="flex justify-center items-center gap-4 py-2">
          <Button className="bg-transparent text-black border border-gray-300 rounded-[4px] ease-in-out duration-200 hover:text-white text-sm flex gap-1 font-normal transition-all hover:scale-105 hover:border-0 hover:rounded-md text-center">
            <Wallet size={13} />FUND
          </Button>
          <Button className="bg-transparent text-black border border-gray-300 rounded-[4px] ease-in-out duration-200 hover:text-white text-sm flex gap-1 font-normal transition-all hover:scale-105 hover:border-0 hover:rounded-md text-center">
            <Send size={13}/>WITHDRAW
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-8 py-2">
        <div className="text-sm flex items-center flex-row gap-1">
          <List size={14}/>
          <p>Total Earnings</p>
        </div>
        <div className="text-sm flex items-center flex-row gap-1">
          <Wallet size={14}/>
          <p>Pending Balance</p>
        </div>
        <div className="text-sm flex items-center flex-row gap-1">
          <Send size={14}/>
          <p>Amount Spent</p>
        </div>
      </div>
    </div>
    {/* Section 3 */}
  </div>
  // <div className="max-w-4xl w-full p-6">
  //     <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
  //     <div className="bg-white shadow-md rounded-lg p-6">
  //         <h2 className="text-xl font-bold mb-4">User Information</h2>
  //         <div>
  //             <p><strong>ID:</strong> {data.id}</p>
  //             <p><strong>Email:</strong> {data.email}</p>
  //             <p><strong>First Name:</strong> {data.firstName}</p>
  //             <p><strong>Last Name:</strong> {data.lastName}</p>
  //         </div>
  //     </div>
  // </div>
);

export default UserInfo;