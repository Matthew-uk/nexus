import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import useUserStore from "@/store/store";
import Logo from "@/img/logo.png";
import { useRouter } from "next/navigation";

interface PaymentModalComponent {
  text: string;
  icon: React.ReactNode;
  className?: string;
}

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  amount: number;
}

const PaymentModal: React.FC<PaymentModalComponent> = ({
  text,
  icon,
  className,
}) => {
  const { email, firstName, lastName, id } = useUserStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      phone: "09088888888",
      amount: 500,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission, such as calling PaymentComponent or an API
    handleFlutterPayment(data);
  };

  const handleFlutterPayment = (data: FormValues) => {
    const config = {
      public_key:
        process.env.FLUTTERWAVE_PUBLIC_KEY ||
        "FLWPUBK_TEST-7a5d015bef4166879426e55fac57dbe7-X",
      tx_ref: `TX-${Date.now()}`,
      amount: data.amount,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: data.email,
        phone_number: data.phone,
        name: `${data.firstName} ${data.lastName}`,
      },
      customizations: {
        title: "Nexus",
        description: "Fund your wallet",
        logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
      },
    };

    const handleFlutterwavePayment = useFlutterwave(config);

    handleFlutterwavePayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "completed" || "successful") {
          router.refresh();
          console.log("Payment successful:", response);
          updateUserBalance(data.amount); // Update the user's balance after successful payment
        } else {
          console.log("Payment failed:", response);
        }
        closePaymentModal(); // This will close the modal programmatically
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };

  const updateUserBalance = async (amount: number) => {
    try {
      const response = await axios.post("/api/update/balance", {
        userId: id,
        amount,
      });

      if (response.status === 200) {
        console.log("Balance updated successfully");
      } else {
        console.error("Failed to update balance:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className='font-poppins'>
        <Button
          variant='outline'
          className={`bg-transparent text-primary border border-primary rounded-[4px] ease-in-out duration-200 hover:text-white text-sm flex gap-1 font-normal transition-all hover:scale-105 hover:border-0 hover:rounded-md text-center hover:bg-primary ${className}`}>
          {icon}
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] font-poppins'>
        <DialogHeader>
          <DialogTitle>Fund Account</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='firstName' className='text-right'>
                First Name
              </Label>
              <Input
                id='firstName'
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className='col-span-3'
                type='text'
                placeholder='First Name'
              />
              {errors.firstName && (
                <span className='col-span-4 text-red-500 text-right'>
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='lastName' className='text-right'>
                Last Name
              </Label>
              <Input
                id='lastName'
                {...register("lastName", { required: "Last Name is required" })}
                className='col-span-3'
                type='text'
                placeholder='Last Name'
              />
              {errors.lastName && (
                <span className='col-span-4 text-red-500 text-right'>
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Input
                id='email'
                {...register("email", {
                  required: "Enter a valid email address",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className='col-span-3'
                type='email'
                placeholder='Email'
              />
              {errors.email && (
                <span className='col-span-4 text-red-500 text-right'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='phone' className='text-right'>
                Phone Number
              </Label>
              <Input
                id='phone'
                {...register("phone", { required: "Phone Number is required" })}
                className='col-span-3'
                type='text'
                placeholder='09088888888'
              />
              {errors.phone && (
                <span className='col-span-4 text-red-500 text-right'>
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='amount' className='text-right'>
                Amount(₦)
              </Label>
              <Input
                id='amount'
                {...register("amount", {
                  required: "Amount is required",
                  valueAsNumber: true,
                })}
                className='col-span-3'
                type='number'
                placeholder='Amount'
              />
              {errors.amount && (
                <span className='col-span-4 text-red-500 text-right'>
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
