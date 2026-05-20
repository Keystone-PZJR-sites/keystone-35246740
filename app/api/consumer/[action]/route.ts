import { NextResponse } from 'next/server';
import { createConsumerAuthHandlers } from 'keystone-design-bootstrap/next/routes/consumer-auth';

export const { POST } = createConsumerAuthHandlers({ NextResponse });
