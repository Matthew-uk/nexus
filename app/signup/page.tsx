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
import Logo from "@/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  referrer?: string; // Referral code is optional
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const password = watch("password");

  useEffect(() => {
    // Extract the ref query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("ref");

    // If ref exists, set the referrer field value
    if (referrer) {
      setValue("referrer", referrer);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", data);
      console.log("Signup successful:", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen font-poppins bg-blue-950 md:px-0 px-4 login'>
      <Card className='mx-auto max-w-sm shadow-2xl shadow-white'>
        <CardHeader>
          <div className='w-full flex items-center justify-center'>
            <Image src={Logo} alt='nexus' className='w-1/2 h-1/2' />
          </div>
          <CardTitle className='text-xl text-center'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='first-name'>First name</Label>
                <Input
                  id='first-name'
                  placeholder='Max'
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className='text-red-500 text-sm'>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='last-name'>Last name</Label>
                <Input
                  id='last-name'
                  placeholder='Robinson'
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className='text-red-500 text-sm'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
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
                type='password'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder='********'
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder='********'
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='referrer'>Referral Code (Optional)</Label>
              <Input
                id='referrer'
                placeholder='Referral Code'
                {...register("referrer")}
              />
            </div>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create an account"}
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{" "}
            <Link href='/login' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
