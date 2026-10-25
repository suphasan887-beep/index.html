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
// ตั้งชื่อ sb (ห้ามใช้ชื่อ supabase เพราะชนกับตัวแปรของไลบรารี)
let sb = null;
try {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (err) {
    console.error("❌ โหลด Supabase ไม่สำเร็จ (เช็คว่าใส่ <script> ของ supabase-js ใน HTML แล้ว):", err);
}

let isLampOn = false;

function openAuthModal() {
    try {
        const modal = document.getElementById('auth-modal');
        if (!modal) {
            console.error("❌ Error: หา element ID 'auth-modal' ไม่พบใน HTML!");
            alert("Error: หา modal ไม่เจอ เช็คไอดี auth-modal ใน HTML ด่วน");
            return;
        }
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
    } catch (err) {
        console.error("❌ openAuthModal พัง:", err);
        alert("openAuthModal Error: " + err.message);
    }
}

function closeAuthModal() {
    try {
        const modal = document.getElementById('auth-modal');
        if (!modal) return;
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
    } catch (err) {
        console.error("❌ closeAuthModal พัง:", err);
    }
}

function toggleLamp() {
    try {
        isLampOn = !isLampOn;
        const lampLight = document.getElementById('lamp-light');
        const lampKnob = document.getElementById('lamp-knob');
        const lampHint = document.getElementById('lamp-hint');
        const loginCard = document.getElementById('login-card');
        const regCard = document.getElementById('register-card');

        // เช็คตัวแปรทีละตัวว่าอันไหนหาไม่เจอ จะได้ฟ้องชัดเจน
        if (!lampLight) console.warn("⚠️ เตือน: หา id='lamp-light' ไม่พบ");
        if (!loginCard) console.warn("⚠️ เตือน: หา id='login-card' ไม่พบ");
        if (!regCard) console.warn("⚠️ เตือน: หา id='register-card' ไม่พบ");

        if (!loginCard || !regCard) {
            alert("Error: การ์ด Login หรือ Register หายไปจากหน้าเว็บ!");
            return;
        }

        if (isLampOn) {
            if (lampLight) {
                lampLight.classList.remove('opacity-0');
                lampLight.classList.add('opacity-100');
            }
            if (lampKnob) lampKnob.className = 'w-6 h-9 bg-amber-200 rounded-full shadow-lg border-2 border-amber-200 group-hover:scale-110 flex items-center justify-center';
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
            if (lampKnob) lampKnob.className = 'w-6 h-9 bg-amber-400 rounded-full shadow-lg border-2 border-amber-200 group-hover:scale-110 flex items-center justify-center';
            if (lampHint) lampHint.innerText = 'ดึงสายไฟ';

            regCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
            regCard.classList.remove('z-20');

            loginCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
            loginCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');
        }
    } catch (err) {
        console.error("❌ toggleLamp พัง:", err);
        alert("เกิดข้อผิดพลาดที่ฟังก์ชันดึงสายไฟ: " + err.message);
    }
}

async function handleRegister() {
    try {
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

        if (!sb) { alert('ระบบสมาชิกยังไม่พร้อม (โหลด Supabase ไม่สำเร็จ)'); return; }
        const { data: authData, error: authError } = await sb.auth.signUp({ email, password });
        if (authError) {
            alert('สมัครไม่สำเร็จ (Supabase Auth Error): ' + authError.message);
            return;
        }

        const userId = authData.user && authData.user.id;
        if (!userId) { alert('สมัครไม่สำเร็จ: ไม่ได้รับ user id'); return; }
        const { error: profileError } = await sb.from('profiles').insert([{ id: userId, username }]);
        if (profileError) {
            alert('บันทึกชื่อผู้ใช้ไม่สำเร็จ (Database Error): ' + profileError.message);
        } else {
            alert('สมัครสมาชิกสำเร็จ! กรุณายืนยันอีเมล');
            toggleLamp();
        }
    } catch (err) {
        console.error("❌ handleRegister พัง:", err);
        alert("ระบบสมัครสมาชิกขัดข้อง: " + err.message);
    }
}

async function handleLogin() {
    try {
        const email = document.getElementById('login-email')?.value.trim();
        const password = document.getElementById('login-password')?.value;

        if (!email || !password) {
            alert('กรุณากรอกอีเมลและรหัสผ่าน!');
            return;
        }

        if (!sb) { alert('ระบบสมาชิกยังไม่พร้อม (โหลด Supabase ไม่สำเร็จ)'); return; }
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
            alert('เข้าสู่ระบบไม่สำเร็จ: ' + error.message);
        } else {
            alert('เข้าสู่ระบบสำเร็จ!');
            closeAuthModal();
        }
    } catch (err) {
        console.error("❌ handleLogin พัง:", err);
        alert("ระบบเข้าสู่ระบบขัดข้อง: " + err.message);
    }
}

