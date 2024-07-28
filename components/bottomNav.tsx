import {
  IoHomeOutline,
  IoWalletOutline,
  IoAddCircleOutline,
  IoCartOutline,
  IoMenu,
} from "react-icons/io5";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavComponent: React.FC<{
  icon: React.ReactNode;
  title: string;
  active: boolean;
  link: string;
}> = ({ icon, title, active, link }) => {
  return (
    <Link
      href={link}
      className={`flex flex-col items-center cursor-pointer ${
        active ? "text-primary" : "text-black"
      }`}>
      {icon}
      {title}
    </Link>
  );
};

const BottomNav = () => {
  const currentPath = usePathname();

  return (
    <div className='md:hidden flex justify-between items-center fixed bottom-0 w-full h-[70px] bg-white px-6'>
      <NavComponent
        icon={<IoHomeOutline size={25} />}
        title='Home'
        active={currentPath === "/dashboard"}
        link='/dashboard'
      />
      <NavComponent
        icon={<IoWalletOutline size={25} />}
        title='Earn'
        active={currentPath === "/dashboard/earn"}
        link='/dashboard/earn'
      />
      <NavComponent
        icon={<IoAddCircleOutline size={25} />}
        title='Advertise'
        active={currentPath === "/dashboard/advertise"}
        link='/dashboard/advertise'
      />
      <NavComponent
        icon={<IoCartOutline size={25} />}
        title='Market'
        active={currentPath === "/dashboard/market"}
        link='/dashboard/market'
      />
      <NavComponent
        icon={<IoMenu size={25} />}
        title='More'
        active={currentPath === "/dashboard/more"}
        link='/dashboard/more'
      />
    </div>
  );
};

export default BottomNav;
