import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";

let url: string;
let jsonData: any;
let load: boolean = true;
export default function Placeholder() {
  // load = false;
  useEffect(() => {
    url = window.location.href;

    !load
      ? setTimeout(() => {
          const Div = document.querySelector(".PLACEHOLDERDiv");
          Div!.classList.remove("opacity-0");
          Div!.classList.add("translate-y-[10px]");
        }, 150)
      : null;
  }, []);

  return (
    <>
      <Header
        title={`PLACEHOLDER`}
        link={url}
        contents={`PLACEHOLDER | The PLACEHOLDER on ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="PLACEHOLDER PAGE" />

        {load ? ( //Insert Tailwind spinner
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] flex justify-center align-middle mt-[15%]"></div>
            </div>
          </>
        ) : (
          <>
            <div className="PLACEHOLDERDiv opacity-0 transition-all"></div>
          </>
        )}
      </div>
    </>
  );
}
