const ImageUpload = ({useFor}) => {
    return (
        <div>
            <label
                htmlFor="image-upload"
                className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
                <div className="text-center">
                    <div className="mb-2">
                        <button
                            type="button"
                            className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-4"
                        >
                            {useFor}
                        </button>
                    </div>
                    <p className="text-gray-500">or drag photo here</p>
                    <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
                </div>
            </label>
            <input id="image-upload" name="image" type="file" accept="image/*" className="sr-only" />
        </div>
    );
}

export default ImageUpload