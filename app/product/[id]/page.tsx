import ToastNotification from "@/components/ToastNotification";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      {params.id}
      <ToastNotification />
    </>
  );
}
