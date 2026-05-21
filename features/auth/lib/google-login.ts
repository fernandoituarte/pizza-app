import { envs } from "@/config/envs";
import { apiClient } from "@/shared/lib/api/api-client";
import axios from "axios";

type GoogleCredentialResponse = {
  credential: string;
};

type PromptMoment = {
  isNotDisplayed?: () => boolean;
  getNotDisplayedReason?: () => string;
  isSkippedMoment?: () => boolean;
  getSkippedReason?: () => string;
  isDismissedMoment?: () => boolean;
  getDismissedReason?: () => string;
};

type GoogleInitializeConfig = {
  client_id: string;
  use_fedcm_for_prompt?: boolean;
  callback: (response: GoogleCredentialResponse) => Promise<void>;
};

interface GoogleAccounts {
  id: {
    initialize: (config: GoogleInitializeConfig) => void;
    prompt: (notification?: (moment: PromptMoment) => void) => void;
  };
}

declare global {
  interface Window {
    google: {
      accounts: GoogleAccounts;
    };
  }
}

let isGoogleIdentityInitialized = false;

export const handleGoogleLogin = () => {
  if (!window.google) return;

  if (!isGoogleIdentityInitialized) {
    window.google.accounts.id.initialize({
      client_id: envs.GOOGLE_CLIENT_ID,
      use_fedcm_for_prompt: false,
      callback: async (response) => {
        try {
          const idToken = response.credential;

          await apiClient.post("/oauth/google", { idToken });

          window.location.href = "/";
        } catch (err) {
        }
      },
    });

    isGoogleIdentityInitialized = true;
  }

  window.google.accounts.id.prompt((moment) => {
    if (moment?.isNotDisplayed?.()) {
      console.warn(
        "Google prompt not displayed:",
        moment.getNotDisplayedReason?.() ?? "unknown",
      );
    }

    if (moment?.isSkippedMoment?.()) {
      console.warn(
        "Google prompt skipped:",
        moment.getSkippedReason?.() ?? "unknown",
      );
    }

    if (moment?.isDismissedMoment?.()) {
      console.warn(
        "Google prompt dismissed:",
        moment.getDismissedReason?.() ?? "unknown",
      );
    }
  });
};
