import { Input, Modal } from "antd";
import { useState } from "react";
import generateTokenApi from "../Api/GenerateToken/generateToken.api";

type AddTokenProps = {
  open: boolean;
  onClose: () => void;
};

function AddToken({ open, onClose }: AddTokenProps) {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !mobileNo.trim()) return;

    setIsSubmitting(true);

    try {
      await generateTokenApi.generateToken({
        name: name.trim(),
        mobileNo: mobileNo.trim(),
      });

      setName("");
      setMobileNo("");
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
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
    </Modal>
  );
}

export default AddToken;