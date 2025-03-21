import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { useParams } from "react-router-dom";
import ColorPicker from "./ColorPicker";
import handleAddStatus from "../utils/handleAddStatus";

export default function CreateStatusForm({ close }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const { projectId } = useParams();

  async function createStatus(data) {
    await handleAddStatus(data.name, data.description, data.color, projectId);
    reset();
    close();
  }
  return (
    <form onSubmit={handleSubmit(createStatus)} className=''>
      <div className='flex flex-col gap-8'>
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
        />
        <TextArea
          errors={errors}
          register={register}
          registerContent={{
            maxLength: {
              value: 200,
              message: "Description must be at most 30 characters",
            },
          }}
          name={"description"}
          label={`Description`}
          limit={200}
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
          <p>Create Status</p>
        </Button>
      </div>
    </form>
  );
}
