import StyledRoot from "./StyledRoot"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main>
                    <StyledRoot>
                        {children}
                    </StyledRoot>
                </main>
            </body>
        </html>
    )
}