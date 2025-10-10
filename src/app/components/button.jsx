export default function Button({ btnColor,btnText, textColor}) {
  return (
    <button className={`mr-1 w-full bg-[#${btnColor}] px-3 py-2 text-center font-bold text-${textColor} shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}>
      {btnText}
    </button>
  );
}
