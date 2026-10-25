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






