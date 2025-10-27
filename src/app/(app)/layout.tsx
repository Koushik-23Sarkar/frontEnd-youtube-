"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SearchInputBox from "../../app/components/searchInputBox";
import Button from "../../app/components/button";
import HeaderComponent from "../components/header";
import LeftSideBar from "../components/leftSideBar";
import { useEffect } from "react";
import { checkAuth } from "../authSlice";
import { useAppDispatch } from "../lib/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLeftSideSection = ()=>{
    console.log("handleLeftSideSection")
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <HeaderComponent />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <LeftSideBar 
        />
        {children}
      </div>
    </div>
  );
}
