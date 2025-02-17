import { onMount } from 'solid-js';

const RECAPTCHA_SITE_KEY = '6LdFEMQqAAAAAEJGQ3JUeFOKv7C29LpISCca4eZI';

declare const grecaptcha: {
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

export const useRecaptcha = () => {
  onMount(() => {
    if (!document.querySelector(`[src="https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}"]`)) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.head.appendChild(script);
    }
  });

  // reCAPTCHA v3
  const isNotARobot = async (): Promise<boolean> => {
    try {
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
      if (!token) {
        return false;
      }
      const response = await fetch('https://endless-rage-production.up.railway.app/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!response?.ok) {
        return false;
      }
      const result = await response.json();
      if (!result?.success) {
        return false;
      }
      // is not a robot!
      return true;
    } catch {
      return false;
    }
  };

  return { isNotARobot };
};
