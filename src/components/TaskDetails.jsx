import { Tooltip } from "react-tooltip";
import DeleteButton from "./DeleteButton";
import { BookOpenText, CalendarCheck2, CalendarFold, Edit, Type, UserPen, X } from "lucide-react";
import Button from "./Button";
import TextArea from "./TextArea";
import ReactFocusLock from "react-focus-lock";
import React from "react";
import CloseButton from "./CloseButton";
import ConfirmationForm from "./ConfirmationForm";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import CustomDatePickerButton from "./CustomDatePickerButton";
import ProjectMemberSearchBar from "./ProjectMemberSearchBar";
import handleEditTask from "../utils/handleEditTask";
import useUserStore from "../store/useUserStore";
import handleDeleteTask from "../utils/handleDeleteTask";
import usePermissionStore from "../store/usePermissionStore";

export default function TaskDetails({ task, closeSidebar, project }) {
  const [submitFormShown, setSubmitFormShown] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState(false);
  const [addedUsers, setAddedUsers] = React.useState(task?.assignees);

  const { userId } = useUserStore();

  const { adminPermission, ownerPermission } = usePermissionStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    defaultValues: {
      title: task?.title ? task?.title : "",
      description: task?.description ? task?.description : "",
      startDate: task?.startDate ? task?.startDate : null,
      dueDate: task?.endDate ? task?.endDate : null,
    },
  });

  function handleformSubmit(data) {
    handleEditTask(
      task?.project,
      task?.status,
      task?._id,
      data.title,
      data.description,
      data.startDate,
      data.dueDate,
      addedUsers
    );
    setEditingTask(false);
  }

  function handleAddUser(user) {
    setAddedUsers((prev) => [...prev, user]);
  }

  function removeUser(userId) {
    setAddedUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
  }

  function validateDates(startDate) {
    const dueDate = getValues("dueDate");
    if (dueDate && new Date(startDate) > new Date(dueDate)) {
      setError("startDate", {
        type: "manual",
        message: "Start date must be before or the same as due date",
      });
      return false;
    } else {
      clearErrors("startDate");
      return true;
    }
  }

  const formattedStartDate = task?.startDate ? dayjs(task.startDate).format("MMMM D, YYYY") : null;
  const formattedDueDate = task?.endDate ? dayjs(task.endDate).format("MMMM D, YYYY") : null;
  return (
    <ReactFocusLock>
      <div className='flex flex-col gap-4 items-start'>
        {submitFormShown && (
          <ConfirmationForm
            label={"Do you want to delete this task?"}
            onCancel={() => setSubmitFormShown(false)}
            onSubmition={async () => {
              await handleDeleteTask(task?.project, task?.status, task?._id);
              closeSidebar();
            }}
          />
        )}
        <div className='self-end'>
          <CloseButton close={closeSidebar} />
        </div>
        <div className='flex flex-col gap-8 self-stretch items-start'>
          <form onSubmit={handleSubmit(handleformSubmit)} className='flex flex-col gap-6 w-full'>
            <div className='flex items-center justify-between gap-2'>
              <p className='text-oxford-blue text-2xl font-black leading-[1]'>Task Information</p>
              {(adminPermission ||
                ownerPermission ||
                task?.createdBy?._id === userId ||
                task?.assignees.some(
                  (assignee) => assignee._id.toString() === userId.toString()
                )) && (
                <button
                  className='relative flex self-start items-center gap-4 hover:-translate-y-[.5px]'
                  type='button'
                  onClick={() => setEditingTask(!editingTask)}
                >
                  <Edit color='#001b2e' />
                </button>
              )}
            </div>
            <div
              className='flex flex-row gap-8'
              style={{ flexDirection: editingTask ? "column" : "column" }}
            >
              {!editingTask ? (
                <>
                  <div className='flex flex-col gap-4'>
                    <p className='text-xl text-oxford-blue font-bold flex items-center gap-2'>
                      <Type />
                      Title
                    </p>
                    <p className='p-3 rounded-xl shadow-inner'>{task?.title}</p>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <p className='text-xl text-oxford-blue font-bold flex items-center gap-2'>
                      <BookOpenText />
                      Description
                    </p>
                    <p className='p-3 rounded-xl shadow-inner'>{task?.description}</p>
                  </div>
                  <div className='flex flex-col items-start gap-4'>
                    <div className='flex gap-4 items-center'>
                      <p className='text-xl text-picton-blue font-bold flex gap-2'>
                        <CalendarFold />
                        Start Date:
                      </p>
                      <p>{formattedStartDate ? formattedStartDate : "--/--/--"}</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                      <p className='text-xl text-red-700 font-bold flex gap-2'>
                        <CalendarCheck2 />
                        Due Date:
                      </p>
                      <p>{formattedDueDate ? formattedDueDate : "--/--/--"}</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <p className='text-xl text-oxford-blue font-bold'>Assignees</p>
                    {task?.assignees.length > 0 ? (
                      <div className='flex flex-col p-2 bg-timberwolf rounded-lg self-start w-3/5 min-w-60 gap-2 max-h-60 overflow-auto'>
                        {task?.assignees &&
                          task?.assignees.map((user) => {
                            return (
                              <div
                                key={user._id}
                                className='bg-white rounded-md flex items-center gap-2 p-1'
                              >
                                <img
                                  src={user.avatarUrl}
                                  alt=''
                                  referrerPolicy='no-referrer'
                                  className='rounded-[50%] h-10 w-10'
                                />
                                <div className='flex flex-col justify-between'>
                                  <p className='text-base text-picton-blue'>{user.username}</p>
                                  <p className='text-xs text-gray-600'>{user.email}</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <div className='flex gap-2 items-center italic text-gray-800'>
                        <UserPen
                          style={{
                            transform:
                              "scale(1) rotate(0deg) translate(0px, 0px) skew(-5deg, 0deg)",
                          }}
                        />
                        <p>Edit task to add assignees</p>
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col gap-4'>
                    <p className='text-xl text-oxford-blue font-bold'>Created By</p>
                    <div className='bg-[#ce2d4f60] rounded-md flex items-center gap-2 p-2 self-start'>
                      <img
                        src={task?.createdBy.avatarUrl}
                        alt=''
                        referrerPolicy='no-referrer'
                        className='rounded-[50%] h-10 w-10'
                      />
                      <div className='flex flex-col justify-between'>
                        <p className='text-xl text-picton-blue font-bold'>
                          {task?.createdBy.username}
                        </p>
                        <p className='text-sm text-gray-800'>{task?.createdBy.email}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    errors={errors}
                    register={register}
                    registerContent={{
                      required: "Title is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    }}
                    name={"title"}
                    label={"Title"}
                    id={"title"}
                    type={"text"}
                    disabled={!editingTask}
                    defaultValue={task?.title}
                  />
                  <TextArea
                    errors={errors}
                    register={register}
                    registerContent={{
                      maxLength: {
                        value: 200,
                        message: "Name must be at most 100 characters",
                      },
                    }}
                    name={"description"}
                    label={`Description`}
                    limit={200}
                    id={"description"}
                    disabled={!editingTask}
                    defaultValue={task?.description}
                    watch={watch}
                  />
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex flex-col gap-2 grow'>
                        <p className='text-gray-600'>Start Date</p>
                        <Controller
                          control={control}
                          name='startDate'
                          defaultValue={task?.startDate}
                          rules={{
                            validate: validateDates,
                          }}
                          render={({ field }) => (
                            <>
                              <DatePicker
                                onChange={(date) => {
                                  field.onChange(date);
                                  validateDates(date);
                                }}
                                selected={field.value}
                                placeholderText='--/--/--'
                                customInput={<CustomDatePickerButton icon={<CalendarFold />} />}
                                enableTabLoop={false}
                              />
                            </>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2 grow'>
                        <p className='text-gray-600'>Due Date</p>
                        <Controller
                          control={control}
                          name='dueDate'
                          defaultValue={task?.endDate}
                          render={({ field }) => (
                            <>
                              <DatePicker
                                onChange={(date) => {
                                  field.onChange(date);
                                  validateDates(getValues("startDate"));
                                }}
                                selected={field.value}
                                placeholderText='--/--/--'
                                customInput={<CustomDatePickerButton icon={<CalendarCheck2 />} />}
                                enableTabLoop={false}
                              />
                            </>
                          )}
                        />
                      </div>
                    </div>
                    {errors["startDate"] && (
                      <span className='text-raspberry text-sm'>{errors["startDate"]?.message}</span>
                    )}
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
                      projectId={task?.project}
                      addUser={handleAddUser}
                      addedUsers={addedUsers}
                    />
                  </div>
                </>
              )}
            </div>
            {editingTask && (
              <Button style='submit' type='submit' disabled={!editingTask}>
                Save Changes
              </Button>
            )}
          </form>
          {(adminPermission || ownerPermission) && (
            <DeleteButton
              onClick={() => {
                setSubmitFormShown(true);
              }}
            >
              Delete Task
            </DeleteButton>
          )}
        </div>
        <Tooltip
          id='user-details-tooltip'
          place='bottom-start'
          style={{
            backgroundColor: "#001b2e",
            borderRadius: ".5rem",
          }}
        />
      </div>
    </ReactFocusLock>
  );
}
