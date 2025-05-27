import { X, AlertTriangle } from "lucide-react";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="bg-red-100 rounded-full p-2 mr-3">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {title || "Konfirmasi Hapus"}
                            </h3>
                        </div>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6">
                        {message || "Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan."}
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
