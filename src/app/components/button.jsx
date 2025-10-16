"use Client"

import { useRouter } from "next/navigation";

export default function Button({ btnColor,btnText, textColor}) {
  const router = useRouter();
  const handleClick = (btnText)=>{
    if(btnText=="Log in"){
      router.push("/login");
    }
    if(btnText=="Sign up"){
      router.push("/register")
    }
  }

  return (
    <button onClick={()=>handleClick(btnText)} className={`mr-1 w-full bg-[#${btnColor}] px-3 py-2 text-center font-bold text-${textColor} shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}>
      {btnText}
    </button>
  );
}
