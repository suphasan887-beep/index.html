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






let isLampOn = false;

function toggleLamp() {
    isLampOn = !isLampOn;

    const mainBg = document.getElementById('main-bg');
    const lampLight = document.getElementById('lamp-light');
    const lampKnob = document.getElementById('lamp-knob');
    const lampHint = document.getElementById('lamp-hint');
    const loginCard = document.getElementById('login-card');
    const regCard = document.getElementById('register-card');

    if (isLampOn) {
        // 💡 สถานะเปิดไฟ (เปลี่ยนเป็นโหมดสมัครสมาชิก - กระจกใสสว่าง)
        mainBg.classList.remove('bg-slate-950');
        mainBg.classList.add('bg-slate-900');
        lampLight.classList.remove('opacity-0');
        lampLight.classList.add('opacity-100');
        
        lampKnob.classList.remove('bg-amber-400');
        lampKnob.classList.add('bg-amber-200');
        lampHint.innerText = 'ดึงเพื่อปิดไฟ';

        // ซ่อนหน้า Login สลับให้หน้า Register ขึ้นมาแทน
        loginCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        loginCard.classList.remove('z-20');
        loginCard.classList.add('z-10');

        regCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        regCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');

    } else {
        // 🌙 สถานะปิดไฟ (เปลี่ยนเป็นโหมดเข้าสู่ระบบ - กระจกเข้ม)
        mainBg.classList.remove('bg-slate-900');
        mainBg.classList.add('bg-slate-950');
        lampLight.classList.remove('opacity-100');
        lampLight.classList.add('opacity-0');

        lampKnob.classList.remove('bg-amber-200');
        lampKnob.classList.add('bg-amber-400');
        lampHint.innerText = 'ดึงสายไฟ';

        // ซ่อนหน้า Register สลับให้หน้า Login ขึ้นมาแทน
        regCard.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        regCard.classList.remove('z-20');
        regCard.classList.add('z-10');

        loginCard.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
        loginCard.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-20');
    }
}
