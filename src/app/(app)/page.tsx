import ErrorBox from "@/components/layout/error";
import call from "@/lib/call";

export default async function Page() {
    const response = await call("GET", "/feed");

    return <ErrorBox data={response}></ErrorBox>;
}
