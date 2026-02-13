import { NextResponse } from 'next/server';
import { createChatRouteHandlers } from 'keystone-design-bootstrap/next/routes/chat';

export const { GET, POST } = createChatRouteHandlers({ NextResponse });

