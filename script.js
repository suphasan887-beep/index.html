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






// 1. เชื่อมต่อกับโปรเจกต์ Supabase ของคุณ (นำ URL และ Anon Key จากหน้าเว็บ Supabase มาใส่)
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // ตัวอย่าง: 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'sb_publishable_BkDeJmZYwMys8OP4eMkpVQ_F6hrJ35t; // คีย์สาธารณะ (Anon Key) จาก Supabase

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let isLampOn = false;

// ฟังก์ชันดึงสายไฟสลับโหมด (อันเดิมที่มีอยู่แล้ว)
function toggleLamp() {
    isLampOn = !isLampOn;

    const mainBg = document.getElementById('main-bg');
    const lampLight = document.getElementById('lamp-light');
    const lampKnob = document.getElementById('lamp-knob');
    const lampHint = document.getElementById('lamp-hint');
    const loginCard = document.getElementById('login-card');
    const regCard = document.getElementById('register-card');

    if (isLampOn) {
        mainBg.classList.remove('bg-slate-950');
        mainBg.classList.add('bg-slate-900');
        lampLight.classList.remove('opacity-0');
        lampLight.classList.add('opacity-100');
        
        lampKnob.classList.remove('bg-amber-400');
        lampKnob.classList.add('bg-amber-200');
        lampHint.innerText = 'ดึงเพื่อปิดไฟ';

        loginCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        loginCard.classList.remove('z-20');
        loginCard.classList.add('z-10');

        regCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        regCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');
    } else {
        mainBg.classList.remove('bg-slate-900');
        mainBg.classList.add('bg-slate-950');
        lampLight.classList.remove('opacity-100');
        lampLight.classList.add('opacity-0');

        lampKnob.classList.remove('bg-amber-200');
        lampKnob.classList.add('bg-amber-400');
        lampHint.innerText = 'ดึงสายไฟ';

        regCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        regCard.classList.remove('z-20');
        regCard.classList.add('z-10');

        loginCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        loginCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');
    }
}

// ==========================================
// 🚀 ฟังก์ชันเชื่อมต่อระบบสมาชิก Supabase
// ==========================================

// 1. ฟังก์ชันสมัครสมาชิก
async function handleRegister() {
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง!');
        return;
    }

    if (password !== confirmPassword) {
        alert('รหัสผ่านทั้ง 2 ครั้งไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง!');
        return;
    }

    // สมัครสมาชิกผ่าน Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (authError) {
        alert('สมัครสมาชิกไม่สำเร็จ: ' + authError.message);
        return;
    }

    // บันทึกชื่อผู้ใช้ (Username) ลงในตาราง profiles ที่เราสร้างไว้
    const userId = authData.user.id;
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, username: username }]);

    if (profileError) {
        alert('บันทึกชื่อผู้ใช้ไม่สำเร็จ: ' + profileError.message);
    } else {
        alert('สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันตัวตน');
        toggleLamp(); // สลับกลับมาหน้าล็อกอิน
    }
}

// 2. ฟังก์ชันเข้าสู่ระบบ
async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('กรุณากรอกอีเมลและรหัสผ่าน!');
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert('เข้าสู่ระบบไม่สำเร็จ: ' + error.message);
    } else {
        alert('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับมาครับ');
        // ตรงนี้สามารถพาผู้ใช้ไปหน้ากิจกรรมต่อได้เลย เช่น window.location.href = "dashboard.html";
    }
}
