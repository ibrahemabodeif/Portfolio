import { Hero } from "@/components/sections/hero";
import { TechStrip } from "@/components/sections/tech-strip";
import { WhatIDo } from "@/components/sections/what-i-do";
import { SelectedWork } from "@/components/sections/selected-work";
import { WhoIAm } from "@/components/sections/who-i-am";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <WhatIDo />
      <WhoIAm />
      <SelectedWork />
      <Contact />
    </>
  );
}
