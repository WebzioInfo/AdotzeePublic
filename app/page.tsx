"use client";

import { LuminousHero } from "@/components/sections/LuminousHero";
import { LuminousFeatures } from "@/components/sections/LuminousFeatures";
import { LuminousCourses } from "@/components/sections/LuminousCourses";
import { LuminousColleges } from "@/components/sections/LuminousColleges";
import { LuminousProtocol } from "@/components/sections/LuminousProtocol";
import { LuminousCTA, LuminousFooter } from "@/components/sections/LuminousLowerSections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#BAE6FD]/30 selection:text-[#0A1550]">
      <LuminousHero />
      <LuminousFeatures />
      <LuminousCourses />
      <LuminousColleges />
      <LuminousProtocol />
      <LuminousCTA />
      <LuminousFooter />
    </div>
  );
}
