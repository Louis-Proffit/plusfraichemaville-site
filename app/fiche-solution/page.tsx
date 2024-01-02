import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";
import TypeSolutionFilter from "@/components/filters/TypeSolutionFilter";
import BaisseTemperatureFilter from "@/components/filters/BaisseTemperatureFilter";
import { getBaisseTemperatureFicheSolutionFromTemperature } from "@/helpers/baisseTemperatureFicheSolution";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import { getAllFichesSolutions } from "@/lib/strapi/queries/fichesSolutionsQueries";

export default async function FichesSolutions({
  searchParams,
}: {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
}) {
  const allFichesSolutions = await getAllFichesSolutions();

  const filteredFichesSolutions = allFichesSolutions
    .filter((fs) => !searchParams.espaceFilter || fs.attributes.types_espace?.includes(searchParams.espaceFilter))
    .filter(
      (fs) =>
        !searchParams.typeSolutionFilter ||
        (fs.attributes.type_solution &&
          searchParams.typeSolutionFilter?.split(",").includes(fs.attributes.type_solution)),
    )
    .filter(
      (fs) =>
        !searchParams.baisseTemperatureFilter ||
        searchParams.baisseTemperatureFilter
          .split(",")
          .includes(getBaisseTemperatureFicheSolutionFromTemperature(fs.attributes.baisse_temperature).code),
    );
  return (
    <div className="fr-container">
      <TypeEspaceFilter className="justify-center mb-8 mt-8" />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[13rem]">
          <TypeSolutionFilter className="mb-6" />
          <BaisseTemperatureFilter className="mb-6" />
        </div>
        <div className="grow list-none justify-center p-0">
          <ul className="flex flex-wrap justify-center gap-6">
            {filteredFichesSolutions.map((ficheSolution) => (
              <li key={ficheSolution.attributes.vuid} className="flex">
                <FicheSolutionCardWithUserInfo projectName={""} ficheSolution={ficheSolution.attributes} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
