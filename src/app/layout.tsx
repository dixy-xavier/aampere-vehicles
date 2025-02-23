import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import StyledRoot from "./StyledRoot"
import '@/styles/globals.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <AppRouterCacheProvider>
                    <StyledRoot>
                        {children}
                    </StyledRoot>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}