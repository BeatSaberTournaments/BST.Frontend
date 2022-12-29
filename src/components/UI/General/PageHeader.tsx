import { useEffect } from "react";
export default function PageHeader({ title }: { title: string }) {
  //Remove the opacity-0 class from the bannerDiv and textTag
  useEffect(() => {
    setTimeout(() => {
      const bannerDiv = document.querySelector(".bannerDiv");
      const textTag = document.querySelector(".textTag");
      bannerDiv!.classList.remove("opacity-0");
      textTag!.classList.remove("opacity-0");
      textTag!.classList.add("translate-x-[5px]");
    }, 0);
  }, []);

  return (
    <span className="bannerDiv rounded-md opacity-0 bg-gradient-to-r from-gray-600 text-white h-[70px] pl-6 mb-5 flex justify-start items-center transition-all drop-shadow-[-2px_0_1px_rgba(0,0,0,0.20)]">
      <p className="textTag select-none font-bold ease-in-out transition-all hover:cursor-default">
        {title}
      </p>
    </span>
  );
}
