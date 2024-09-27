import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req, res) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}
