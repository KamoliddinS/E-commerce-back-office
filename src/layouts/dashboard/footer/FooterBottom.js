import React from 'react'
// @mui
import { Box, Container, Typography, Grid, Stack, Link, useTheme } from '@mui/material'

export default function FooterBottom() {
  return (
    <Box
        sx={{
            py: 5,
            bgcolor: 'background.neutral',
            color: 'text.secondary',
        }}
    >
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} alignSelf="center">
                    <Typography variant="body2" sx={{ mb: 1 }}>© 2021 — «Smart Marketplace» MChJ. Barcha huquqlar himoyalangan.</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{fontSize: '12px', textTransform: 'uppercase'}}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Sayt yaratuvchisi</Typography>
                        <Link href="#" sx={{ color: '#2979FF' }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>RealSoft</Typography>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>

  )
}
