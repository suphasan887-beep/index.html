async function fetchBrandNewScript(btnElement) {
    btnElement.innerText = "⏳ กำลังเชื่อมต่อ Render...";
    btnElement.disabled = true;

    try {
        const res = await fetch("https://sript-wid.onrender.com/generate-token-and-script");
        const data = await res.json();

        if (data.success) {
            const scriptBox = document.getElementById("brandNewScriptBox");
            scriptBox.value = data.loaderScript; 
            
            // ก๊อปปี้เข้าคลิปบอร์ดอัตโนมัติ
            scriptBox.select();
            navigator.clipboard.writeText(data.loaderScript);

            btnElement.innerText = "📋 คัดลอกโค้ดสำเร็จ!";
            btnElement.style.background = "#00ff88";
            btnElement.style.color = "#000";
            btnElement.disabled = false;

            // พอกดซ้ำ จะเป็นการก๊อปปี้ซ้ำ
            btnElement.onclick = function() {
                scriptBox.select();
                navigator.clipboard.writeText(scriptBox.value);
                btnElement.innerText = "📋 คัดลอกอีกรอบแล้ว!";
                setTimeout(() => { btnElement.innerText = "📋 คัดลอกโค้ดสำเร็จ!"; }, 1500);
            };

        } else {
            btnElement.innerText = "❌ เกิดข้อผิดพลาด ลองใหม่";
            btnElement.disabled = false;
        }
    } catch (error) {
        console.error(error);
        btnElement.innerText = "⚠️ เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
        btnElement.disabled = false;
    }
}





// ⚡ 1. ฟังก์ชันสลับย่อ-ขยายแคปซูล (พร้อมอนิเมชันเด้ง)
function toggleCard(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    if (!item) return;

    const btn = item.querySelector('.capsule-btn');
    const card = document.getElementById(`card-${id}`);

    if (card.style.display === "none") {
        item.classList.add('active');
        card.style.display = "block";
        btn.style.display = "none";
    } else {
        item.classList.remove('active');
        card.style.display = "none";
        btn.style.display = "inline-flex";
    }
}

// 📋 2. ฟังก์ชันคัดลอกโค้ดตัวอย่างในกล่องขยาย
function copySnippet(elementId, btnElement) {
    const codeText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = `<i class="fa-solid fa-check"></i> คัดลอกเรียบร้อย!`;
        btnElement.style.background = "#00ff88";
        btnElement.style.color = "#000";

        setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.style.background = "";
            btnElement.style.color = "";
        }, 1500);
    }).catch(err => {
        console.error("คัดลอกไม่สำเร็จ:", err);
    });
}














const SUPABASE_URL = 'https://ztkqtvdllpzjsvlqxzni.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BkDeJmZYwMys8OP4eMkpVQ_F6hrJ35t';

let supabase = null;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (err) {
    console.error("Supabase Init Error:", err);
}

let isLampOn = false;

// เปิดหน้าต่าง Modal ล็อกอิน
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (!modal) {
        alert("ไม่พบ ID auth-modal ในหน้า HTML");
        return;
    }
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
}

// ปิดหน้าต่าง Modal ล็อกอิน (แก้ปัญหาคลิกทะลุหลังปิด)
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
}

// ฟังก์ชันดึงสายไฟสลับโหมด Login / Register
function toggleLamp() {
    isLampOn = !isLampOn;
    const lampLight = document.getElementById('lamp-light');
    const lampKnob = document.getElementById('lamp-knob');
    const lampHint = document.getElementById('lamp-hint');
    const loginCard = document.getElementById('login-card');
    const regCard = document.getElementById('register-card');

    if (!loginCard || !regCard) {
        alert("ไม่พบการ์ด Login หรือ Register ในหน้า HTML");
        return;
    }

    if (isLampOn) {
        if (lampLight) {
            lampLight.classList.remove('opacity-0');
            lampLight.classList.add('opacity-100');
        }
        if (lampKnob) {
            lampKnob.className = 'w-6 h-9 bg-amber-200 rounded-full shadow-lg border-2 border-amber-200 group-hover:scale-110 flex items-center justify-center';
        }
        if (lampHint) lampHint.innerText = 'ดึงเพื่อปิดไฟ';

        loginCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        loginCard.classList.remove('z-20');

        regCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        regCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');
    } else {
        if (lampLight) {
            lampLight.classList.remove('opacity-100');
            lampLight.classList.add('opacity-0');
        }
        if (lampKnob) {
            lampKnob.className = 'w-6 h-9 bg-amber-400 rounded-full shadow-lg border-2 border-amber-200 group-hover:scale-110 flex items-center justify-center';
        }
        if (lampHint) lampHint.innerText = 'ดึงสายไฟ';

        regCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        regCard.classList.remove('z-20');

        loginCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        loginCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');
    }
}

// ฟังก์ชันสมัครสมาชิกผ่าน Supabase
async function handleRegister() {
    if (!supabase) {
        alert("ระบบ Supabase ยังไม่พร้อมใช้งาน");
        return;
    }
    const username = document.getElementById('reg-username')?.value.trim();
    const email = document.getElementById('reg-email')?.value.trim();
    const password = document.getElementById('reg-password')?.value;
    const confirmPassword = document.getElementById('reg-confirm-password')?.value;

    if (!username || !email || !password || !confirmPassword) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง!');
        return;
    }
    if (password !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน!');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert('สมัครไม่สำเร็จ: ' + error.message);
            return;
        }
        alert('สมัครสมาชิกสำเร็จ!');
        toggleLamp();
    } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
    }
}

// ฟังก์ชันเข้าสู่ระบบผ่าน Supabase
async function handleLogin() {
    if (!supabase) {
        alert("ระบบ Supabase ยังไม่พร้อมใช้งาน");
        return;
    }
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!email || !password) {
        alert('กรุณากรอกอีเมลและรหัสผ่าน!');
        return;
    }

    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('เข้าสู่ระบบไม่สำเร็จ: ' + error.message);
            return;
        }
        alert('เข้าสู่ระบบสำเร็จ!');
        closeAuthModal();
    } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
    }
}

// ผูกฟังก์ชันเข้ากับ window
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.toggleLamp = toggleLamp;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
