"use client";

export default function ImageUpload({ onChange }) {
    return (
        <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">
                Food image
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={(event) => onChange(event.target.files[0])}
                className="w-full bg-[#292a27] border border-white/10 rounded-xl px-4 py-3 text-gray-300"
            />
        </div>
    );
}