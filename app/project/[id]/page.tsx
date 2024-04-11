import { createClient } from "@/utils/supabase/server";

export default async function ProjectPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  const project = await supabase
    .from("projects")
    .select(
      `
  name,
  users (
    name,
    email
  ),
  project_details (
    description,
    start_date,
    end_date
  ),
  project_members (
    member_email,
    role
  )
  `,
    )
    .eq("id", params.id)
    .single();

  //   if (!user) {
  //     return redirect("/login");
  //   }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium">{project.data?.name}</h1>
      <p>{project.data?.project_details[0].description}</p>
      <p>{project.data?.project_details[0].start_date}</p>
      <p>{project.data?.project_details[0].end_date}</p>
      <h2 className="text-lg font-medium">Members</h2>
      <ul>
        {project.data?.project_members.map((member) => (
          <li key={member.member_email}>
            {member.member_email} - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
