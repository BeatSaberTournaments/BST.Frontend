import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";

let url: string;
let load: boolean = true;
export default function Home({ session }: { session: boolean | String }) {
  load = false;
  useEffect(() => {
    url = window.location.href;

    !load
      ? setTimeout(() => {
          const Div = document.querySelector(".frontpageDiv ");
          Div!.classList.remove("opacity-0");
          Div!.classList.add("translate-y-[10px]");
        }, 150)
      : null;
  }, []);
  return (
    <>
      <Header
        title={`Frontpage`}
        link={url}
        contents={`Frontpage | The Frontpage of ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Index" />

        {load ? ( //Insert Tailwind spinner
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] flex justify-center align-middle mt-[15%]"></div>
            </div>
          </>
        ) : (
          <>
            <div className="frontpageDiv opacity-0 transition-all">
              <main className="flex flex-1 mt-[4rem] flex-col items-center text-center">
                <h1 className="text-6xl font-bold">
                  Welcome to{" "}
                  <a className="text-blue-600" href="https://nextjs.org">
                    Next.js!
                  </a>
                </h1>

                <p className="mt-3 text-2xl">
                  Get started by editing{" "}
                  <code className="rounded-md bg-neutral-200 dark:bg-[#07090c7d] dark:text-white p-3 font-mono text-lg">
                    pages/index.tsx
                  </code>
                </p>

                <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                    <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
                    <p className="mt-4 text-xl">
                      Find in-depth information about Next.js features and its
                      API.
                    </p>
                  </div>

                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                    <h3 className="text-2xl font-bold">Learn &rarr;</h3>
                    <p className="mt-4 text-xl">
                      Learn about Next.js in an interactive course with quizzes!
                    </p>
                  </div>

                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                    <h3 className="text-2xl font-bold">Examples &rarr;</h3>
                    <p className="mt-4 text-xl">
                      Discover and deploy boilerplate example Next.js projects.
                    </p>
                  </div>

                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                    <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
                    <p className="mt-4 text-xl">
                      Instantly deploy your Next.js site to a public URL with
                      Vercel.
                    </p>
                  </div>
                </div>
              </main>
            </div>
          </>
        )}
      </div>
    </>
  );
}
