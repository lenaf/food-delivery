import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useGetPhotoUrl } from "../hooks";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

interface IProps {
  photoId?: string;
  onUpload: (photoId: string) => void;
}

const PhotoUpload: React.FC<IProps> = ({ photoId, onUpload }) => {
  const { url, loading: photoLoading } = useGetPhotoUrl(photoId ?? "");
  const [loading, setLoading] = useState(false);
  console.log(photoLoading, loading);
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={(info) => {
        if (info.file.originFileObj) {
          console.log("here");
          setLoading(true);
          firebase
            .storage()
            .ref()
            .child(uuidv4())
            .put(info.file.originFileObj)
            .then((snapshot) => {
              onUpload(snapshot.metadata.fullPath);
              setLoading(false);
            });
        }
      }}
    >
      {url ? (
        <img src={url} alt="avatar" style={{ width: "100%" }} />
      ) : (
        <div>
          {loading || photoLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default PhotoUpload;
