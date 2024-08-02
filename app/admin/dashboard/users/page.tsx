import { TooltipProvider } from "@/components/ui/tooltip";
import AsideComponents from "@/components/aside";
import Header from "@/components/userHeader";
import UserTabs from "@/components/userTabs";

const Dashboard = () => {
  return (
    <TooltipProvider>
      <div className='flex min-h-screen w-full flex-col bg-muted/40 font-poppins'>
        <AsideComponents />
        <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
          <Header />
          <main className='px-6'>
            <UserTabs />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
