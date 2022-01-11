interface HeaderProps {
  siteTitle: string;
}
export default function Header({ siteTitle }: HeaderProps) {
  return (
    <div className="container p-2">
      <div className="flex justify-between">
        <div className="flex">
          <div className="mr-8">
            <p>mohib</p>
          </div>
          <nav>
            <a href="" className="p-1 mx-1">
              Home
            </a>
            <a href="" className="p-1 mx-1">
              Blogs
            </a>
            <a href="" className="p-1 mx-1">
              Projects
            </a>
          </nav>
        </div>
        <a href="">contact me</a>
      </div>
    </div>
  );
}
