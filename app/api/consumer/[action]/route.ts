import { NextResponse } from 'next/server';
import { createConsumerAuthHandlers } from '@/lib/consumer-auth';

export const { POST } = createConsumerAuthHandlers({ NextResponse });
