import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CalendarCheck2, CalendarFold, X } from "lucide-react";
import React from "react";
import CustomDatePickerButton from "./CustomDatePickerButton";
import ProjectMemberSearchBar from "./ProjectMemberSearchBar";
import handleAddTask from "../utils/handleAddTask";

export default function CreateTaskForm({ onClose, status, project }) {
  const [addedUsers, setAddedUsers] = React.useState([]);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      description: "",
    },
  });

  async function handleFormSubmit(formData) {
    const assignees = addedUsers.map((user) => user._id);

    await handleAddTask(
      formData.title,
      formData.description,
      status._id,
      project._id,
      assignees,
      formData.startDate,
      formData.dueDate
    );
    reset();
    setAddedUsers([]);
    onClose();
  }

  function handleAddUser(user) {
    setAddedUsers((prev) => [...prev, user]);
  }

  function removeUser(userId) {
    setAddedUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-4'>
      <Input
        errors={errors}
        register={register}
        registerContent={{
          required: "Title is required",
          minLength: {
            value: 2,
            message: "Title must be at least 2 characters",
          },
        }}
        name={"title"}
        label={"Title"}
        id={"title"}
        type={"text"}
      />
      <TextArea
        errors={errors}
        register={register}
        registerContent={{
          required: "Description is required",
          maxLength: {
            value: 200,
            message: "Name must be at most 100 characters",
          },
        }}
        name={"description"}
        label={`Description`}
        limit={200}
        id={"description"}
        watch={watch}
      />
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-2 grow'>
          <p>Start Date</p>
          <Controller
            control={control}
            name='startDate'
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText='--/--/--'
                customInput={<CustomDatePickerButton icon={<CalendarFold />} />}
                enableTabLoop={false}
              />
            )}
          />
        </div>
        <div className='flex flex-col gap-2 grow'>
          <p>Due Date</p>
          <Controller
            control={control}
            name='dueDate'
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText='--/--/--'
                customInput={<CustomDatePickerButton icon={<CalendarCheck2 />} />}
                enableTabLoop={false}
              />
            )}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p>Assignees</p>
        {addedUsers.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {addedUsers.map((user) => {
              return (
                <div
                  key={user._id}
                  className='flex items-center gap-2 bg-oxford-blue text-white p-2 rounded-md'
                >
                  {user.username}
                  <button onClick={() => removeUser(user._id)} type='button'>
                    <X />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <ProjectMemberSearchBar
          projectId={project._id}
          addUser={handleAddUser}
          addedUsers={addedUsers}
        />
      </div>
      <Button style='submit' type='submit'>
        Create Task
      </Button>
    </form>
  );
}
