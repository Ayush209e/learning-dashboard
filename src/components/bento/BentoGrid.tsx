export default function BentoGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:gap-5">
      {children}
    </section>
  );
}
