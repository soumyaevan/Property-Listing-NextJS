"use client";
import logoLight from "@/assets/images/logo.png";
import logoDark from "@/assets/images/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const logo = resolvedTheme === "light" ? logoLight : logoDark;
  return (
    // <!-- Footer -->
    <footer className="bg-gray-200 dark:bg-gray-600 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <Link href="/">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-200 mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} PropertyPulse. All rights
            reserved.
          </p>
        </div>
      </div>
      <div className="fixed z-50 bottom-10 right-10">
        <ModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
