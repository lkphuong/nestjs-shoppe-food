export function formatUser(users: any) {
  const userFormated = users.map((user) => {
    delete user.password;
    delete user.refreshToken;
    return {
      ...user,
      group: user.group.id,
      cart: user.cart.id,
    };
  });
  return userFormated;
}
