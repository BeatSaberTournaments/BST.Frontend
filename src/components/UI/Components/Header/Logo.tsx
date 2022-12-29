import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="select-none flex items-center drop-shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:cursor-pointer">
        <Image
          className="dark:fill-white "
          src="Logo.svg"
          alt="Vercel Logo"
          width={32}
          height={32}
        />
        <h1 className="text-2xl text-white font-bold ml-2 LogoText">BST</h1>
      </div>
    </Link>
  );
};

export default Logo;
