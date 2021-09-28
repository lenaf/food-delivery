import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

interface IProps {
  url?: string;
  onUpload: (uploadedUrl: string) => void;
}

const PhotoUpload: React.FC<IProps> = ({ url, onUpload }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={(info) => {
        if (info.file.originFileObj) {
          setLoading(true);
          firebase
            .storage()
            .ref()
            .child(uuidv4())
            .put(info.file.originFileObj)
            .then((snapshot) => {
              firebase
                .storage()
                .ref(snapshot.metadata.fullPath)
                .getDownloadURL()
                .then((uploadedUrl) => {
                  onUpload(uploadedUrl);
                  setLoading(false);
                });
            });
        }
      }}
    >
      {loading ? (
        <LoadingOutlined />
      ) : url ? (
        <img src={url} alt="avatar" style={{ width: "100%" }} />
      ) : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default PhotoUpload;
