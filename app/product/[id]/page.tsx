export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  return params.id;
}
