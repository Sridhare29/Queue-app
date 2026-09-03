import { Input, Modal } from "antd";

type AddTokenProps = {
  open: boolean;
  onClose: () => void;
};

function AddToken({ open, onClose }: AddTokenProps) {
  return (
    <Modal
      title="Generate Token"
      open={open}
      onOk={onClose}
      onCancel={onClose}
      okText="Submit"
    >
      <div className="input-group">
        <Input placeholder="Name" />
        <Input placeholder="Mobile No" />
      </div>
    </Modal>
  );
}

export default AddToken;