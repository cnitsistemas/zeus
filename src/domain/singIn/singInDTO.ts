interface Access {
  name: String;
  avatar: String;
  email: String;
  success: Boolean;
  accessToken: String;
  tokenType: String;
  message: String;
  expiresAt: String;
}

export const mapLoginCreateData = (data: any): Access => {
  return {
    name: data["user_name"],
    avatar: data["avatar"],
    email: data["user_email"],
    success: data["success"],
    accessToken: data["access_token"],
    tokenType: data["token_type"],
    message: data["Mensagem"],
    expiresAt: data["expires_at"],
  };
};
