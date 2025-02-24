import { Card, CardContent, CardHeader, Container, Link as MUILink } from "@mui/material";

export default function Home() {
    return (
        <Container sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
                <CardHeader title="Welcome home!"></CardHeader>
                <CardContent>
                    <MUILink href="/vehicles">View vehicle list</MUILink>
                </CardContent>
            </Card>
        </Container>
    );
}