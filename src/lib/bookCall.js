import { appLinks } from '../data/siteContent';
import { demoBookingConfig } from '../config/demoBooking';
import { BOOKING_SOURCE_CALENDAR, submitDemoBooking } from './demoBooking';
import { track, trackMetaLead, setMetaUserPhone } from './track';

// The "book a call" submit, shared by the phone modal and the inline +91 form
// on the homepage feature cards, so the two cannot drift apart.
//
// Order matters. The calendar opens first, synchronously, inside the click
// gesture: browsers only honor window.open('_blank') while transient user
// activation is live, and awaiting the booking fetch first ends that gesture,
// so the popup blocker would silently swallow the tab. This is an async
// function, so everything up to the await runs synchronously on the call and a
// synchronous throw from the capture arrives as a rejection the caller handles.
// Meta matching runs before the Lead so the Lead carries the number.
//
// Pass a number that has already passed validateIndianMobileNumber().
// The inline "+91 | Mobile number | Book Demo" form on the homepage feature
// cards (owner, 2026-10-31): the number is the booking, so nothing opens and
// the visitor stays on the card. It records the same capture as the calendar
// path (source landing_page) and the team calls back to fix the slot. Meta
// matching runs before the Lead so the Lead carries the number.
export async function requestDemoCall({ phone, context, pageUrl = window.location.href }) {
  track('demo_request', { cta_context: context });
  setMetaUserPhone(phone);
  trackMetaLead('feature_demo_request');

  await submitDemoBooking({
    phone,
    pageUrl,
    config: demoBookingConfig,
    source: BOOKING_SOURCE_CALENDAR,
  });
}

export async function startCalendarBooking({ phone, context, pageUrl = window.location.href }) {
  window.open(appLinks.bookDemo, '_blank', 'noopener,noreferrer');
  track('calendar_open', { cta_context: context });
  setMetaUserPhone(phone);
  trackMetaLead('book_demo_click');

  await submitDemoBooking({
    phone,
    pageUrl,
    config: demoBookingConfig,
    source: BOOKING_SOURCE_CALENDAR,
  });
}
