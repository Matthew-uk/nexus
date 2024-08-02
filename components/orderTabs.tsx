import React from "react";
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
import { orders } from "@/data/orders";

// Define the type for the order data
interface Order {
  customer: {
    name: string;
    email: string;
  };
  type: string;
  status: string;
  date: string;
  amount: string;
}

// Reusable TableRow component
const OrderTableRow: React.FC<Order> = ({
  customer,
  type,
  status,
  date,
  amount,
}) => (
  <TableRow>
    <TableCell>
      <div className='font-medium'>{customer.name}</div>
      <div className='hidden text-sm text-muted-foreground md:inline'>
        {customer.email}
      </div>
    </TableCell>
    <TableCell className='hidden sm:table-cell'>{type}</TableCell>
    <TableCell className='hidden sm:table-cell'>
      <Badge
        className='text-xs'
        variant={status === "Fulfilled" ? "secondary" : "outline"}>
        {status}
      </Badge>
    </TableCell>
    <TableCell className='hidden md:table-cell'>{date}</TableCell>
    <TableCell className='text-right'>{amount}</TableCell>
  </TableRow>
);

const OrderTabs: React.FC = () => {
  return (
    <Tabs defaultValue='week'>
      <div className='flex items-center'>
        <TabsList>
          <TabsTrigger value='week'>Week</TabsTrigger>
          <TabsTrigger value='month'>Month</TabsTrigger>
          <TabsTrigger value='year'>Year</TabsTrigger>
        </TabsList>
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
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
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
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className='hidden sm:table-cell'>Type</TableHead>
                  <TableHead className='hidden sm:table-cell'>Status</TableHead>
                  <TableHead className='hidden md:table-cell'>Date</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <OrderTableRow key={index} {...order} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
