import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import AsideComponents from "@/components/aside";
import Header from "@/components/taskHeader";
import NewTaskContainer from "@/components/newTaskContainer";
import TaskTabs from "@/components/taskTabs";

const TasksPage = () => {
  return (
    <TooltipProvider>
      <div className='flex min-h-screen w-full flex-col bg-muted/40 font-poppins'>
        <AsideComponents />
        <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
          <Header />
          <main className='px-6 font-poppins'>
            <NewTaskContainer />
            <TaskTabs />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TasksPage;
