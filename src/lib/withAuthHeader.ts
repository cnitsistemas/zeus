const withAuthHeader = (includeHeaderKey: boolean = true) => {
  const sessionRoot: { [key: string]: any } = JSON.parse(
    window.localStorage.getItem("persist:root") || "{}"
  );
  const sessionUser: { [key: string]: any } = JSON.parse(
    sessionRoot.singin || "{}"
  );
  if (sessionUser) {
    const auth: string = `${sessionUser.auth.tokenType} ${sessionUser.auth.accessToken}`;
    if (includeHeaderKey) {
      return {
        headers: {
          Authorization: auth,
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      return {
        Authorization: auth,
      };
    }
  }
  return null;
};

export default withAuthHeader;
