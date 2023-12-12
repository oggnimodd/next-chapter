import React from "react";
import { Card } from "@mui/material";
import { Twitter, LinkedIn } from "@mui/icons-material";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  twitter: string;
  linkedin: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
  twitter,
  linkedin,
}) => {
  return (
    <Card className="md:max-w-md py-4 mx-6 sm:mx-0">
      <div className="flex flex-col items-center">
        <img className="mb-3" src={image} alt={name} width={150} height={150} />
        <p className="text-xl font-bold mb-1">{name}</p>
        <p className="mb-3">{role}</p>
        <div className="flex space-x-4">
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="color-primary-500 text-xl" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedIn className="color-primary-500 text-xl" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default TeamMemberCard;
