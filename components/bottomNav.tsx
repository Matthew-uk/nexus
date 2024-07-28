import { IoHomeOutline, IoWalletOutline, IoAddCircleOutline, IoCartOutline, IoMenu } from "react-icons/io5";
import React from 'react';

const NavComponent: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <p className="text-xs">{title}</p>
    </div>
  );
};

const BottomNav = () => {
  return (
    <div className="md:hidden flex justify-between items-center fixed bottom-0 w-full h-[70px] bg-white px-6">
      <NavComponent icon={<IoHomeOutline size={25} />} title="Home" />
      <NavComponent icon={<IoWalletOutline size={25} />} title="Earn" />
      <NavComponent icon={<IoAddCircleOutline size={25} />} title="Advertise" />
      <NavComponent icon={<IoCartOutline size={25} />} title="Cart" />
      <NavComponent icon={<IoMenu size={25} />} title="Menu" />
    </div>
  );
};

export default BottomNav;
