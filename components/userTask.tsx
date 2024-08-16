import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiTwitterXLine,
} from "react-icons/ri";
import { TableCell, TableRow } from "@/components/ui/table";

interface UserTaskInterface {
  userId: string;
  taskId: string;
  taskDescription: string;
  taskTitle: string;
  taskLink: string;
  taskPlatform: string;
}

// Create a mapping of platforms to icons
const platformIcons: { [key: string]: React.ReactNode } = {
  instagram: <RiInstagramLine size={23} />,
  twitter: <RiTwitterXLine size={23} />,
  facebook: <RiFacebookCircleFill size={23} />,
};

const UserTask: React.FC<UserTaskInterface> = ({
  userId,
  taskId,
  taskTitle,
  taskDescription,
  taskLink,
  taskPlatform,
}) => {
  // Retrieve the icon based on taskPlatform, defaulting to null if not found
  const Icon = platformIcons[taskPlatform] || null;

  return (
    <TableRow key={taskId} className='text-black'>
      <TableCell className='font-medium'>{Icon}</TableCell>
      <TableCell>{taskTitle}</TableCell>
      {/* <TableCell>{taskDescription}</TableCell> */}
      <TableCell className='text-right'>
        <Link href={taskLink} target='_blank' rel='noopener noreferrer'>
          <Button>Click</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default UserTask;
