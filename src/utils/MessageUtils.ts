import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

export async function showMessage(
  type: SweetAlertIcon,
  iconColor = "#2562e9",
  title: string,
  text: string,
  cancelButtonColor = "#b53737",
  confirmButtonColor = "#2562e9",
  confirmButtonText = "Okay"
) {
  let options: SweetAlertOptions = {
    icon: type,
    iconColor: iconColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonColor: confirmButtonColor,
    confirmButtonText: confirmButtonText,
    title: title,
    text: text,
    footer: "<span>Contact of administration.</span>",
  };

  Swal.fire(options);
}

export async function confirmMessage(
  iconColor = "#2562e9",
  title: string,
  text: string,
  confirmButtonColor = "#2562e9",
  confirmButtonText = "Okay",
  denyButtonText: string,
  denyButtonColor = "#b53737"
) {
  let options: SweetAlertOptions = {
    icon: "warning",
    iconColor: iconColor,
    showDenyButton: true,
    confirmButtonColor: confirmButtonColor,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText,
    denyButtonColor: denyButtonColor,
    title: title,
    text: text,
  };

  return Swal.fire(options);
}
