"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IAdmin {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "superadmin";
}

interface FormValues {
  username: string;
  email: string;
  password: string;
  role: "admin" | "superadmin";
}

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/admin");
        setAdmins(response.data);
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post("/api/admin", data);
      setAdmins([...admins, response.data]);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Failed to add admin:", error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen font-poppins bg-blue-950 md:px-0 px-4 login'>
      <Card className='mx-auto max-w-sm shadow-2xl shadow-white'>
        <CardHeader>
          <CardTitle className='text-xl text-center'>
            Admin Management
          </CardTitle>
          <CardDescription>Manage your admin users here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                placeholder='Username'
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className='text-red-500 text-sm'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='Email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                placeholder='Password'
                type='password'
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='role'>Role</Label>
              <Select
                defaultValue=''
                onValueChange={(value) =>
                  register("role").onChange({ target: { value } })
                }
                required>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='superadmin'>Superadmin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className='text-red-500 text-sm'>{errors.role.message}</p>
              )}
            </div>
            <Button type='submit'>Add Admin</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;
