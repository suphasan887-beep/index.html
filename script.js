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





<!-- 📦 กรอบใหญ่คลังฟังก์ชัน (ดีไซน์ขอบขาวเน้นชั้นหลัง + แคปซูลขยายร่าง) -->
<div class="hero-card docs-main-card">
    
    <h3 class="docs-main-title">
        <i class="fa-solid fa-list-check" style="color: var(--secondary);"></i> คลังฟังก์ชัน & คู่มือสคริปต์
    </h3>
    <p class="docs-main-subtext">
        กดที่แคปซูลเพื่อดูรายละเอียด (ปุ่มจะขยายเด้งออกมา พร้อมตัวอย่างและปุ่มคัดลอก)
    </p>

    <!-- พื้นที่จัดวางหลอดแคปซูล (Flex-Wrap เรียงต่อกัน) -->
    <div id="capsuleContainer" class="capsule-grid-wrapper">

        <!-- ======================================================= -->
        <!-- 📌 ตัวอย่างที่ 1: หลอดแคปซูล (ก๊อปปี้บล็อกนี้ไปเพิ่มอันใหม่ได้เลย) -->
        <!-- ======================================================= -->
        <div class="expandable-item" data-id="player">
            <!-- 🔹 ปุ่มหลอดแคปซูลตอนย่อ (แก้ไข ไอคอน และ ชื่อหัวข้อ ตรงนี้) -->
            <button class="capsule-btn" onclick="toggleCard('player')">
                <i class="fa-solid fa-user"></i>
                <span>Player</span> <!-- 👈 แก้ชื่อปุ่มแคปซูลตรงนี้ -->
            </button>

            <!-- 🔹 กล่องการ์ดตอนขยายร่าง (แก้ไข รายละเอียด โค้ด เวอร์ชั่น ตรงนี้) -->
            <div class="expanded-card" id="card-player" style="display: none;">
                <div class="card-header-row">
                    <div class="card-title-group">
                        <span class="card-title">Player & WalkSpeed</span> <!-- 👈 แก้หัวข้อหลักตรงนี้ -->
                        <span class="version-badge">v1.0.0</span> <!-- 👈 แก้ / เพิ่ม เวอร์ชันตรงนี้ -->
                    </div>
                    <button class="close-card-btn" onclick="toggleCard('player')">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- 👈 แก้คำอธิบายการใช้งานตรงนี้ -->
                <p class="card-desc">
                    <strong>💡 รายละเอียดการใช้งาน:</strong><br>
                    ใช้สำหรับปรับแต่งค่าความเร็ว WalkSpeed และ JumpPower ของตัวละครผู้เล่นหลัก
                </p>

                <!-- 👈 แก้ตัวอย่างโค้ด Lua ตรงนี้ -->
                <div class="code-header">💻 ตัวอย่างโค้ดการใช้งาน:</div>
                <div class="card-code-box" id="code-player">game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 100</div>

                <!-- ปุ่มคัดลอกโค้ด -->
                <button class="copy-code-btn" onclick="copySnippet('code-player', this)">
                    <i class="fa-solid fa-copy"></i> คัดลอกโค้ดตัวอย่าง
                </button>
            </div>
        </div>
        <!-- ==================== จบตัวอย่างที่ 1 ==================== -->


        <!-- ✍️ [จุดสำหรับเพิ่มฟังก์ชันใหม่]: ก๊อปปี้โครงสร้าง expandable-item ด้านบนมาแปะตรงนี้แล้วเปลี่ยน data-id และ id ให้ไม่ซ้ำกัน -->

    </div>
</div>
    
