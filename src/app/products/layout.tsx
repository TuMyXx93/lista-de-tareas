import { Box, Group, Paper, Stack } from "@mantine/core";
import React from "react";

type ProductLayoutProps = {
    children: React.ReactNode;
};

export default function ProductLayout({ children }: ProductLayoutProps) {
    return (
        <Group align="flex-start" wrap="wrap">
            <Paper shadow="xs" p="md" style={{ minWidth: '200px' }}>
                <Stack>
                    <h3>Product Filters</h3>
                    <Box component="ul" style={{ listStyle: 'none', padding: 0 }}>
                        <li>Filter 1</li>
                        <li>Filter 2</li>
                        <li>Filter 3</li>
                    </Box>
                </Stack>
            </Paper>
            <Box style={{ flex: 1, minWidth: '300px' }}>
                {children}
            </Box>
        </Group>
    );
}