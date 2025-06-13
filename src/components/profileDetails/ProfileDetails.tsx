"use client";

import { ProfDetailsDest } from "./ProfDetialsDest";
import { ProfileDetailsView } from "./ProfileDetailsView";
import { ProfLifeStyleView } from "./ProfLifeStyleView";
import { ProfMyTopView } from "./ProfMyTopView";
import { ProfTalkingPointsView } from "./ProfTalkingPointsView";
import * as Tabs from "@radix-ui/react-tabs";

export default function ProfileDetails() {
  return (
    <div className="container mx-auto mt-[130px] md:mt-[180px]">
      <ProfileDetailsView />
      <Tabs.Root className="w-full mt-16" defaultValue="destination">
        <Tabs.List className="flex justify-around border-b mb-10">
          <Tabs.Trigger
            className="text-[#1D2939] text-2xl lg:text-[32px] font-semibold p-2 px-4 border-b-2 data-[state=active]:border-blue-500"
            value="destination"
            defaultChecked
          >
            My Destinations
          </Tabs.Trigger>
          <Tabs.Trigger
            className="text-[#1D2939] text-2xl lg:text-[32px] font-semibold p-2 px-4 border-b-2 data-[state=active]:border-blue-500"
            value="lifestyle"
          >
            Lifestyle
          </Tabs.Trigger>
          <Tabs.Trigger
            className="text-[#1D2939] text-2xl lg:text-[32px] font-semibold p-2 px-4 border-b-2 data-[state=active]:border-blue-500"
            value="top3"
          >
            My Top 3's
          </Tabs.Trigger>
          <Tabs.Trigger
            className="text-[#1D2939] text-2xl lg:text-[32px] font-semibold p-2 px-4 border-b-2 data-[state=active]:border-blue-500"
            value="talkingpoints"
          >
            Talking Points
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="p-4" value="destination">
          <ProfDetailsDest />
        </Tabs.Content>
        <Tabs.Content className="p-4" value="top3">
          <ProfMyTopView />
        </Tabs.Content>
        <Tabs.Content className="p-4" value="lifestyle">
          <ProfLifeStyleView />
        </Tabs.Content>
        <Tabs.Content className="p-4" value="talkingpoints">
          <ProfTalkingPointsView />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
