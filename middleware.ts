export { default } from "next-auth/middleware"

export const config = { matcher: ["/user", "/admin", "/publish", "/cart", "/checkout/:path*"] }