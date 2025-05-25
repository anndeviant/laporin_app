import { useRef } from "react";

const ImageUpload = ({
    useFor,
    className = "border-sky-500 focus:outline-none focus:border-2 focus:border-sky-500 focus:shadow-[0_0_5px_rgba(0,191,255,10)] hover:shadow-[0_0_5px_rgba(0,191,255,10)] transition-shadow ease-in-out",
    style = {},
    ...rest
}) => {
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };
    return (
        <div>
            <label
                htmlFor="image-upload"
                className={`w-full h-48 border-2 border-dashed ${className} rounded-md cursor-pointer flex flex-col items-center justify-center`}
                style={{ backgroundColor: "#ffffff", ...style }}
            >
                <div className="text-center">
                    <div className="mb-2">
                        <button
                            type="button"
                            onClick={handleButtonClick}
                            className="bg-[#38A8F4] hover:bg-sky-600 text-white rounded-full py-2 px-4"
                            {...rest}
                        >
                            {useFor}
                        </button>
                    </div>
                    <p className="text-gray-500">or drag photo here</p>
                    <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG, PDF</p>
                </div>
            </label>
            <input ref={inputRef} id="image-upload" name="image" type="file" accept="image/*, application/pdf" className="sr-only" />
        </div>
    );
}

export default ImageUpload