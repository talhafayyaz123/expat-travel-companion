import { howWorks } from "@/types/howWorks";
import Plan from '@/assets/home/howitworks/plan.svg';
import Explore from '@/assets/home/howitworks/explore.svg';

import ConnectBuild from '@/assets/home/howitworks/connect.svg';

import Secqure from '@/assets/home/howitworks/secqure.svg';


 



const howItWorksData: howWorks[] = [
    {
        icon: Plan, // Use the imported image variable
        title: "Plan Your Trip",
        description:
        "Start by setting your travel dates, destinations, and preferences. This helps you tailor your search for housemates who align with your journey.",   
       },
       {
        icon: Explore, // Use the imported image variable
        title: "Explore Matching Profiles",
        description:
        "Browse through profiles of like-minded people who are traveling to similar locations. You can filter results based on your travel dates, needs, and values.",
    },
       {
        icon: ConnectBuild, // Use the imported image variable
        title: "Connect and Build Relationships",
        description:
        "Send messages, ask questions, and get to know potential housemates before committing. Building rapport ensures a comfortable and trusted connection for your shared journey.",
    },
       {
        icon: Secqure, // Use the imported image variable
        title: "Secure Your Plans & Enjoy the Journey",
        description:
        "Once you’ve found the right match, finalize your arrangements with confidence. With a trusted companion, you can travel with peace of mind and enjoy every moment.",
    },
     
 
];

export { howItWorksData };
