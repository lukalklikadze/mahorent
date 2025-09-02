import type { ReactElement, SVGProps } from "react";

interface ContactProps {
  logo: ReactElement<SVGProps<SVGSVGElement>>;
  url: string;
  user: string;
}

const SocialsContact = ({ logo, url, user }: ContactProps) => {
  return (
    <button
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      className={`cursor-pointer flex items-center gap-x-2 px-4 py-2 rounded bg-blue-700 text-white hover:opacity-90`}
    >
      {logo}
      <span>{user}</span>
    </button>
  );
};

export default SocialsContact;
