import React from "react";
import { Typography } from "@material-tailwind/react";

const Footer = () =>{
	return (
            <footer className="footer flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t bg-white border-blue-gray-50 pl-10 pr-10 py-6 text-center md:justify-between">
              <Typography color="blue-gray" className="font-normal">
                &copy; BiteByByte 2024
              </Typography>
              <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-emerald-400 focus:text-emerald-400"
                  >
                    About Us
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-emerald-400 focus:text-emerald-400"
                  >
                    License
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-emerald-400 focus:text-emerald-400"
                  >
                    FAQs
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-emerald-400 focus:text-emerald-400"
                  >
                    Contact Us
                  </Typography>
                </li>
              </ul>
            </footer>
    )
}

export default Footer;