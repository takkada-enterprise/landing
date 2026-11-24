const PRODUCTION_PROJECT_REF = 'cuwdhditjhocntmxdqiz';
const PUBLIC_PRODUCTION_BOOKING_CONFIG = Object.freeze({
  functionUrl: `https://${PRODUCTION_PROJECT_REF}.supabase.co/functions/v1/paysaathi-booking`,
  // Publishable key, not the legacy anon JWT: Supabase disabled legacy keys on
  // this project and its gateway answers 401 before the function runs, which
  // silently dropped every website lead from 2026-11-01 to 2026-11-24.
  anonKey: 'sb_publishable_GHGbYXbMk_qj7KxjTiMDNw_-QHURn4u',
});

const readConfiguredValue = (value) => (typeof value === 'string' ? value.trim() : '');

const firstConfiguredValue = (...values) => values.find(Boolean) || '';

export function resolveDemoBookingConfig({
  env = import.meta.env,
  runtime = globalThis,
  includeProductionFallback = true,
} = {}) {
  const runtimeFunctionUrl = readConfiguredValue(runtime?.__BOOKING_FUNCTION_URL__);
  const runtimeAnonKey = readConfiguredValue(runtime?.__SUPABASE_ANON_KEY__);
  const envFunctionUrl = readConfiguredValue(env?.VITE_SUPABASE_FUNCTION_URL);
  const envAnonKey = readConfiguredValue(env?.VITE_SUPABASE_ANON_KEY);
  const fallbackFunctionUrl = includeProductionFallback ? PUBLIC_PRODUCTION_BOOKING_CONFIG.functionUrl : '';
  const fallbackAnonKey = includeProductionFallback ? PUBLIC_PRODUCTION_BOOKING_CONFIG.anonKey : '';

  return Object.freeze({
    functionUrl: firstConfiguredValue(runtimeFunctionUrl, envFunctionUrl, fallbackFunctionUrl),
    anonKey: firstConfiguredValue(runtimeAnonKey, envAnonKey, fallbackAnonKey),
  });
}

export const demoBookingConfig = resolveDemoBookingConfig();

export function hasDemoBookingBackend(config = demoBookingConfig) {
  return Boolean(
    config.functionUrl &&
    config.functionUrl.includes('supabase.co/functions/') &&
    config.anonKey &&
    !config.anonKey.startsWith('YOUR_')
  );
}
