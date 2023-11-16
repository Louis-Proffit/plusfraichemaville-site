import { EtapeCalendrierRetourExperience } from "@/lib/directus/directusCustomModels";
import Accordion from "@codegouvfr/react-dsfr/Accordion";

export default async function CalendrierRetourExperienceAccordion({
  etapes,
  className,
}: {
  etapes: EtapeCalendrierRetourExperience[];
  className?: string;
}) {
  return etapes.map((etape) => (
    <Accordion
      className={`${className}`}
      label={
        <div className="flex">
          <div className="flex-none w-32">{etape.date}</div>
          <div className="flex-1">{etape.titre}</div>
        </div>
      }
    >
      <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: etape.description }} />
    </Accordion>
  ));
}
