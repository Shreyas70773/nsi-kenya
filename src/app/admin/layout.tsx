/**
 * Admin route-group layout. Intentionally stripped of the marketing header
 * and footer so the admin surface doesn't look like a public page.
 */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-1 flex-col bg-bg text-text">{children}</div>
  );
}
