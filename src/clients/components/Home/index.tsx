import { IconChevronRight } from "@tabler/icons";
import React from "react";
import { HomeFeature } from "./Feature";
import { HomeFooter } from "./Footer";
import { HomeHero } from "./Hero";

export const HomeBody = () => (
  <div className="bg-white">
    <HomeHero />
    <HomeFeature />
    <HomeFooter />
  </div>
);
