"use client";
import React, { useState } from "react";
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
import { Label } from "@radix-ui/react-label";
import Cookies from "js-cookie";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setLoading(true);
      setLoginError(null);
      const response = await axios.post("/api/admin/login", data);
      const { token, user } = response.data;

      // Store the token in cookies or local storage
      // Example using local storage (not recommended for sensitive data)
      Cookies.set("admin-token", token);

      // Handle successful login, e.g., redirect
      console.log("Login successful:", user);
      // You might want to redirect or update the app state here
    } catch (error) {
      setLoginError("Failed to login. Please check your credentials.");
      console.error("Failed to login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen font-poppins bg-blue-950 md:px-0 px-4'>
      <Card className='mx-auto max-w-sm shadow-2xl shadow-white'>
        <CardHeader>
          <CardTitle className='text-xl text-center'>Admin Login</CardTitle>
          <CardDescription>Sign in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='Email'
                type='email'
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
            {loginError && <p className='text-red-500 text-sm'>{loginError}</p>}
            <Button
              type='submit'
              className={`${loading && "opacity-75"}`}
              disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
