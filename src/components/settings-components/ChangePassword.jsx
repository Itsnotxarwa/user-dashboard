import { Key, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ChangePassword() {
    const [show, setShow] = useState({
        cur: false,
        new: false,
        conf: false,
    });

    const togglePw = (field) => {
        setShow((prev) => ({
        ...prev,
        [field]: !prev[field],
        }));
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const [form, setForm] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [errors, setErrors] = useState({
        new: "",
        confirm: "",
    });

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const token = localStorage.getItem("token");
            
            const res = await fetch(
            `https://api.voixup.fr/me/password?current_password=${encodeURIComponent(currentPassword)}&new_password=${encodeURIComponent(newPassword)}`,
            {
                method: "PATCH",
                headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
                },
            }
            );
            
            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                alert(data?.detail || "Error changing password");
                return;
            }

            console.log("SUCCESS:", data);
            alert("Password changed successfully ✅");

            } catch (err) {
                console.log(err);
            }
        };
    return(
        <div className="p-6">
            <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-2.5 pb-3.5 border-b border-[rgba(3,44,166,.08)]
                mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                    bg-[rgba(3,44,166,.08)] text-yellow-500">
                        <Key />
                    </div>
                    <div className="font-bold text-sm">
                        Changer le mot de passe
                    </div>
                </div>
                <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Mot de passe actuel <span className="text-[#ef4444]">*</span>
                        </label>
                        <div className="relative mt-1">
                            <input
                            type={show.cur ? "text" : "password"}
                            value={form.current}
                            onChange={(e) => setForm({ ...form, current: e.target.value })}
                            placeholder="Votre mot de passe actuel"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:ring-[#032ca6] focus:outline-none focus:ring-2"
                            />
                            <button
                            type="button"
                            onClick={() => togglePw("cur")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                            {show.cur ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    
                    {/* New Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Nouveau mot de passe <span className="text-[#ef4444]">*</span>
                        </label>
                        <div className="relative mt-1">
                            <input
                            type={show.new ? "text" : "password"}
                            value={form.new}
                            onChange={(e) => setForm({...form, new: e.target.value})}
                            placeholder="Min. 8 caractères"
                            className={`w-full px-3 py-2 text-sm border rounded-md outline-none 
                                ${errors.new ? "border-red-500" : "border-gray-300"} placeholder-gray-400
                            focus:ring-[#032ca6] focus:outline-none focus:ring-2`}
                            />
                            <button
                            type="button"
                            onClick={() => togglePw("new")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                            {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.new && (
                            <p className="text-xs text-red-500 mt-1">
                            {errors.new}
                            </p>
                        )}
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Confirmer le nouveau mot de passe <span className="text-[#ef4444]">*</span>
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={show.conf ? "text" : "password"}
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                placeholder="Répéter le nouveau mot de passe"
                                className={`w-full px-3 py-2 text-sm border rounded-md outline-none 
                                ${errors.new ? "border-red-500" : "border-gray-300"} placeholder-gray-400
                                focus:ring-[#032ca6] focus:outline-none focus:ring-2`}
                            />
                            <button
                            type="button"
                            onClick={() => togglePw("conf")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                            {show.conf ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.confirm && (
                            <p className="text-xs text-red-500 mt-1">
                            {errors.confirm}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between my-4">
                    <div className="text-xs text-[#9aabca]">
                        Min. 8 caractères · 1 majuscule · 1 chiffre
                    </div>
                    <button 
                    onClick={() => {
                        let newErrors = { new: "", confirm: "" };
                        if (!passwordRegex.test(form.new)) {
                            newErrors.new = "Min 8 caractères, 1 majuscule, 1 chiffre";
                        }
                        if (form.new !== form.confirm) {
                            newErrors.confirm = "Passwords do not match";
                        }

                        setErrors(newErrors);

                        if (newErrors.new || newErrors.confirm) return;

                        changePassword(form.current, form.new);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold 
                    text-white rounded-lg border border-[#032ca6] bg-[#032ca6]
                    shadow-md hover:bg-[#02238a] transition cursor-pointer">
                        Mettre à jour
                    </button>
                </div>
            </div>
        </div>
    )
}