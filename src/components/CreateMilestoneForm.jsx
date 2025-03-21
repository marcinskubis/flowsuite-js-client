import { useForm } from "react-hook-form";
import TextArea from "./TextArea";
import Input from "./Input";
import Button from "./Button";
import ColorPicker from "./ColorPicker";

export default function CreateMilestoneForm({ onSubmit, onClose }) {
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm();

  function handleFormSubmit(data) {
    onSubmit(data.title, data.description, data.color);
    reset();
    onClose();
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
          maxLength: {
            value: 100,
            message: "Name must be at most 100 characters",
          },
        }}
        name={"description"}
        label={`Description`}
        limit={100}
        id={"description"}
        watch={watch}
      />

      <ColorPicker
        errors={errors}
        register={register}
        name={"color"}
        label={"Color"}
        id={"color"}
        type={"color"}
      />
      <Button style='submit' type='submit'>
        Create Milestone
      </Button>
    </form>
  );
}
