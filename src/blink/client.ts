import { createClient } from '@blinkdotnew/sdk';

export const blink = createClient({
  projectId: 'irish-pub-tower-defense-jbv8f9i6',
  authRequired: false // Temporarily disable auth to debug
});