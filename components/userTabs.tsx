"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
import { Badge } from "./ui/badge";
import axios from "axios";

// Define the type for user data
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number; // Correct type for balance
  isSubscribed: boolean; // Correct type for isSubscribed
  createdAt: Date | string; // Allow Date or string
}

// Reusable TableRow component for users
const UserTableRow: React.FC<User> = ({
  _id,
  email,
  balance,
  firstName,
  lastName,
  isSubscribed,
  createdAt,
}) => {
  // Convert createdAt from string to Date object if it's a string
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  return (
    <TableRow>
      <TableCell>
        <div className='font-medium'>{`${firstName} ${lastName}`}</div>
        <div className='hidden text-sm text-muted-foreground md:inline'>
          {email}
        </div>
      </TableCell>
      <TableCell className='hidden sm:table-cell tracking-wide'>
        ₦{balance.toLocaleString()}
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
        <Badge
          className='text-xs'
          // Implement logic for referees if needed
        >
          0
        </Badge>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {date.toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
};

const UserTabs: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<User[]>("/api/auth/getAllUsers", {
        headers: {
          Authorization: "esaduviedede@gmail.com", // Adjust if needed
        },
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Tabs defaultValue='week'>
      <div className='flex items-center'>
        {/* Uncomment if using multiple tabs */}
        {/* <TabsList>
          <TabsTrigger value='week'>Week</TabsTrigger>
          <TabsTrigger value='month'>Month</TabsTrigger>
          <TabsTrigger value='year'>Year</TabsTrigger>
        </TabsList> */}
        {loading ? (
          <p>Loading All Users...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className='ml-auto flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-7 gap-1 text-sm'>
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
        )}
      </div>
      <TabsContent value='week'>
        <Card>
          <CardHeader className='px-7'>
            <CardTitle>Users</CardTitle>
            <CardDescription>Recent users of your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className='hidden sm:table-cell'>
                    Balance
                  </TableHead>
                  <TableHead className='hidden sm:table-cell'>
                    Referees
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Joined Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user) => (
                  <UserTableRow key={user._id} {...user} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
