import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Disclosure, Menu } from "@headlessui/react";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";
import { User } from "@lib/types/users";

let navigation = [
  { name: "Home", href: "/", current: false },
  {
    name: "Calendar",
    href: "/calendar",
    current: false,
  },
  {
    name: "Rules",
    href: "/rules",
    current: false,
  },
  {
    name: "Staff",
    href: "/staff",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function NavBar({ session }: { session: User }) {
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const nav = navigation.map((item) => {
      if (item.href === currentPath) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    navigation = nav;
    setMounted(true);
  }, [session]);

  const renderThemeSwitcher = () => {
    if (!mounted) return null;

    const currenTheme = theme === "system" ? systemTheme : theme;

    if (currenTheme === "dark") {
      return (
        <>
          <div
            key={"Darkmode"}
            className="darkmode ml-1"
            onClick={() => setTheme("light")}
          >
            <SunIcon className="w-6 h-6 text-gray-500 dark:text-white" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            key={"Darkmode"}
            className="darkmode ml-1"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon className="w-6 h-6 text-gray-500 dark:text-white" />
          </div>
        </>
      );
    }
  };

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow z-20">
      {({ open }) => (
        <>
          <div className="select-none max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <Image
                      height={8}
                      width={8}
                      className="block lg:hidden h-8 w-auto"
                      src="/Logo.svg"
                      alt="DaneSaber"
                    />
                    <Image
                      height={8}
                      width={8}
                      className="hidden lg:block h-8 w-auto"
                      src="/Logo.svg"
                      alt="DaneSaber"
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex">
                  {navigation.map((item) => (
                    <React.Fragment key={item.name}>
                      <Link
                        href={item.href}
                        key={item.name}
                        className={classNames(
                          "navItem",
                          router.route === item.href
                            ? "navHoverLight navHoverDark"
                            : "navigationLight navigationDark duration-400"
                        )}
                        aria-current={
                          router.route === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                {/* <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only" unselectable="on">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full h-[40px] pl-10 border text-black border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Search for tournament"
                      type="search"
                    />
                  </div>
                </div> */}

                <div className="hidden lg:ml-2 lg:flex lg:items-center">
                  {/* Darkmode Switch */}
                  <Menu as="div" className="flex">
                    {session.permissions >= 8 && (
                      <React.Fragment key={"AdminURL"}>
                        <Link
                          href={"/admin"}
                          className={classNames(
                            "navItem",
                            router.route === "/admin"
                              ? "navHoverLight navHoverDark"
                              : "navigationLight navigationDark duration-400"
                          )}
                          aria-current={
                            router.route === "/admin" ? "page" : undefined
                          }
                        >
                          Admin
                        </Link>
                      </React.Fragment>
                    )}
                    <div className="flex">
                      {renderThemeSwitcher()}
                      <div className="hidden lg:flex lg:space-x-2">
                        {!session ? (
                          <Link
                            href="/api/auth/"
                            className="ml-3 bg-gray-700 dark:bg-gray-500 rounded-md text-white flex p-[9px] gap-2 transition-all"
                          >
                            Login{" "}
                            <Image
                              src="/assets/icons/whiteDiscord.svg"
                              className="fill-white h-[24px] w-[auto]"
                              height={24}
                              width={24}
                              alt={""}
                            />
                          </Link>
                        ) : (
                          <ProfileMenu session={session} />
                        )}
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="navButtonLight navButtonDark">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu open state */}

          <Disclosure.Panel className="lg:hidden flex absolute w-[100%] bg-white dark:bg-gray-700 flex-col transition-all z-40">
            <div className="pt-2 pb-3 space-y-1 sticky">
              {navigation.map((item) => (
                <React.Fragment key={item.name}>
                  <Link
                    href={item.href}
                    key={item.name}
                    className={classNames(
                      router.route === item.href
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        : "navigationLight navigationDark dark:hover:bg-gray-800 dark:text-white duration-400 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                    aria-current={
                      router.route === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>

            <div className="pt-3 pb-3 border-t border-gray-200">
              {/* Darkmode Switch & Buttons for login/signup */}
              <div className="flex items-center ml-auto flex-shrink-0 px-4 justify-between">
                {renderThemeSwitcher()}
                <div className="flex justify-end space-x-2">
                  {!session ? (
                    <Link
                      href="/api/auth/"
                      className="ml-3 bg-gray-700 dark:bg-gray-800 rounded-md text-white flex p-[9px] gap-2"
                    >
                      Login{" "}
                      <Image
                        src="/assets/icons/whiteDiscord.svg"
                        className="fill-white h-[24px] w-[auto]"
                        height={24}
                        width={24}
                        alt={""}
                      />
                    </Link>
                  ) : (
                    <>
                      {session.permissions >= 8 && (
                        <React.Fragment key={"AdminURL"}>
                          <Link
                            href="/admin"
                            className="phoneButton phoneNavButtonLight phoneNavButtonDark"
                          >
                            Admin
                          </Link>
                        </React.Fragment>
                      )}
                      <Link
                        href="#"
                        className="phoneButton phoneNavButtonLight phoneNavButtonDark"
                      >
                        Profile
                      </Link>
                      <Link
                        href="#"
                        className="phoneButton phoneNavButtonLight phoneNavButtonDark"
                      >
                        Settings
                      </Link>
                      <Link
                        href="/api/auth/logout"
                        className="phoneButton phoneNavButtonLight phoneNavButtonDark"
                      >
                        Logout
                      </Link>
                      <ProfileMenu session={session} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
