import type { CSSProperties, ReactNode } from "react";

// Image enlarging/zoom was removed per design — this is now a plain
// pass-through wrapper. Props beyond children/triggerClassName are accepted
// (and ignored) so existing call sites keep compiling.
export default function LightboxFrame({
  children,
  triggerClassName = "",
}: {
  alt?: string;
  children: ReactNode;
  triggerClassName?: string;
  modalWidth?: CSSProperties["width"];
}) {
  return <div className={`block w-full ${triggerClassName}`}>{children}</div>;
}
