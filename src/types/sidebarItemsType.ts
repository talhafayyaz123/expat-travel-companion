import { StaticImageData } from "next/image";


export interface subItems{
    label: string,
    link: string,
}

export type adminSidebarRoutesType = {
  label: string;
  link: string;
  icon: string | StaticImageData;
  subItems?: subItems[];
};