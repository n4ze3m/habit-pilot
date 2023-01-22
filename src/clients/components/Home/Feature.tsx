import { IconBell, IconBrandOpenSource, IconCalendar, IconChevronRight, IconServer } from "@tabler/icons";

const features = [
  {
    name: "Open Source",
    description:
      "All of our code is open source. You can view the code on GitHub and contribute to the project.",
    icon: IconBrandOpenSource,
  },
  {
    name: "Reminders",
    description:
      "We will send you a reminder to complete your habit if you want us to.",
    icon: IconBell,
  },
  {
    name: "Commit Calendar",
    description: "Github like commit calendar to track your progress.",
    icon: IconCalendar,
  },
  {
    name: "Self Hosted",
    description: "You can host your own instance of Habit Pilot.",
    icon: IconServer,
  }
];

export function HomeFeature() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-green-600">
            Habit Pilot
          </h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            A better way to track your habits
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Habit Pilot is a habit tracker that helps you track your habits.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-green-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
