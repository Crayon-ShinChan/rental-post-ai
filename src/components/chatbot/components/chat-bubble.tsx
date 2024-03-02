import { cn } from "@/lib/utils";

export function LeftChatBubble({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      <div className="max-w-[83%] rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function RightChatBubble({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[83%] rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-700">
        {children}
      </div>
    </div>
  );
}
