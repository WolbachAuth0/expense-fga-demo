export function transformEmailAddressToFirstName(email) {
  let name = String(email).split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
