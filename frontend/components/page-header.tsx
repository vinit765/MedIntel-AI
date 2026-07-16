export function PageHeader({
  eyebrow,
  title,
  description
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h1 className="text-3xl font-semibold tracking-normal text-slate-950">{title}</h1>
      <p className="max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
