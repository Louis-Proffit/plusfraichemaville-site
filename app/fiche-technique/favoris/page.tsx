"use client";
import React, { useEffect, useState } from "react";
import BookmarkedFicheTechniqueByProject from "@/components/favoris/BookmarkedFicheTechnique";
import { useLocalStorage } from "usehooks-ts";
import { BOOKMARK_FT_KEY, ProjectBookmarks } from "@/helpers/bookmarkedFicheTechniqueHelper";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [bookmarkedFichesTechniques] = useLocalStorage<ProjectBookmarks[]>(BOOKMARK_FT_KEY, []);
  return (
    isClient && (
      <div>
        {bookmarkedFichesTechniques.length <= 0 ? (
          <div className={"text-xl font-bold"}>{"Vous n'avez pas encore sélectionné de fiches techniques"}</div>
        ) : (
          bookmarkedFichesTechniques.map((pb) => (
            <BookmarkedFicheTechniqueByProject
              key={pb.projectName}
              projectName={pb.projectName}
              ficheTechniqueSlugs={pb.ficheTechniqueIds}
            />
          ))
        )}
      </div>
    )
  );
}
