import api from "./api";
import * as Sentry from "@sentry/react";
import Environment from "./Environment";

export const sendTrackerToBackend = async (path: string, item: string) => {
  if (Environment.isInProduction()) {
    try {
      await api.get(`/track?path=${path}/${item}`);
    } catch (e) {
      Sentry.captureException(e);
    }
  }
};
