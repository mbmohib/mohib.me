export default function Footer() {
  return (
    <div className="bg-base-200">
      <div className="container py-2 mt-10">
        <div className="flex justify-between">
          <div className="flex gap-x-1">
            <p>
              UI Designed by{' '}
              <a
                href="https://behance.net/nurshadrahman"
                className="text-primary"
              >
                Nurshad Rahman
              </a>
            </p>
          </div>
          <div>
            <p>© 2020-present Mohib. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
