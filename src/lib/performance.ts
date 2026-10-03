import { useSyncExternalStore } from "react";

export function isLowPerformanceDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const navigatorWithHints = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  if (navigatorWithHints.connection?.saveData) {
    return true;
  }

  if (typeof navigatorWithHints.hardwareConcurrency === "number" && navigatorWithHints.hardwareConcurrency <= 4) {
    return true;
  }

  if (typeof navigatorWithHints.deviceMemory === "number" && navigatorWithHints.deviceMemory <= 4) {
    return true;
  }

  return false;
}

function subscribeNoop() {
  return () => {};
}

export function useLowPerformanceDevice() {
  return useSyncExternalStore(subscribeNoop, isLowPerformanceDevice, () => false);
}
