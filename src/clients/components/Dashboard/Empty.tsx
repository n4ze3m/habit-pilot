import { IconMoodSad } from "@tabler/icons";

export const Empty = () => {
  return (
    <div className="text-center">
      <IconMoodSad
        className="mx-auto h-12 w-12 text-gray-400"
        aria-hidden="true"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
       Oh no!
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        You have no habits yet. Add one to get started.
      </p>
    </div>
  );
};
