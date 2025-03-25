export interface sweetAlertProps {
  confirm: () => void;
  cancle: () => void;
  title: string;
  subtitle: string;
  type: "success" | "error" | "warning" | "info" | undefined;
  confirmBtnText: string;
  confirmBtnBsStyle?: string;
  cancelBtnBsStyle?: string; // ✅ Add this
  showCancel?: boolean; // ✅ Add this
  user?: string;
}

// export interface sweetAlertProps extends IsweetAlertProps {
//   user: IsweetAlertProps;
// }
