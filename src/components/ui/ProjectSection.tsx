import { Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

import { TProjectSectionProps } from "@/types/dashboard";

export const ProjectSection = (organizationProjects: TProjectSectionProps) => {
  const projects = organizationProjects.organizationProjects;
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <Card className="area-project shadow-none rounded-[6px] border-[1px] bg-[#FFFFFF] p-5">
      {!projects.length ? (
        <div>No projects found</div>
      ) : (
        <>
          <CardHeader className="p-0 mb-5">
            <div className="flex space-x-3 items-center justify-between">
              <CardTitle className="text-base font-normal">
                Projects - {projects.length}
              </CardTitle>
              {projects.length > 3 && (
                <Button
                  variant="secondary"
                  className="w-[80px] bg-[#4D4D4D] text-[#ffffff]"
                  onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less" : "View All"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-[20px] min-h-[50px]">
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-[4px] flex items-center justify-between border-[1px] border-[#E2E8F0] py-[14px] pl-[14px] pr-[23px]">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm font-medium">{project.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigate(`/projects/${project.id}`)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
