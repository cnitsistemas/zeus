"use client"
import { Breadcrumbs, Stack } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function BreadcrumbComponent({ breadcrumbItens }: { breadcrumbItens: any }) {
  return (<>
    <Stack spacing={2} >
      <Breadcrumbs
        sx={{ fontSize: '14px' }}
        separator={<ArrowForwardIosIcon sx={{ fontSize: 10 }} />}
        aria-label="breadcrumb"
      >
        {breadcrumbItens}
      </Breadcrumbs>
    </Stack>
  </>)
}