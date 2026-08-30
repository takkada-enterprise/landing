import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const PhoneModalContext = createContext(null);

const DEFAULT_OPTIONS = Object.freeze({
  title: 'Book a Demo',
  subtitle: "Enter your phone number and we'll set up a personalized walkthrough.",
  submitLabel: 'Continue to Book',
  // Where submitting sends the visitor: 'calendar' (the booking page) or
  // 'demo' (straight into the app with the number pre-filled). Declared here
  // rather than only in PhoneModal's defaults because openWith() spreads over
  // DEFAULT_OPTIONS, so a key missing from this object is a key that resets to
  // undefined instead of to its default on the next open.
  destination: 'calendar',
});

export function PhoneModalProvider({ children }) {
  const [open, setOpenState] = useState(false);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const setOpen = useCallback((next) => {
    if (!next) setOptions(DEFAULT_OPTIONS);
    setOpenState(Boolean(next));
  }, []);

  const openWith = useCallback((customOptions = {}) => {
    setOptions({ ...DEFAULT_OPTIONS, ...customOptions });
    setOpenState(true);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, openWith, options }),
    [open, setOpen, openWith, options]
  );

  return (
    <PhoneModalContext.Provider value={value}>
      {children}
    </PhoneModalContext.Provider>
  );
}

export function usePhoneModal() {
  const ctx = useContext(PhoneModalContext);
  if (!ctx) {
    throw new Error('usePhoneModal must be used inside <PhoneModalProvider>');
  }
  return ctx;
}
