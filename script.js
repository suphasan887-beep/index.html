// ⚡ 1. ระบบดึงโค้ด Render API
async function fetchBrandNewScript(btnElement) {
    btnElement.innerText = "⏳ กำลังเชื่อมต่อ Render...";
    btnElement.disabled = true;

    try {
        const res = await fetch("https://sript-wid.onrender.com/generate-token-and-script");
        const data = await res.json();

        if (data.success) {
            const scriptBox = document.getElementById("brandNewScriptBox");
            scriptBox.value = data.loaderScript;
            
            scriptBox.select();
            navigator.clipboard.writeText(data.loaderScript);

            btnElement.innerText = "📋 คัดลอกโค้ดสำเร็จ!";
            btnElement.style.backgroundColor = "#00ff88";
            btnElement.style.color = "#000";
            btnElement.disabled = false;

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

// 📚 2. ฐานข้อมูลคลังฟังก์ชัน (อยากเพิ่มปุ่มแคปซูลไหน สามารถมาเพิ่มบรรทัดในนี้ได้เลย!)
const docsList = [
    {
        id: "player",
        icon: "fa-user",
        btnName: "Player",
        title: "Player & WalkSpeed",
        desc: "ใช้สำหรับปรับแต่งค่าความเร็ว WalkSpeed / JumpPower ของตัวละครผู้เล่น",
        code: "game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 100"
    },
    {
        id: "remote",
        icon: "fa-terminal",
        btnName: "การยิง RemoteEvent ออโต้เก็บของ",
        title: "การยิง RemoteEvent (:FireServer)",
        desc: "คำสั่งสำหรับสั่งงานจาก Client ไปยัง Server เพื่อทำกิจกรรมออโต้หรือเก็บของ",
        code: `local ReplicatedStorage = game:GetService("ReplicatedStorage")\nReplicatedStorage.RemoteEvent:FireServer()`
    },
    {
        id: "pcall",
        icon: "fa-shield-halved",
        btnName: "pcall",
        title: "pcall (Protected Call)",
        desc: "ครอบขวดแก้วนิรภัยกันสคริปต์พังเวลาเจอ Error",
        code: "pcall(function()\n    -- โค้ดเสี่ยงพัง\nend)"
    },
    {
        id: "loop",
        icon: "fa-rotate",
        btnName: "while loop",
        title: "while task.wait() do",
        desc: "วนลูปเช็คข้อมูลหรือสแกนหาผู้เล่น Real-time ตลอดเวลา",
        code: "while task.wait(0.5) do\n    -- โค้ดที่ต้องการให้ทำซ้ำ\nend"
    },
    {
        id: "getgenv",
        icon: "fa-sliders",
        btnName: "getgenv()",
        title: "getgenv() (Global Environment)",
        desc: "ใช้สร้างตัวแปรกลางสำหรับเปิด/ปิด Toggle ในสคริปต์",
        code: "getgenv().AutoFarm = true"
    },
    {
        id: "instance",
        icon: "fa-cube",
        btnName: "Instance.new",
        title: "Instance.new() (เสกวัตถุ/UI)",
        desc: "เสกวัตถุหรือหน้าต่าง UI ใหม่ขึ้นมาในเกม",
        code: 'local btn = Instance.new("TextButton")\nbtn.Parent = game.CoreGui'
    }
];

// 🔄 3. ฟังก์ชันเรนเดอร์สร้างปุ่มแคปซูลใส่หน้าเว็บอัตโนมัติ
function renderCapsules() {
    const container = document.getElementById("capsuleContainer");
    if (!container) return;
    
    container.innerHTML = "";

    docsList.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "expandable-item";
        itemDiv.setAttribute("data-id", item.id);

        itemDiv.innerHTML = `
            <button class="capsule-btn" onclick="toggleCard('${item.id}')">
                <span><i class="fa-solid ${item.icon}"></i> ${item.btnName}</span>
            </button>
            
            <div class="expanded-card" id="card-${item.id}" style="display: none;">
                <div class="card-header-row">
                    <span class="card-title">${item.title}</span>
                    <button class="close-card-btn" onclick="toggleCard('${item.id}')"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <p class="card-desc">คำอธิบาย: ${item.desc}</p>
                <div class="card-code-box">${item.code}</div>
            </div>
        `;

        container.appendChild(itemDiv);
    });
}

// ⚡ 4. สคริปต์สั่งย่อ/ขยาย ปุ่มแคปซูล
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

// 🚀 สั่งรันสร้างปุ่มแคปซูลทันทีที่เปิดหน้าเว็บเสร็จ
document.addEventListener("DOMContentLoaded", () => {
    renderCapsules();
});

