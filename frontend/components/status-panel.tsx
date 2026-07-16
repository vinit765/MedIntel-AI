import type { LucideIcon } from "lucide-react";

export function StatusPanel({
  title,
  description,
  icon: Icon,
  items
}: Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700" key={item}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
