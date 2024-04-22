import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { Badge } from "./ui/badge";


type Props = {
    title: string;
    query: {
        isFetching: boolean;
        error: unknown
    };
}

function StatusIcon({ isFetching, error }: { isFetching: boolean, error: unknown }) {
    if (error) {
        return <CircleAlert />
    }
    if (isFetching) {
        return <LoaderCircle className=" animate-spin" />
    }
    return <Check color="green" />
}


const DataStatus: React.FC<Props> = ({ title, query }) => {
    const { isFetching, error } = query;

    return (
        <Badge variant={
            error ? "destructive" :
                isFetching ? "secondary" :
                    "outline"
        } className=" flex overflow-auto space-x-4 px-2 py-2 font-medium text-sm  items-center ">
          <span className=" ml-2 font-bold">{title}</span>
            <StatusIcon isFetching={isFetching} error={error} />
        </Badge>
    )
}

export default DataStatus;