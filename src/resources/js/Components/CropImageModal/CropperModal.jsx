import { Button, Modal, Slider } from "@mui/material";
import React from "react";
import Cropper from "react-easy-crop";

const CropperModal = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  open,
  onClose,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
  minZoom,
  aspectRatio,
  cropWidth,
}) => {
  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center" slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0,0,0,0.8)' } } }}>
      <div className="w-11/12 max-w-[420px] sm:w-[420px] h-[500px] rounded-lg bg-white m-0 p-0">
        <div className="h-[400px] relative rounded-t-lg bg-blue-100 m-0 p-0">
          <div className="m-0 p-0">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              minZoom={minZoom}
              maxZoom={minZoom + 3}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{
                width: cropWidth,
                height: cropWidth / aspectRatio
              }}
              classes={{
                containerClassName: "h-[400px] rounded-t-lg bg-gray-100 relative",
                cropAreaClassName: "border-3 border-solid border-blue-500",
                mediaClassName: "p-0"
              }}
              onMediaLoaded={onMediaLoaded}
              showGrid={false}
            />
          </div>
        </div>
        <div className="h-10 mx-12 flex items-center mt-2">
          <Slider
            min={minZoom}
            value={zoom}
            max={minZoom + 3}
            step={0.1}
            onChange={(e, value) => {
              if (typeof value === "number") {
                setZoom(value);
              }
            }}
            className="text-blue-500"
          />
        </div>
        <div className="h-10 flex items-center justify-around mx-20">
          <Button onClick={onClose} variant="outlined" color="inherit">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              onClose();
              showCroppedImage();
            }}
            variant="outlined"
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CropperModal;
