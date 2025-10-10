export default function SearchInputBox() {
  return (
    <div>
      <input
        className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
        placeholder="Search"
      />
      <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          ></path>
        </svg>
      </span>
    </div>
  );
}
