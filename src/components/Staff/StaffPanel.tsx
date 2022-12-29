import DividerCenter from "@comp/UI/General/DividerCenter";
import type { StaffMembers } from "@lib/types/StaffTeam";
import Icon from "@comp/Staff/Icon";
import React from "react";
import Image from "next/image";

export let staffTeam: StaffMembers[];

export default function StaffPanel({
  title,
  staffMembers,
}: {
  title: string;
  staffMembers: any;
}) {
  return (
    <>
      <DividerCenter text={title} />
      <div className="mt-5">
        <div className="staffPanel">
          {staffMembers.map(
            (
              item: {
                ScoreSaberID: any;
                Name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                Roles: string[];
                ScoreSaber: string;
                Discord: string | URL | undefined;
                Twitter: string | URL | undefined;
                Twitch: string | URL | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <React.Fragment key={index}>
                <div
                  key={index}
                  className="staffCard transition-[0.2s ease-in-out] dark:highlight-white/5 transition-[drop-shadow 0.2 ease-linear] hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.30)]"
                >
                  <Image
                    width={124}
                    height={124}
                    unoptimized={true}
                    alt="PFP"
                    placeholder="empty"
                    className="staffImage select-none"
                    src={`https://cdn.scoresaber.com/avatars/${item.ScoreSaberID}.jpg`}
                  />
                  <div className="flex flex-col -ml-[60px] pt-3 min-w-[220px] items-start">
                    <span className="text-black-800 text-[22px] font-semibold dark:text-slate-200 z-10 hover:cursor-default">
                      {item.Name}
                    </span>
                    <span className="text-black opacity-[60%] text-sm font-medium dark:text-white dark:opacity-[80%] italic z-10 hover:cursor-default">
                      {item.Roles.map(
                        (role: string, index: React.Key | null | undefined) => (
                          <React.Fragment key={index}>
                            {role}
                            {index! < item.Roles.length - 1 ? ", " : ""}
                          </React.Fragment>
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex content-center -ml-[140px] gap-2 w-[140px] max-w-[140px]">
                    <Icon
                      path="scoresaber.svg"
                      open={`https://scoresaber.com/u/${item.ScoreSaberID}`}
                      h={24}
                      w={24}
                    />
                    {item.Discord ? (
                      <Icon
                        path="discord.svg"
                        open={`https://discordapp.com/users/${item.Discord}`}
                        h={24}
                        w={24}
                      />
                    ) : (
                      <></>
                    )}{" "}
                    {item.Twitter ? (
                      <Icon
                        path="twitter.svg"
                        open={`https://twitter.com/${item.Twitter}`}
                        h={24}
                        w={24}
                      />
                    ) : (
                      <></>
                    )}{" "}
                    {item.Twitch ? (
                      <Icon
                        path="twitch.svg"
                        open={`https://www.twitch.tv/${item.Twitch}`}
                        h={24}
                        w={22}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </>
  );
}
