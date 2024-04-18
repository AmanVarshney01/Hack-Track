import DeleteProject from "../DeleteProject";

export default function DeletePage({ params }: { params: { id: number } }) {
  return <DeleteProject id={params.id} />;
}
