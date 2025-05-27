import { useRef } from "react";

const ImageUpload = ({
    id = "image-upload",
    name = "image",
    useFor,
    className = "border-sky-500 focus:outline-none focus:border-2 focus:border-sky-500 focus:shadow-[0_0_5px_rgba(0,191,255,10)] hover:shadow-[0_0_5px_rgba(0,191,255,10)] transition-shadow ease-in-out",
    style = {},
    png = true,
    ...rest
}) => {
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };
    return (
        <div>
            <label
                htmlFor={id}
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
                    <p className="text-gray-500 text-sm mt-1">{png ? "PNG, JPG, SVG" : "PDF"}</p>
                </div>
            </label>
            <input
                onChange={rest.onChange}
                ref={inputRef}
                id={id}
                name={name}
                type="file"
                accept={png ? "image/*" : "application/pdf"}
                className="sr-only"
                required={png}
            />
        </div>
    );
};

export default ImageUpload