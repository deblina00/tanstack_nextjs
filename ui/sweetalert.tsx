import { sweetAlertProps } from "@/typeScript/sweetalert.interface";
import SweetAlert from "react-bootstrap-sweetalert";

function SweetAlertComponent({
  confirm,
  cancle,
  title,
  subtitle,
  type,
  confirmBtnBsStyle,
  cancelBtnBsStyle,
  showCancel,
}: sweetAlertProps) {
  return (
    <SweetAlert
      type={type}
      showCancel={true}
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle={confirmBtnBsStyle || "danger"}
      cancelBtnBsStyle={cancelBtnBsStyle || "default"}
      title={`${title} - ${subtitle}`}
      onConfirm={confirm}
      onCancel={cancle}
      focusCancelBtn={true}
    />
  );
}

export default SweetAlertComponent;
