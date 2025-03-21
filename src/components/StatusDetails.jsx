import ReactFocusLock from "react-focus-lock";
import CloseButton from "./CloseButton";
import { Tooltip } from "react-tooltip";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import handleEditStatus from "../utils/handleEditStatus";
import usePermissionStore from "../store/usePermissionStore";
import DeleteButton from "./DeleteButton";
import ConfirmationForm from "./ConfirmationForm";
import handleDeleteStatus from "../utils/handleDeleteStatus";

export default function StatusDetails({ status, closeSidebar, project }) {
  const [editingStatus, setEditingStatus] = React.useState(false);
  const [submitFormShown, setSubmitFormShown] = React.useState(false);

  const { adminPermission, ownerPermission } = usePermissionStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit" });
  async function handleFormSubmit({ name, description, color }) {
    await handleEditStatus(name, description, color, project._id, status._id);
    setEditingStatus(false);
  }
  return (
    <ReactFocusLock>
      <div className='flex flex-col gap-4'>
        {submitFormShown && (
          <ConfirmationForm
            label={"Do you want to delete this task?"}
            onCancel={() => setSubmitFormShown(false)}
            onSubmition={async () => {
              await handleDeleteStatus(status?.project, status?._id);
              closeSidebar();
            }}
          />
        )}
        <div className='self-end'>
          <CloseButton close={closeSidebar} />
        </div>
        <div className='flex flex-col gap-8 items-start'>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-6 w-full'>
            <div className='flex items-center justify-between'>
              <p className='text-oxford-blue text-2xl font-black leading-[1]'>Status Information</p>
              {adminPermission && (
                <button
                  className='relative flex items-center gap-4 hover:-translate-y-[.5px]'
                  type='button'
                  onClick={() => setEditingStatus(!editingStatus)}
                >
                  <Edit color='#001b2e' />
                </button>
              )}
            </div>
            <div
              className='flex flex-row gap-8'
              style={{ flexDirection: editingStatus ? "column" : "column" }}
            >
              {!editingStatus ? (
                <div className='flex flex-col gap-4'>
                  <p className='text-xl text-oxford-blue font-bold'>Name</p>
                  <p>{status?.name}</p>
                </div>
              ) : (
                <Input
                  errors={errors}
                  register={register}
                  registerContent={{
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                  name={"name"}
                  label={"Name"}
                  id={"name"}
                  type={"text"}
                  disabled={!editingStatus}
                  defaultValue={status?.name}
                />
              )}
              {!editingStatus ? (
                <div className='flex flex-col gap-4'>
                  <p className='text-xl text-oxford-blue font-bold'>Description</p>
                  <p>{status?.description ? status?.description : "No description yet :("}</p>
                </div>
              ) : (
                <TextArea
                  errors={errors}
                  register={register}
                  registerContent={{
                    maxLength: {
                      value: 30,
                      message: "Description must be at most 30 characters",
                    },
                  }}
                  name={"description"}
                  label={`Description`}
                  limit={30}
                  id={"description"}
                  disabled={!editingStatus}
                  defaultValue={status?.description}
                  watch={watch}
                />
              )}
              {editingStatus && (
                <ColorPicker
                  errors={errors}
                  register={register}
                  name={"color"}
                  label={"Color"}
                  id={"color"}
                  type={"color"}
                  defaultValue={status.color}
                />
              )}
            </div>
            {editingStatus && (
              <Button style='submit' type='submit' disabled={!editingStatus}>
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
              Delete Status
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
