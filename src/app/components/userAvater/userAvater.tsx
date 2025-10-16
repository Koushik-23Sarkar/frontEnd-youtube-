"use client";

import { useRouter } from "next/navigation";

export default function UserAvter({userChannel}:{userChannel:string}) {
    const router = useRouter();
  const goToOwnChannel = () => {
    router.push(`/channel/${userChannel}`)
  };

  return (
    <div
      onClick={()=>goToOwnChannel()}
      className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0"
    >
      <button className="flex w-full gap-4 text-left sm:items-center">
        <img
          src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="React-Patterns"
          className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
        />
        <div className="w-full pt-2 sm:hidden">
          <h6 className="font-semibold">React Patterns</h6>
          <p className="text-sm text-gray-300">@reactpatterns</p>
        </div>
      </button>
    </div>
  );
}
