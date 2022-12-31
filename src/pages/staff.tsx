import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import StaffPanel from "@comp/Staff/StaffPanel";
import PageHeader from "@comp/UI/General/PageHeader";

import type { StaffTeam } from "@lib/types/staffTeam";

let url: string;
let jsonData: any;
let load: boolean = true;
export default function Staff() {
  const [Staff, setData] = useState<StaffTeam[]>([]);

  useEffect(() => {
    fetch(`/assets/staff/list.json`)
      .then((response) => response.json())
      .then((json) => {
        jsonData = json;
        setData(jsonData.Members);
        load = false;
      });
    url = window.location.href;
  }, []);

  {
    load
      ? ""
      : setTimeout(() => {
          const staffDiv = document.querySelector(".staffDiv");
          staffDiv!.classList.remove("opacity-0");
          staffDiv!.classList.add("translate-y-[10px]");
        }, 50);
  }
  return (
    <>
      <Header
        title={`Staffteam`}
        link={url}
        contents={`Staff | The Staffteam on ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Staff" />

        {load ? ( //Insert Tailwind spinner
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] flex justify-center align-middle mt-[15%]"></div>
            </div>
          </>
        ) : (
          <>
            <div className="staffDiv opacity-0 transition-all">
              {Staff.map((item, index) => (
                <React.Fragment key={index}>
                  <StaffPanel
                    key={index + 1}
                    title="Developers"
                    staffMembers={item.Developers}
                  />
                  <StaffPanel
                    key={index + 2}
                    title="Admins"
                    staffMembers={item.Admins}
                  />
                  <StaffPanel
                    key={index + 3}
                    title="Tournament Moderators"
                    staffMembers={item.TournamentModerators}
                  />
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
