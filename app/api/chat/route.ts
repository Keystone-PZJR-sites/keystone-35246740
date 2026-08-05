import { NextResponse } from 'next/server';
import { createChatRouteHandlers } from '@keystone-sites/core/next/routes/chat';

export const { GET, POST } = createChatRouteHandlers({ NextResponse });

