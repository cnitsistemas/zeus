interface Access {
  avatar: String;
  userName: String;
  userEmail: String;
  accessToken: String;
  tokenType: String;
  success: boolean;
  message: String;
  expiresAt: String;
}

export const mapLoginCreateData = (data: any): Access => {
  return {
    userName: data["user_name"],
    avatar: data["avatar"],
    userEmail: data["user_email"],
    success: data["success"],
    accessToken: data["access_token"],
    tokenType: data["token_type"],
    message: data["Mensagem"],
    expiresAt: data["expires_at"],
  };
};
