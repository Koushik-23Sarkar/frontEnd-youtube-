"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { searchVideo } from "@/app/searchSlice";
import {changeIsSearchBoxSelected,changeSearchContant} from "@/app/searchSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearchInputBox() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const searchRef = useRef();
  const {isSearchBoxSelected,videos,loading:searchLoading ,error,searchContent} = useAppSelector(state =>  state.search)
  const dispatch = useAppDispatch();
  const { videoId } = useParams(); 
  const router = useRouter()

  const handleEnter = async (e) => {
    if (e.key == "Enter") {
      // when we enter in the search box, we will move to the /search/[searchContent]
      const params = {
        page,
        limit,
        query: searchContent?.trim(),
        sortBy,
        sortType
      }
      dispatch(changeIsSearchBoxSelected(false))
      dispatch(searchVideo(params))
      router.push(`/search/${searchContent}`);
    }
  };

  // useEffect(()=>{
  //   const handleClickOutside = (event)=>{
  //     if(searchRef.current && !searchRef.current.contains(event.target)){
  //       console.log("You click outside the serach box")
  //       console.log(`params: ${videoId}`);
  //       if(videos?.length == 0 || searchContent?.lenght == 0 || videoId?.length>0){
  //         dispatch(changeIsSearchBoxSelected(false))
  //       }
  //       else {
  //         dispatch(changeIsSearchBoxSelected(true))
  //       }
  //     }
  //   }

  //   document.addEventListener("mousedown",handleClickOutside);
  //   return ()=>{
  //     document.removeEventListener("mousedown",handleClickOutside);
  //   }
  // },[searchContent])

  return (
    <div>
      <input
        className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
        placeholder="Search"
        autoComplete="off"
        value={searchContent}
        onChange={(e) => {
          setQuery(e.target.value)
          dispatch(changeSearchContant(e.target.value))
        }}
        onKeyPress={handleEnter}
        ref={searchRef}
        onFocus={()=>{
          console.log("Now you click the search!")
          dispatch(changeIsSearchBoxSelected(true))
        }}
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
