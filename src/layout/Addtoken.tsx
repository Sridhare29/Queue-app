import { Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getgenerateToken } from "../state/action/generateToken.Action";

type AddTokenProps = {
  open: boolean;
  onClose: () => void;
};

function AddToken({ open, onClose }: AddTokenProps) {
  const dispatch = useDispatch<any>();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !mobileNo.trim()) return;

    if (!/^\d{10}$/.test(mobileNo.trim())) {
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(getgenerateToken({
        name: name.trim(),
        mobileNo: mobileNo.trim(),
      }));

      setName("");
      setMobileNo("");
      setMobileError("");
      onClose();
    } catch (error) {
      console.error("Failed to generate token:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Generate Token"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Submit"
      confirmLoading={isSubmitting}
    >
      <div className="input-group">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Mobile No"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={mobileNo}
          status={mobileError ? "error" : undefined}
          onChange={(e) => {
            setMobileNo(e.target.value);
            if (mobileError) setMobileError("");
          }}
        />
        {mobileError && <div className="ant-form-item-explain-error">{mobileError}</div>}
      </div>
    </Modal>
  );
}

export default AddToken;