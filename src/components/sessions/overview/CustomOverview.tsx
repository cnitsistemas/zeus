import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

export const CustomOverview = (props: any) => {
  const { value, sx, icon, title, color } = props;

  return (
    <Card sx={sx} elevation={0}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "0.75rem",
              }}
              variant="overline"
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56,
              fontSize: 25,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
