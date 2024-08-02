"use client";
import useUserStore from "@/store/store";
import React, { useEffect, useState } from "react";
import PaymentModal from "./paymentModal";
import { Wallet } from "lucide-react";
import axios from "axios";
import UserTask from "./userTask";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  taskLink: string;
  taskPlatform: string;
}

const Subscribed = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useUserStore();

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/tasks/getTask");
      setTasks(response.data.tasks);
      console.log(response.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className='min-h-screen py-8 w-full'>
      <h2>Engage to earn money on our platform</h2>
      {/* {tasks.length < 0 && <p>No Task Available right now.</p>} */}
      <Table className='bg-white text-primary shadow-inner text-[0.95em]'>
        <TableCaption>A list of your active social task(s).</TableCaption>
        <TableHeader>
          <TableRow className='shadow-md'>
            <TableHead className='w-[100px] text-primary'>Platform</TableHead>
            <TableHead className='text-primary'>Task Title</TableHead>
            {/* <TableHead>Method</TableHead> */}
            <TableHead className='text-right text-primary'>
              Engagement Link
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task: Task) => (
              <UserTask
                key={task._id}
                userId={id}
                taskDescription={task.taskDescription}
                taskLink={task.taskLink}
                taskPlatform={task.taskPlatform}
                // userId={task.userId}
                taskId={task._id}
                taskTitle={task.taskName}
              />
            ))
          ) : (
            <p>No Task Available now</p>
          )}
        </TableBody>
        {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
      </Table>
    </div>
  );
};

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
  }, [isSubscribed]);

  return (
    <div className='font-poppins w-full md:px-0 px-8'>
      {isSubscribed === false ? <NotSubscribed /> : <Subscribed />}
    </div>
  );
};

export default EarnComponent;
