import React from "react";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import { GetValues } from "@/lib/strapi/types/types";

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  projectName,
  extraUrlParams,
  className,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution} extraUrlParams={extraUrlParams} />
      <ButtonSaveFicheSolution
        ficheSolution={ficheSolution}
        label={false}
        projectName={projectName}
        className={"flex justify-center items-center absolute top-2 right-6"}
      />
    </div>
  );
}
