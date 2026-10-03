"use client";

export default function ConfirmDialog({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#30312e] rounded-2xl p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold text-white">
                    Delete this dish?
                </h2>

                <p className="text-gray-400 mt-2">
                    This action cannot be undone.
                </p>

                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 bg-[#e85b52] hover:bg-[#d94d45] text-white py-2 rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}