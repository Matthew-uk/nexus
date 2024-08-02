"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { File, ListFilter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";

// Define the type for task data
interface TaskInterface {
  _id: string;
  taskName: string;
  taskPlatform: string;
  taskLink: string;
  taskDescription: string;
  createdAt: Date | string;
}

// Define the type for the API response
interface TaskResponse {
  tasks: TaskInterface[];
}

// Reusable TableRow component for tasks
const TaskTableRow: React.FC<TaskInterface> = ({
  taskName,
  taskPlatform,
  taskLink,
  taskDescription,
  createdAt,
}) => {
  // Convert createdAt from string to Date object if it's a string
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  return (
    <TableRow>
      <TableCell>
        <div className='font-medium'>{taskName}</div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{taskPlatform}</TableCell>
      <TableCell className='hidden sm:table-cell'>{taskLink}</TableCell>
      <TableCell className='hidden sm:table-cell'>{taskDescription}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {date.toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
};

const TaskTabs: React.FC = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<TaskResponse>("/api/tasks/getTask");
      console.log("API Response:", response.data); // Debug response
      // Set tasks from response object
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  // Debug tasks state
  console.log("Tasks State:", tasks);

  return (
    <Tabs defaultValue='week'>
      <div className='flex items-center'>
        <div className='ml-auto flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
                <ListFilter className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only'>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
            <File className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only'>Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value='week'>
        <Card x-chunk='dashboard-05-chunk-3'>
          <CardHeader className='px-7'>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Recent tasks in your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Name</TableHead>
                  <TableHead className='hidden sm:table-cell'>
                    Platform
                  </TableHead>
                  <TableHead className='hidden sm:table-cell'>Link</TableHead>
                  <TableHead className='hidden sm:table-cell'>
                    Description
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Created At
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      Loading Tasks...
                    </TableCell>
                  </TableRow>
                ) : tasks.length > 0 ? (
                  tasks.map((task) => <TaskTableRow key={task._id} {...task} />)
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      No tasks available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TaskTabs;
