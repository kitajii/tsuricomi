import React, { useState, useCallback, useEffect } from "react";
import CropperModal from "../../../Components/CropImageModal/CropperModal";
import { Button } from "@mui/material";
import getCroppedImg from "../../../Components/CropImageModal/getCroppedImg";
export const ASPECT_RATIO = 6 / 6;
export const CROP_WIDTH = 300;

const CropIconImage = (props) => {
    /** Cropモーダルの開閉 */
    const [isOpen, setIsOpen] = useState(false);

    /** アップロードした画像URL */
    const [imgSrc, setImgSrc] = useState("");

    /** 画像の拡大縮小倍率 */
    const [zoom, setZoom] = useState(1);
    /** 画像拡大縮小の最小値 */
    const [minZoom, setMinZoom] = useState(1);

    /** 切り取る領域の情報 */
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    /** 切り取る領域の情報 */
    const [croppedAreaPixels, setCroppedAreaPixels] = useState();

    /** 切り取ったあとの画像URL */
    const [croppedImgSrc, setCroppedImgSrc] = useState(props.iconUrl);

    const [formData, setFormData] = useState(null);

    const [originalFile, setOriginalFile] = useState(null);

    /**
     * ファイルアップロード後
     * 画像ファイルのURLをセットしモーダルを表示する
     */
    const onFileChange = useCallback(async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (reader.result) {
                    setImgSrc(reader.result.toString() || "");
                    setIsOpen(true);
                }
            });
            setOriginalFile(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);
    /**
     * Cropper側で画像データ読み込み完了
     * Zoomの最小値をセットしZoomの値も更新
     */
    const onMediaLoaded = useCallback((mediaSize) => {
        const { width, height } = mediaSize;
        const mediaAspectRadio = width / height;
        if (mediaAspectRadio > ASPECT_RATIO) {
            // 縦幅に合わせてZoomを指定
            const result = CROP_WIDTH / ASPECT_RATIO / height;
            setZoom(result);
            setMinZoom(result);
            return;
        }
        // 横幅に合わせてZoomを指定
        const result = CROP_WIDTH / width;
        setZoom(result);
        setMinZoom(result);
    }, []);

    /**
     * 切り取り完了後、切り取り領域の情報をセット
     */
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    /**
     * 切り取り後の画像を生成し画面に表示
     */
    const showCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(
                imgSrc,
                croppedAreaPixels,
                setFormData
            );
            setCroppedImgSrc(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imgSrc]);

    useEffect(() => {
        if (formData === null) return;
        const newImage = new File([formData], originalFile.name, {
            type: originalFile.type,
        });
        props.setData("icon", newImage);
    }, [formData]);

    return (
        <div>
            <div className="mt-6">
                <Button variant="contained" component="label">
                    画像を選択
                    <input type="file" hidden onChange={onFileChange} />
                </Button>
            </div>
            <div className="mt-3 w-[300px] h-[300px] flex items-center rounded-lg overflow-hidden bg-gray-300">
                {croppedImgSrc ? (
                    <img
                        src={croppedImgSrc}
                        alt="アイコン画像"
                        className="w-full object-contain bg-gray-300"
                    />
                ) : (
                    <div className="bg-gray-300 w-full h-full flex items-center justify-center text-white font-bold">
                        アイコンが未登録です
                    </div>
                )}
            </div>
            <CropperModal
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                onCropComplete={onCropComplete}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                imgSrc={imgSrc}
                showCroppedImage={showCroppedImage}
                onMediaLoaded={onMediaLoaded}
                minZoom={minZoom}
            />
        </div>
    );
};
export default CropIconImage;
