import { NextResponse } from 'next/server';
import { createFormRouteHandlers } from '@keystone-sites/core/next/routes/form';

export const { POST } = createFormRouteHandlers({ NextResponse });
