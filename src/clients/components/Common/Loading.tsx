import { Loader } from "@mantine/core";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-slate-50 to-slate-100">
      <Loader size="lg" color="teal" />
    </div>
  );
};
