import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

export const trackEvent = (eventName, params) => {
  logEvent(analytics, eventName, params);
};
