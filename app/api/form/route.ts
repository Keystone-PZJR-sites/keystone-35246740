import { NextResponse } from 'next/server';
import { createFormRouteHandlers } from 'keystone-design-bootstrap/next/routes/form';

export const { POST } = createFormRouteHandlers({ NextResponse });
