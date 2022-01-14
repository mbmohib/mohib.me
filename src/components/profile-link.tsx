interface ProfileLinkProps {
  profile: {
    icon: React.ElementType;
    link: string;
    label: string;
  };
}

export default function ProfileLink({
  profile: { icon: Icon, link, label },
}: ProfileLinkProps) {
  return (
    <a href={link} className="flex items-center mb-2 text-primary-content">
      <Icon className="mr-1 stroke-primary-content fill-base-100" />
      {label}
    </a>
  );
}
