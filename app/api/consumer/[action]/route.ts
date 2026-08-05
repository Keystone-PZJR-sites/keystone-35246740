import { NextResponse } from 'next/server';
import { createConsumerAuthHandlers } from '@keystone-sites/core/next/routes/consumer-auth';

export const { POST } = createConsumerAuthHandlers({ NextResponse });
