export const page = async ({ params }: { params: { serverId: string } }) => {
  return <div>serverId: {params.serverId}</div>;
};

export default page;
