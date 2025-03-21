import { LoaderIcon } from "lucide-react";

export default function Loader({ ...rest }) {
    return (
        <LoaderIcon className="animate-spin" {...rest} />
    )
}