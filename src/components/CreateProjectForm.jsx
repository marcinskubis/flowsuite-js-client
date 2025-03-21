import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import useUserStore from "../store/useUserStore";
import TextArea from "./TextArea";
import handleAddProject from "../utils/handleAddProject";
import ReactFocusLock from "react-focus-lock";

export default function CreateProjectForm({ close }) {
  const { userId } = useUserStore();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  async function createProject(data) {
    await handleAddProject(data.title, data.description, userId);
    reset();
    close();
  }
  return (
    <ReactFocusLock>
      <form
        onSubmit={handleSubmit(createProject)}
        className='bg-white rounded-md flex flex-col gap-10'
      >
        <div className='flex flex-col gap-8'>
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
          />
          <TextArea
            errors={errors}
            register={register}
            registerContent={{
              maxLength: {
                value: 100,
                message: "Name must be at most 30 characters",
              },
            }}
            name={"description"}
            label={`Description`}
            limit={100}
            id={"description"}
            watch={watch}
          />
          <Button style='submit' type='submit'>
            <p>Create Project</p>
          </Button>
        </div>
      </form>
    </ReactFocusLock>
  );
}
