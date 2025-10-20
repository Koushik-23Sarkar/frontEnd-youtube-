import Image from "next/image";

export default function ChannelPageVideoComponent() {
  return (
    <div className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="JavaScript Fundamentals: Variables and Data Types"
            className="h-full w-full"
          />
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
          20:45
        </span>
      </div>
      <h6 className="mb-1 font-semibold">
        JavaScript Fundamentals: Variables and Data Types
      </h6>
      <p className="flex text-sm text-gray-200">10.3k Views · 44 minutes ago</p>
    </div>
  );
}
