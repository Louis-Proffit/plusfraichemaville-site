import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import { getDelaTravauxFromCode } from "@/helpers/delaiTravaux";

export default async function FicheSolutionFullCard({ ficheSolution }: { ficheSolution: FicheSolution }) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  const delaiTravaux = getDelaTravauxFromCode(ficheSolution.delai_travaux);
  return (
    <Link
      className="flex w-[17.5rem] flex-col
      aide-decision-first-step-card mr-4 ml-4 md:mr-0 md:ml-0"
      href={`/fiche-solution/${ficheSolution.slug}`}
    >
      <div className="flex w-full h-52">
        <Image
          width={450}
          height={300}
          src={getDirectusImageUrl(ficheSolution.image_principale, DIRECTUS_IMAGE_KEY_SIZE.ficheTechniqueCard)}
          alt={ficheSolution.titre}
          className={"w-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="px-6 pt-6 pb-4 flex flex-col grow">
        {typeSolution && (
          <>
            <div className="flex flex-row text-xs mb-2 text-dsfr-text-mention-grey">
              {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          </>
        )}
        <div className={"text-xl font-bold text-dsfr-text-little-grey text- xl"}>{ficheSolution.titre}</div>
        <div className={"text-sm text-dsfr-text-little-grey mt-4"}>{ficheSolution.description_courte}</div>
        <div className={"mt-auto"}>
          <div>
            <div className="flex flex-row justify-between w-full mt-6 mb-2">
              <div className="mr-4 mt-auto text-dsfr-text-mention-grey text-xs">
                Baisse maximale de la température de l{"'"}air
              </div>
              <div className="float-right text-right">
                <div className="fr-text--bold text-4xl text-dsfr-text-label-blue-france">
                  {`-${ficheSolution.baisse_temperature}°C`}
                </div>
              </div>
            </div>
            <hr className="pb-2" />
            {delaiTravaux && (
              <>
                <div className="text-xs text-dsfr-text-mention-grey">Délai des travaux</div>
                <div className="inline-block w-full">
                  <div className="float-left">
                    {delaiTravaux.icons()}
                  </div>
                  <div className="float-right text-xs text-dsfr-text-mention-grey mt-1">{delaiTravaux.label}</div>
                </div>
                <hr className="pb-2" />
              </>
            )}
            <div className="fr-text--bold text-xs">Coût</div>
            <div className="inline-block w-full">
              <div className="float-left">
                <span className={"fr-icon-money-euro-circle-fill fr-icon--sm text-dsfr-text-color-green"}></span>
                <span className={"fr-icon-money-euro-circle-fill fr-icon--sm text-dsfr-text-color-green"}></span>
                <span
                  className={"fr-icon-money-euro-circle-fill fr-icon--sm text-dsfr-text-color-grey opacity-50"}
                ></span>
              </div>
              <div className="float-right text-xs mt-1">de 3000 € à 10 000 €</div>
            </div>
            <hr className="pb-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
