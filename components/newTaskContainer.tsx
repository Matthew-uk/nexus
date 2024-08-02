"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  RiTwitterXLine,
  RiInstagramLine,
  RiFacebookCircleFill,
} from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type FormValues = {
  taskName: string;
  taskPlatform: string;
  taskLink: string;
  taskDescription: string;
};

const NewTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks/createTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        reset();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Task</Button>
      </DialogTrigger>
      <DialogContent className='font-poppins'>
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 font-poppins'>
          <div>
            <label
              htmlFor='task-name'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Task Name
            </label>
            <Input
              id='task-name'
              placeholder='Enter task name'
              {...register("taskName", { required: "Task Name is required" })}
            />
            {errors.taskName && (
              <p className='text-red-500'>{errors.taskName.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='task-platform'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Task Platform
            </label>
            <Controller
              control={control}
              name='taskPlatform'
              rules={{ required: "Task Platform is required" }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select platform' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='twitter'>
                      <div className='flex items-center flex-row gap-1'>
                        <RiTwitterXLine />
                        Twitter
                      </div>
                    </SelectItem>
                    <SelectItem value='instagram'>
                      <div className='flex items-center flex-row gap-1'>
                        <RiInstagramLine />
                        Instagram
                      </div>
                    </SelectItem>
                    <SelectItem value='facebook'>
                      <div className='flex items-center flex-row gap-1'>
                        <RiFacebookCircleFill />
                        Facebook
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.taskPlatform && (
              <p className='text-red-500'>{errors.taskPlatform.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='task-link'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Task Link
            </label>
            <Input
              id='task-link'
              placeholder='Enter task link'
              {...register("taskLink", { required: "Task Link is required" })}
            />
            {errors.taskLink && (
              <p className='text-red-500'>{errors.taskLink.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='task-description'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Task Description
            </label>
            <Textarea
              id='task-description'
              placeholder='Enter task description'
              rows={3}
              {...register("taskDescription", {
                required: "Task Description is required",
              })}
            />
            {errors.taskDescription && (
              <p className='text-red-500'>{errors.taskDescription.message}</p>
            )}
          </div>
          <div className='flex gap-4'>
            <Button type='submit' disabled={loading}>
              {loading ? "Loading..." : "Save Task"}
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTask;
