/* ==========================================
   0. LOAD CUSTOM CONFIGURATIONS (LOCAL STORAGE)
   ========================================== */
function loadCustomConfigurations() {
    const heroTitle = localStorage.getItem('vt_heroTitle');
    const heroDesc = localStorage.getItem('vt_heroDesc');
    const address = localStorage.getItem('vt_address');
    const phone = localStorage.getItem('vt_phone');
    const brandDesc = localStorage.getItem('vt_brandDesc');

    const skillTitle1 = localStorage.getItem('vt_skillTitle1');
    const skillDesc1 = localStorage.getItem('vt_skillDesc1');
    const skillTitle2 = localStorage.getItem('vt_skillTitle2');
    const skillDesc2 = localStorage.getItem('vt_skillDesc2');
    const skillTitle3 = localStorage.getItem('vt_skillTitle3');
    const skillDesc3 = localStorage.getItem('vt_skillDesc3');
    const skillTitle4 = localStorage.getItem('vt_skillTitle4');
    const skillDesc4 = localStorage.getItem('vt_skillDesc4');

    if (heroTitle) {
        const el = document.getElementById('dyn-hero-title');
        if (el) el.innerHTML = heroTitle;
    }
    if (heroDesc) {
        const el = document.getElementById('dyn-hero-desc');
        if (el) el.textContent = heroDesc;
    }
    if (address) {
        const el = document.getElementById('dyn-footer-address');
        if (el) el.innerHTML = `<i data-lucide="map-pin"></i> ` + address;
    }
    if (phone) {
        const el = document.getElementById('dyn-footer-phone');
        if (el) el.innerHTML = `<i data-lucide="phone"></i> Hotline: ` + phone;
    }
    if (brandDesc) {
        const el = document.getElementById('dyn-footer-brand-desc');
        if (el) el.textContent = brandDesc;
    }

    if (skillTitle1) {
        const el = document.getElementById('dyn-skill-title-1');
        if (el) el.textContent = skillTitle1;
    }
    if (skillDesc1) {
        const el = document.getElementById('dyn-skill-desc-1');
        if (el) el.textContent = skillDesc1;
    }
    if (skillTitle2) {
        const el = document.getElementById('dyn-skill-title-2');
        if (el) el.textContent = skillTitle2;
    }
    if (skillDesc2) {
        const el = document.getElementById('dyn-skill-desc-2');
        if (el) el.textContent = skillDesc2;
    }
    if (skillTitle3) {
        const el = document.getElementById('dyn-skill-title-3');
        if (el) el.textContent = skillTitle3;
    }
    if (skillDesc3) {
        const el = document.getElementById('dyn-skill-desc-3');
        if (el) el.textContent = skillDesc3;
    }
    if (skillTitle4) {
        const el = document.getElementById('dyn-skill-title-4');
        if (el) el.textContent = skillTitle4;
    }
    if (skillDesc4) {
        const el = document.getElementById('dyn-skill-desc-4');
        if (el) el.textContent = skillDesc4;
    }

    // Load Founders dynamically
    const foundersGrid = document.querySelector('.founders-grid');
    if (foundersGrid) {
        const founders = JSON.parse(localStorage.getItem('vt_founders'));
        if (founders && founders.length > 0) {
            foundersGrid.innerHTML = ''; // Clear static cards
            founders.forEach(f => {
                const card = document.createElement('div');
                card.className = 'founder-card tilt-card scroll-reveal';
                card.setAttribute('data-tilt', '');
                card.innerHTML = `
                    <div class="card-glow"></div>
                    <div class="founder-img-wrapper">
                        <img src="${f.image}" alt="${f.name}" class="founder-img">
                    </div>
                    <span class="founder-role">${f.role}</span>
                    <h3>${f.name}</h3>
                    <p>${f.desc}</p>
                    <div class="founder-socials">
                        <a href="#" aria-label="Facebook"><i data-lucide="facebook"></i></a>
                        <a href="tel:0368273019" aria-label="phone"><i data-lucide="phone"></i></a>
                    </div>
                `;
                foundersGrid.appendChild(card);
            });
            // Re-apply tilt listeners (since they are dynamically added)
            initTiltEffect();
            lucide.createIcons();
        }
    }
}
// Run configuration loader on load
loadCustomConfigurations();

/* ==========================================
   1. TECH PARTICLE BACKGROUND CANVAS
   ========================================== */
const canvas = document.getElementById('tech-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const maxParticles = 65;

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.5 ? '#00f2fe' : '#9d4edd';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary collision / wrapping
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

// Connect particles with lines if close
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - (distance / 120)) * 0.15;
                ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();


/* ==========================================
   2. MOBILE NAV MENU TOGGLE
   ========================================== */
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change icon between menu and x
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close menu when clicking links
document.querySelectorAll('.nav-link, .btn-register').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});


/* ==========================================
   3. 3D CARD TILT EFFECT
   ========================================== */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        if (card.dataset.tiltInit === 'true') return;
        card.dataset.tiltInit = 'true';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * -12;
            const tiltY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}
initTiltEffect();


/* ==========================================
   4. SCROLL REVEAL & CHART ANIMATION
   ========================================== */
// Observe elements to fade/slide in on scroll
const scrollElements = document.querySelectorAll('.scroll-reveal');
const barFills = document.querySelectorAll('.bar-fill');

const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

scrollElements.forEach(el => scrollObserver.observe(el));

// Observe chart area to animate bars filling
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            barFills.forEach(bar => {
                const targetWidth = bar.style.width; // Grab set width
                bar.style.width = '0%'; // Reset first
                setTimeout(() => {
                    bar.style.width = targetWidth; // Animate to final width
                }, 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const chartContainer = document.querySelector('.bar-chart');
if (chartContainer) {
    chartObserver.observe(chartContainer);
}


/* ==========================================
   5. INTERACTIVE DIAGNOSTIC SIMULATOR
   ========================================== */
const simulatorScreen = document.getElementById('sim-screen');
const issuesButtons = document.querySelectorAll('.btn-issue');
const stepsTracker = document.getElementById('steps-tracker');
const activeIssueTitle = document.getElementById('active-issue-title');
const progressLine = document.getElementById('progress-line');
const progressSteps = document.querySelectorAll('.progress-step');
const stepTitle = document.getElementById('step-title');
const stepDesc = document.getElementById('step-desc');
const btnPrevStep = document.getElementById('btn-prev-step');
const btnNextStep = document.getElementById('btn-next-step');

let currentIssue = '';
let currentStep = 1;
const totalSteps = 4;

// Database of diagnostic simulator workflows
const simulatorData = {
    screen: {
        title: "Màn hình nứt vỡ & Liệt cảm ứng",
        steps: {
            1: {
                title: "Bước 1: Ráp máy và Tách màn hình",
                desc: "Rã ốc đít sườn máy, đặt điện thoại lên bàn nhiệt chuyên dụng ở 80 độ C để làm mềm lớp keo viền sườn. Sử dụng giác hút chân không và thanh nạy mỏng chuyên dùng để nhẹ nhàng tách màn hình vỡ ra khỏi khung sườn máy.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="wrench" class="sim-screen-icon text-warning"></i>
                            <h4 class="text-warning">ĐANG THÁO RÃ MÁY</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px;">Nhiệt độ bàn gia nhiệt: <span class="highlight">82°C</span></p>
                            <div class="pulse-indicator"></div>
                        </div>
                    `;
                }
            },
            2: {
                title: "Bước 2: Cắt kính vỡ bằng dây thép chuyên dụng",
                desc: "Đặt phôi màn hình vỡ lên máy hút chân không. Sử dụng dây kim loại mỏng (0.03mm) kéo luồn khéo léo để cắt tách phần kính vỡ ra khỏi tấm nền hiển thị OLED/LCD mà không làm hư hại tấm nền cảm ứng bên dưới.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="scissors" class="sim-screen-icon"></i>
                            <h4>ĐANG CẮT TÁCH KÍNH</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px;">Tách kính vỡ ra khỏi phôi OLED</p>
                            <div style="width: 80%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-top: 15px; overflow:hidden;">
                                <div style="width: 50%; height:100%; background: var(--accent-cyan); animation: fillLoading 2s infinite linear;"></div>
                            </div>
                        </div>
                    `;
                }
            },
            3: {
                title: "Bước 3: Ép kính mới & Hấp chân không",
                desc: "Lăn một lớp keo OCA mới lên mặt kính mới, ráp mặt kính với phôi OLED gốc rồi đưa vào máy ép kính chân không. Sau khi ép, đưa màn hình vào buồng hấp áp suất để loại bỏ hoàn toàn các bong bóng khí li ti còn sót lại.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="minimize-2" class="sim-screen-icon text-success"></i>
                            <h4 class="text-success">MÁY ÉP CHÂN KHÔNG</h4>
                            <p style="font-size: 0.8rem; margin-top: 4px;">Áp suất khí: <span class="highlight">0.85 MPa</span></p>
                            <p style="font-size: 0.8rem;">Trạng thái hấp bọt: <span class="text-success">Đang hấp bong bóng...</span></p>
                        </div>
                    `;
                }
            },
            4: {
                title: "Bước 4: Kiểm tra lại cảm ứng & Lắp ráp hoàn chỉnh",
                desc: "Cắm cáp kết nối màn hình với mainboard, lắp các tấm shield bảo vệ và siết ốc cố định. Bật máy test độ sáng, màu sắc hiển thị và vẽ toàn bộ giao diện cảm ứng để xác định không có điểm chết nào. Hoàn tất chu trình sửa chữa!",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="check-circle" class="sim-screen-icon text-success" style="font-size: 3.5rem;"></i>
                            <h4 class="text-success" style="font-weight:900;">ĐÃ HOÀN THÀNH</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px; color: var(--text-secondary);">Màn hình hoạt động xuất sắc!</p>
                            <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--accent-green); padding: 8px 16px; border-radius: 8px; margin-top: 15px; font-size:0.75rem; font-weight:700; color: var(--accent-green);">
                                HIỂN THỊ & CẢM ỨNG: OK
                            </div>
                        </div>
                    `;
                }
            }
        }
    },
    power: {
        title: "Máy chập nguồn (Không lên nguồn)",
        steps: {
            1: {
                title: "Bước 1: Kết nối máy cấp nguồn & Đo dòng rò",
                desc: "Kẹp bo mạch điện thoại vào bộ máy cấp nguồn DC đa năng. Quan sát kim dòng điện. Dòng điện vọt lên cực đại 5.5A và máy cấp nguồn báo còi chập (Short Circuit). Xác nhận trên mainboard có tụ điện bị chập nối đất.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="gauge" class="sim-screen-icon text-error"></i>
                            <h4 class="text-error">PHÁT HIỆN CHẬP MẠCH</h4>
                            <div style="font-size: 0.9rem; font-weight: 800; background: rgba(244, 63, 94, 0.15); border: 1px solid #f43f5e; padding: 10px; border-radius: 8px; margin-top: 10px;">
                                DÒNG ĐIỆN RÒ: 5.54A (CỰC ĐỘC)
                            </div>
                        </div>
                    `;
                }
            },
            2: {
                title: "Bước 2: Rải nhựa thông khói xác định vị trí lỗi",
                desc: "Sử dụng máy xông nhựa thông để phủ một lớp bụi phấn màu trắng đục mỏng lên các khu vực linh kiện trên bo mạch. Cấp dòng điện thấp vào mạch. Linh kiện bị chập điện (tỏa nhiệt) sẽ làm lớp nhựa thông chảy ra đầu tiên và lộ diện rõ nét.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="flame" class="sim-screen-icon text-warning"></i>
                            <h4 class="text-warning">XÔNG NHỰA THÔNG KHÓI</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px;">Dò tìm linh kiện tỏa nhiệt đột biến</p>
                            <div class="sim-pcb-graphic" style="margin-top: 10px;">
                                <div style="position: absolute; top: 40%; left: 50%; width: 14px; height: 14px; background: red; border-radius: 50%; box-shadow: 0 0 15px red; animation: pulse 1s infinite;"></div>
                                <div style="font-size: 0.65rem; color: red; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 90%; text-align:center; font-weight:800;">TỤ C12_RF BỊ NÓNG CHẢY</div>
                            </div>
                        </div>
                    `;
                }
            },
            3: {
                title: "Bước 3: Dùng mỏ hàn gắp bỏ linh kiện lỗi & Thay thế",
                desc: "Điều chỉnh nhiệt độ trạm khò hàn ở mức 340 độ C, thổi trực tiếp vào chân tụ điện bị chập (C12_RF) để nhấc bỏ nó ra khỏi mainboard. Dùng mỏ hàn chì siêu mịn dọn sạch chân đồng và đóng một tụ điện mới tương thích lấy từ mainboard rã xác.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="component" class="sim-screen-icon" style="color: var(--accent-purple);"></i>
                            <h4 style="color: var(--accent-purple);">ĐANG HÀN THAY TỤ</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px;">Nhiệt độ mỏ hàn: <span class="highlight">342°C</span></p>
                            <div style="font-size: 0.75rem; border: 1px dashed var(--accent-purple); padding: 5px; border-radius: 4px; margin-top: 10px; color: var(--text-secondary);">
                                Đóng tụ C12_RF mới...
                            </div>
                        </div>
                    `;
                }
            },
            4: {
                title: "Bước 4: Đo kiểm dòng sạc & Kích nguồn hoạt động",
                desc: "Kẹp lại máy cấp nguồn, kim dòng điện trở về mức 0A (không còn rò điện trước khi bấm nguồn). Nhấn nút nguồn, dòng điện dao động nhịp nhàng từ 0.05A lên 0.8A rồi 1.5A rất đẹp. Máy khởi động lên nguồn logo bình thường.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="check-circle" class="sim-screen-icon text-success" style="font-size: 3.5rem;"></i>
                            <h4 class="text-success" style="font-weight:900;">ĐÃ SỬA XONG NGUỒN</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px; color: var(--text-secondary);">Nạp xả ổn định, lên nguồn!</p>
                            <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--accent-green); padding: 8px 16px; border-radius: 8px; margin-top: 15px; font-size:0.75rem; font-weight:700; color: var(--accent-green);">
                                DÒNG ĐIỆN HOẠT ĐỘNG: 0.18A (BÌNH THƯỜNG)
                            </div>
                        </div>
                    `;
                }
            }
        }
    },
    faceid: {
        title: "Mất định danh gương mặt (Face ID)",
        steps: {
            1: {
                title: "Bước 1: Đọc mã lỗi chẩn đoán phần mềm iOS",
                desc: "Vào ứng dụng Cài đặt của iPhone, kiểm tra thông báo lỗi. Thiết bị hiển thị cảnh báo: 'Đã phát hiện sự cố với camera TrueDepth. Face ID đã bị tắt'. Kết nối máy với phần mềm JCID trên PC để quét chip định danh.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="smile" class="sim-screen-icon text-error"></i>
                            <h4 class="text-error">LỖI TRUEDEPTH CAMERA</h4>
                            <p style="font-size: 0.75rem; color:#f43f5e; margin-top: 8px; font-weight:700;">Face ID Is Disabled</p>
                            <div class="pulse-indicator" style="background:#f43f5e; box-shadow:0 0 10px #f43f5e;"></div>
                        </div>
                    `;
                }
            },
            2: {
                title: "Bước 2: Sử dụng Box JCID đọc & Sao lưu dữ liệu cũ",
                desc: "Tháo cụm cảm biến Face ID (chứa thấu kính chấm dot projector) ra khỏi màn hình. Cắm dây cáp vào Box lập trình JCID V1S Pro. Nhấn phím 'Read' trên box để đọc mã hóa chip cũ và sao lưu tệp tin dump dự phòng lên đám mây.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="database" class="sim-screen-icon"></i>
                            <h4>ĐỌC CHIP ĐỊNH DANH</h4>
                            <p style="font-size: 0.75rem; margin-top: 8px; font-family:monospace; color:var(--accent-cyan);">READING: JC-DE_92817263</p>
                            <div style="background: rgba(0, 242, 254, 0.1); border: 1px solid var(--accent-cyan); padding: 5px 12px; border-radius: 4px; margin-top: 10px; font-size:0.7rem; font-weight:700;">
                                ĐÃ BACKUP THÀNH CÔNG VÀO CLOUD
                            </div>
                        </div>
                    `;
                }
            },
            3: {
                title: "Bước 3: Sàng chip Face ID sang cáp sửa lỗi thế hệ mới",
                desc: "Tiến hành khò nhiệt nhẹ để tách IC MOSFET gương mặt khỏi cáp gốc bị đứt đường hoặc chập chip. Đặt IC cũ lên cáp sửa lỗi thế hệ mới (cáp JCID sửa lỗi không cần hàn hoặc hàn ít chân). Cho vào máy nung để chì nóng chảy khớp chân.",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="cpu" class="sim-screen-icon" style="color: var(--accent-purple);"></i>
                            <h4 style="color: var(--accent-purple);">SÀNG CHIP KHÔNG KHÒ</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px;">Gắn IC Face ID vào cáp JC FPC mới</p>
                            <div style="display:flex; gap:8px; margin-top:10px;">
                                <span style="font-size:0.65rem; background:rgba(255,255,255,0.05); padding:3px 6px; border-radius:4px; border: 1px solid var(--border-color);">IC Trùng Khớp</span>
                                <span style="font-size:0.65rem; background:rgba(0,230,118,0.1); padding:3px 6px; border-radius:4px; border: 1px solid var(--accent-green); color:var(--accent-green);">Chì hàn ngậm đều</span>
                            </div>
                        </div>
                    `;
                }
            },
            4: {
                title: "Bước 4: Đồng bộ dữ liệu & Kiểm tra quét khuôn mặt",
                desc: "Kết nối cáp Face ID mới đã được sàng chip vào máy JCID, ghi dữ liệu (Write) đã backup ở bước 2 vào cáp mới. Lắp cụm camera vào máy điện thoại, khởi động hệ thống và tiến hành quét gương mặt 3D để thiết lập. Face ID nhận diện siêu mượt!",
                render: () => {
                    return `
                        <div class="sim-screen-panel">
                            <i data-lucide="smile" class="sim-screen-icon text-success" style="font-size: 3.5rem;"></i>
                            <h4 class="text-success" style="font-weight:900;">FACE ID HOẠT ĐỘNG</h4>
                            <p style="font-size: 0.8rem; margin-top: 8px; color: var(--text-secondary);">Nhận diện 3D thành công!</p>
                            <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--accent-green); padding: 8px 16px; border-radius: 8px; margin-top: 15px; font-size:0.75rem; font-weight:700; color: var(--accent-green);">
                                TRUEDEPTH CAMERA: OK (MATCHED)
                            </div>
                        </div>
                    `;
                }
            }
        }
    }
};

// Handle issue selection
issuesButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active state from all buttons
        issuesButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Set state
        currentIssue = btn.dataset.issue;
        currentStep = 1;

        // Show step tracker widget
        stepsTracker.style.display = 'block';

        // Update titles
        activeIssueTitle.innerHTML = `<i data-lucide="activity"></i> Quy trình xử lý: <strong>${simulatorData[currentIssue].title}</strong>`;
        
        // Update Step Details and screen display
        updateSimulatorView();
        
        // Scroll slightly to steps tracker on mobile
        if(window.innerWidth < 768) {
            stepsTracker.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update simulator visual state
function updateSimulatorView() {
    const data = simulatorData[currentIssue].steps[currentStep];
    
    // Update text
    stepTitle.textContent = data.title;
    stepDesc.textContent = data.desc;

    // Update screen display HTML
    const displayArea = document.getElementById('screen-content');
    displayArea.className = `screen-content issue-${currentIssue}-step-${currentStep}`;
    displayArea.innerHTML = data.render();

    // Recreate lucide icons for dynamic HTML content
    lucide.createIcons();

    // Update timeline steps
    progressSteps.forEach(stepNode => {
        const stepNum = parseInt(stepNode.dataset.step);
        stepNode.className = 'progress-step'; // reset
        
        if (stepNum < currentStep) {
            stepNode.classList.add('completed');
        } else if (stepNum === currentStep) {
            stepNode.classList.add('active');
        }
    });

    // Update progress connection line percentage
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressLine.style.width = `${progressPercent}%`;

    // Handle button disabled states
    btnPrevStep.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
        btnNextStep.textContent = "Hoàn Tất";
        btnNextStep.classList.remove('btn-primary');
        btnNextStep.classList.add('btn-secondary');
        btnNextStep.style.borderColor = 'var(--accent-green)';
        btnNextStep.style.color = 'var(--accent-green)';
    } else {
        btnNextStep.textContent = "Tiến Hành";
        btnNextStep.classList.remove('btn-secondary');
        btnNextStep.classList.add('btn-primary');
        btnNextStep.style.borderColor = '';
        btnNextStep.style.color = '';
    }
}

// Next Step Click
btnNextStep.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        updateSimulatorView();
    } else {
        // Complete state - reset simulator to screen saver after a short alert or reset
        alert("Chúc mừng bạn đã hoàn thành xuất sắc ca sửa chữa! Quy trình sửa điện thoại chuẩn kỹ thuật giúp thiết bị sống lại hoàn hảo.");
        
        // Reset simulator
        stepsTracker.style.display = 'none';
        issuesButtons.forEach(b => b.classList.remove('active'));
        
        const displayArea = document.getElementById('screen-content');
        displayArea.className = 'screen-content default-state';
        displayArea.innerHTML = `
            <div class="sim-phone-logo"><i data-lucide="smartphone"></i></div>
            <h3>HỆ THỐNG KIỂM TRA</h3>
            <p>Vui lòng chọn một lỗi ở bảng bên phải để bắt đầu chuẩn đoán và sửa chữa.</p>
            <div class="pulse-indicator"></div>
        `;
        lucide.createIcons();
    }
});

// Previous Step Click
btnPrevStep.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateSimulatorView();
    }
});


/* ==========================================
   6. CONTACT FORM SUBMISSION
   ========================================== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const btnSubmit = document.getElementById('btn-submit');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading state on button
        const originalText = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<i data-lucide="loader" class="animate-spin" style="animation: spin 1s infinite linear;"></i> Đang gửi thông tin...`;
        lucide.createIcons();

        // Define spin animation style on the fly if needed, but we already have rotation keyframe
        // Simulate network latency (1.5 seconds)
        setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            lucide.createIcons();
        }, 1500);
    });
}

// Add rotate animation styles via code for simple deployment
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .animate-spin {
        display: inline-block;
    }
    @keyframes fillLoading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
    }
`;
document.head.appendChild(style);


/* ==========================================
   7. TABS CONTROLLER (QUOTE & LOOKUPS)
   ========================================== */
const tabButtons = document.querySelectorAll('.btn-tab');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        
        // Toggle buttons
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Toggle content panes
        tabPanes.forEach(pane => {
            if (pane.id === target) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    });
});


/* ==========================================
   8. INTERACTIVE QUOTE TOOL DATABASE & LOGIC
   ========================================== */
const defaultQuoteDb = {
    apple: {
        name: "Apple (iPhone)",
        models: {
            "iphone-15-promax": { name: "iPhone 15 Pro Max", glass: "1,800,000", screen: "6,500,000", battery: "1,200,000", charging: "1,100,000", mainboard: "3,200,000" },
            "iphone-14-pro": { name: "iPhone 14 Pro", glass: "1,400,000", screen: "5,200,000", battery: "1,000,000", charging: "900,000", mainboard: "2,500,000" },
            "iphone-13": { name: "iPhone 13", glass: "1,000,000", screen: "3,500,000", battery: "850,000", charging: "800,000", mainboard: "1,800,000" },
            "iphone-12": { name: "iPhone 12", glass: "800,000", screen: "2,800,000", battery: "750,000", charging: "700,000", mainboard: "1,500,000" }
        }
    },
    samsung: {
        name: "Samsung",
        models: {
            "samsung-s23-ultra": { name: "Galaxy S23 Ultra", glass: "2,200,000", screen: "5,800,000", battery: "950,000", charging: "850,000", mainboard: "2,800,000" },
            "samsung-s22": { name: "Galaxy S22", glass: "1,200,000", screen: "3,800,000", battery: "800,000", charging: "750,000", mainboard: "2,000,000" },
            "samsung-a54": { name: "Galaxy A54", glass: "800,000", screen: "2,200,000", battery: "600,000", charging: "500,000", mainboard: "1,200,000" }
        }
    },
    oppo: {
        name: "Oppo",
        models: {
            "oppo-find-x6": { name: "Find X6 Pro", glass: "1,800,000", screen: "4,500,000", battery: "800,000", charging: "700,000", mainboard: "2,200,000" },
            "oppo-reno-11": { name: "Reno 11 Pro", glass: "1,100,000", screen: "3,200,000", battery: "700,000", charging: "600,000", mainboard: "1,600,000" },
            "oppo-reno-10": { name: "Reno 10", glass: "800,000", screen: "2,400,000", battery: "650,000", charging: "500,000", mainboard: "1,200,000" }
        }
    }
};

const QUOTE_DB = JSON.parse(localStorage.getItem('vt_quote_db')) || defaultQuoteDb;
if (!localStorage.getItem('vt_quote_db')) {
    localStorage.setItem('vt_quote_db', JSON.stringify(defaultQuoteDb));
}

const SERVICE_LABELS = {
    glass: "Ép Kính Màn Hình",
    screen: "Thay Màn Hình Trọn Gói",
    battery: "Thay Pin Chính Hãng",
    charging: "Sửa/Thay Cổng Sạc",
    mainboard: "Sửa Nguồn/IC Vi Mạch"
};

const quoteBrandSel = document.getElementById('quote-brand');
const quoteModelSel = document.getElementById('quote-model');
const quoteServiceSel = document.getElementById('quote-service');
const quoteResultCard = document.getElementById('quote-result-card');
const quoteResultPrice = document.getElementById('quote-result-price');

const resDeviceName = document.getElementById('res-device-name');
const resServiceName = document.getElementById('res-service-name');
const resPriceAmount = document.getElementById('res-price-amount');
const btnBookQuote = document.getElementById('btn-book-quote');

// Populate brand options dynamically
if (quoteBrandSel) {
    quoteBrandSel.innerHTML = '<option value="">-- Chọn Hãng --</option>';
    for (const key in QUOTE_DB) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = QUOTE_DB[key].name;
        quoteBrandSel.appendChild(opt);
    }
}

// Brand change
if(quoteBrandSel) {
    quoteBrandSel.addEventListener('change', () => {
        const brand = quoteBrandSel.value;
        quoteModelSel.innerHTML = '<option value="">-- Chọn Dòng Máy --</option>';
        quoteServiceSel.innerHTML = '<option value="">-- Chọn Dịch Vụ --</option>';
        quoteModelSel.disabled = true;
        quoteServiceSel.disabled = true;
        quoteResultPrice.style.display = 'none';
        quoteResultCard.style.display = 'block';

        if (brand && QUOTE_DB[brand]) {
            const models = QUOTE_DB[brand].models;
            for (const key in models) {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = models[key].name;
                quoteModelSel.appendChild(opt);
            }
            quoteModelSel.disabled = false;
        }
    });
}

// Model change
if(quoteModelSel) {
    quoteModelSel.addEventListener('change', () => {
        const brand = quoteBrandSel.value;
        const model = quoteModelSel.value;
        quoteServiceSel.innerHTML = '<option value="">-- Chọn Dịch Vụ --</option>';
        quoteServiceSel.disabled = true;
        quoteResultPrice.style.display = 'none';
        quoteResultCard.style.display = 'block';

        if (brand && model && QUOTE_DB[brand].models[model]) {
            for (const key in SERVICE_LABELS) {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = SERVICE_LABELS[key];
                quoteServiceSel.appendChild(opt);
            }
            quoteServiceSel.disabled = false;
        }
    });
}

// Service change (calculate price)
if(quoteServiceSel) {
    quoteServiceSel.addEventListener('change', () => {
        const brand = quoteBrandSel.value;
        const model = quoteModelSel.value;
        const service = quoteServiceSel.value;

        if (brand && model && service) {
            const modelData = QUOTE_DB[brand].models[model];
            const price = modelData[service];

            resDeviceName.textContent = modelData.name;
            resServiceName.textContent = SERVICE_LABELS[service];
            resPriceAmount.textContent = `${price} VND`;

            quoteResultCard.style.display = 'none';
            quoteResultPrice.style.display = 'block';
        } else {
            quoteResultPrice.style.display = 'none';
            quoteResultCard.style.display = 'block';
        }
    });
}

// Book Quote Action
if(btnBookQuote) {
    btnBookQuote.addEventListener('click', () => {
        const device = resDeviceName.textContent;
        const service = resServiceName.textContent;
        
        const bookingField = document.getElementById('book-device-desc');
        if (bookingField) {
            bookingField.value = `${device} - ${service}`;
        }
    });
}


/* ==========================================
   9. PERSISTENT LOCAL STORAGE MOCK DATA INITIALIZER
   ========================================== */
function initMockDatabase() {
    // 1. Initial Mock Orders if not exists
    if (!localStorage.getItem('vt_orders')) {
        const mockOrders = [
            {
                id: "VT-12345",
                name: "Nguyễn Văn A",
                phone: "0987654321",
                deviceDesc: "iPhone 13 Pro - Sửa Nguồn/IC Vi Mạch",
                status: 3, // 1: Nhận máy, 2: Đo đạc lỗi, 3: Đang sửa, 4: Hoàn thành
                tech: "Trần Văn Tài",
                logs: {
                    1: "10:00 - 03/07/2026: Đã tiếp nhận thiết bị từ khách hàng.",
                    2: "10:30 - 03/07/2026: Đang thực hiện đo đạc, phát hiện chập tụ IC nguồn chính.",
                    3: "11:00 - 03/07/2026: Đang khò hàn thay thế IC nguồn C12."
                }
            },
            {
                id: "VT-88291",
                name: "Lê Văn Hùng",
                phone: "0368273019",
                deviceDesc: "Galaxy S23 Ultra - Thay Màn Hình Trọn Gói",
                status: 4,
                tech: "Nguyễn Quốc Nam",
                logs: {
                    1: "08:30 - 02/07/2026: Nhận máy màn hình xanh chớp nháy.",
                    2: "09:00 - 02/07/2026: Xác định vỡ phôi màn hình OLED.",
                    3: "10:15 - 02/07/2026: Tiến hành ép cổ cáp màn hình công nghệ mới.",
                    4: "11:30 - 02/07/2026: Đã hoàn thành ráp máy và kiểm thử đạt chuẩn OK."
                }
            },
            {
                id: "VT-33291",
                name: "Phạm Thị Lan",
                phone: "0912345678",
                deviceDesc: "Oppo Reno 10 - Thay Pin Chính Hãng",
                status: 2,
                tech: "Trần Văn Tài",
                logs: {
                    1: "13:10 - 03/07/2026: Tiếp nhận máy pin chai phồng nhẹ.",
                    2: "13:40 - 03/07/2026: Đang đo dòng xả và kiểm tra hiệu suất pin."
                }
            }
        ];
        localStorage.setItem('vt_orders', JSON.stringify(mockOrders));
    }

    // 2. Initial Mock Warranties if not exists
    if (!localStorage.getItem('vt_warranties')) {
        const mockWarranties = {
            "0368273019": [
                { device: "iPhone 12 Pro Max", service: "Thay Pin Chính Hãng", date: "15/01/2026", warrantyUntil: "15/07/2026", status: "Còn Bảo Hành" },
                { device: "iPad Pro M1", service: "Ép Kính Màn Hình", date: "10/08/2025", warrantyUntil: "10/02/2026", status: "Hết Hạn" }
            ],
            "0987654321": [
                { device: "iPhone 13 Pro", service: "Thay Màn Hình Trọn Gói", date: "02/05/2026", warrantyUntil: "02/11/2026", status: "Còn Bảo Hành" }
            ]
        };
        localStorage.setItem('vt_warranties', JSON.stringify(mockWarranties));
    }

    // 3. Initial Mock Inventory
    if (!localStorage.getItem('vt_inventory')) {
        const mockInventory = [
            { id: "inv-1", name: "Màn hình OLED iPhone 14 Pro", stock: 12, status: "Còn hàng" },
            { id: "inv-2", name: "Pin Zin iPhone 13 Pro Max", stock: 25, status: "Còn hàng" },
            { id: "inv-3", name: "Phôi kính màn hình Galaxy S23 Ultra", stock: 3, status: "Sắp hết" },
            { id: "inv-4", name: "Cáp sạc chân sạc Oppo Reno 10", stock: 0, status: "Hết hàng" },
            { id: "inv-5", name: "IC nguồn PMIC iPhone 15 Pro", stock: 45, status: "Còn hàng" }
        ];
        localStorage.setItem('vt_inventory', JSON.stringify(mockInventory));
    }

    // 4. Initial Mock Founders if not exists
    if (!localStorage.getItem('vt_founders')) {
        const mockFounders = [
            {
                id: "f-1",
                name: "Sơn Văn Tài",
                role: "Người Sáng Lập & CEO",
                image: "assets/founder_1.jpg",
                desc: "Người sáng lập và điều hành thương hiệu Văn Tài Mobile. Định hướng phát triển giải pháp công nghệ kỹ thuật số di động và trực tiếp hướng dẫn tuyển sinh học viên."
            },
            {
                id: "f-2",
                name: "Sơn Văn Tài",
                role: "Thợ Cả Kỹ Thuật Vi Mạch",
                image: "assets/founder_2.jpg",
                desc: "Hơn 10 năm kinh nghiệm thực chiến đo đạc dòng rò bo mạch, khò hàn IC chồng dưới kính hiển vi điện tử và trực tiếp xử lý các pan bệnh phần cứng cao cấp."
            }
        ];
        localStorage.setItem('vt_founders', JSON.stringify(mockFounders));
    }
}
initMockDatabase();


/* ==========================================
   10. BOOKING FORM SUBMISSION
   ========================================== */
const bookingForm = document.getElementById('repair-booking-form');
const bookingSuccess = document.getElementById('booking-success');
const btnBookSubmit = document.getElementById('btn-book-submit');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('book-name').value.trim();
        const phone = document.getElementById('book-phone').value.trim();
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const deviceDesc = document.getElementById('book-device-desc').value.trim();

        btnBookSubmit.disabled = true;
        btnBookSubmit.innerHTML = `<i data-lucide="loader" class="animate-spin" style="animation: spin 1s infinite linear;"></i> Đang ghi nhận...`;
        lucide.createIcons();

        // Simulate network
        setTimeout(() => {
            // Generate booking code
            const randomId = Math.floor(10000 + Math.random() * 90000);
            const bookingCode = `VT-${randomId}`;

            // Save to localStorage orders
            const orders = JSON.parse(localStorage.getItem('vt_orders')) || [];
            const newOrder = {
                id: bookingCode,
                name: name,
                phone: phone,
                deviceDesc: deviceDesc,
                status: 1, // Nhận máy
                tech: "Chưa phân công",
                logs: {
                    1: `Đã tiếp nhận yêu cầu đặt lịch hẹn trực tuyến lúc ${time} ngày ${date}.`
                }
            };
            orders.unshift(newOrder); // Add to top
            localStorage.setItem('vt_orders', JSON.stringify(orders));

            // Update UI success fields
            document.getElementById('res-booking-code').textContent = bookingCode;
            document.getElementById('res-booking-user').textContent = name;
            document.getElementById('res-booking-datetime').textContent = `${time} - ngày ${date}`;

            // Show success block
            bookingForm.style.display = 'none';
            bookingSuccess.style.display = 'flex';
            lucide.createIcons();

        }, 1200);
    });
}


/* ==========================================
   11. TRACKING & WARRANTY SEARCH LOGIC
   ========================================== */
const btnTrackSubmit = document.getElementById('btn-track-submit');
const trackInput = document.getElementById('track-input');
const trackResult = document.getElementById('track-result');
const trackError = document.getElementById('track-error');

if (btnTrackSubmit) {
    btnTrackSubmit.addEventListener('click', () => {
        const code = trackInput.value.trim().toUpperCase();
        trackResult.style.display = 'none';
        trackError.style.display = 'none';

        if (!code) return;

        // Search orders
        const orders = JSON.parse(localStorage.getItem('vt_orders')) || [];
        const order = orders.find(o => o.id === code);

        if (order) {
            // Populate fields
            document.getElementById('track-device').textContent = `Khách hàng: ${order.name} • Máy: ${order.deviceDesc}`;
            document.getElementById('track-tech-assigned').textContent = `Kỹ thuật viên phụ trách: ${order.tech}`;
            
            const badge = document.getElementById('track-status-badge');
            const fill = document.getElementById('track-line-fill');
            const nodes = [1, 2, 3, 4];
            
            // Status states mapping
            const statusLabels = {
                1: "Đã Tiếp Nhận",
                2: "Đo Đạc Lỗi",
                3: "Đang Sửa Chữa",
                4: "Hoàn Thành"
            };
            badge.textContent = statusLabels[order.status] || "Đang Sửa";
            
            // Set progress fill percent
            const fillWidths = { 1: 0, 2: 33, 3: 66, 4: 100 };
            fill.style.width = `${fillWidths[order.status]}%`;

            // Reset nodes
            nodes.forEach(n => {
                const el = document.getElementById(`node-${n}`);
                if (el) el.className = 'timeline-node';
            });

            // Set active nodes
            for (let i = 1; i <= order.status; i++) {
                const el = document.getElementById(`node-${i}`);
                if (el) el.classList.add('active');
            }

            // Populate mock/real times from logs if available
            const timeLabels = { 1: 'node-time-1', 2: 'node-time-2', 3: 'node-time-3', 4: 'node-time-4' };
            nodes.forEach(n => {
                const el = document.getElementById(timeLabels[n]);
                if (el) {
                    if (order.logs && order.logs[n]) {
                        // Extract time prefix from log text
                        const match = order.logs[n].match(/^(\d{2}:\d{2} - \d{2}\/\d{2})/);
                        el.textContent = match ? match[1] : "Hoàn tất";
                    } else {
                        el.textContent = "...";
                    }
                }
            });

            trackResult.style.display = 'block';
            lucide.createIcons();
        } else {
            trackError.style.display = 'flex';
        }
    });
}

// Warranty check submit
const btnWarrantySubmit = document.getElementById('btn-warranty-submit');
const warrantyInput = document.getElementById('warranty-input');
const warrantyResult = document.getElementById('warranty-result');
const warrantyError = document.getElementById('warranty-error');
const warrantyTableBody = document.querySelector('#warranty-table tbody');
const warrantyUserTitle = document.getElementById('warranty-user-title');

if (btnWarrantySubmit) {
    btnWarrantySubmit.addEventListener('click', () => {
        const phone = warrantyInput.value.trim();
        warrantyResult.style.display = 'none';
        warrantyError.style.display = 'none';

        if (!phone) return;

        const allWarranties = JSON.parse(localStorage.getItem('vt_warranties')) || {};
        const records = allWarranties[phone];

        if (records && records.length > 0) {
            warrantyUserTitle.textContent = `Lịch sử bảo hành của số điện thoại: ${phone}`;
            warrantyTableBody.innerHTML = ''; // reset

            records.forEach(item => {
                const tr = document.createElement('tr');
                const badgeClass = item.status === "Còn Bảo Hành" ? "badge-status" : "badge-status text-error";
                tr.innerHTML = `
                    <td><strong>${item.device}</strong></td>
                    <td>${item.service}</td>
                    <td>${item.date}</td>
                    <td>${item.warrantyUntil}</td>
                    <td><span class="badge ${badgeClass}" style="${item.status !== "Còn Bảo Hành" ? 'background:rgba(244,63,94,0.1); border-color:#f43f5e;' : ''}">${item.status}</span></td>
                `;
                warrantyTableBody.appendChild(tr);
            });

            warrantyResult.style.display = 'block';
        } else {
            warrantyError.style.display = 'flex';
        }
    });
}


/* ==========================================
   12. INTERACTIVE CHATBOT LOGIC
   ========================================== */
const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInputForm = document.getElementById('chat-input-form');
const chatUserInput = document.getElementById('chat-user-input');
const chatQuickReplies = document.getElementById('chat-quick-replies');

// Toggle chatbox visibility
if (chatBubble) {
    chatBubble.addEventListener('click', () => {
        const isOpen = chatWindow.style.display === 'flex';
        
        if (isOpen) {
            chatWindow.style.display = 'none';
            chatBubble.querySelector('.chat-open-icon').style.display = 'block';
            chatBubble.querySelector('.chat-close-icon').style.display = 'none';
        } else {
            chatWindow.style.display = 'flex';
            chatBubble.querySelector('.chat-open-icon').style.display = 'none';
            chatBubble.querySelector('.chat-close-icon').style.display = 'block';
            // Scroll to bottom on open
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
}

// Bot reply helper
function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('chat-msg', sender === 'bot' ? 'bot-msg' : 'user-msg');
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quick reply responses map
const botReplies = {
    price: "Dạ, để tra cứu giá linh kiện & tiền công sửa chữa chính xác nhất, anh/chị hãy dùng thử tab 'Báo Giá Tự Động' ngay trên trang web này (phần Menu chính > Báo Giá & Tra Cứu), hoặc nhắn trực tiếp dòng máy + lỗi cần sửa cho em báo giá ạ!",
    warranty: "Dạ, Văn Tài Mobile cam kết tất cả dịch vụ sửa chữa phần cứng và linh kiện thay thế đều được bảo hành từ 6 đến 12 tháng. Anh/chị hãy tra cứu bằng số điện thoại ở Tab 'Kiểm Tra Bảo Hành' phía trên để xem hạn dùng máy mình nha.",
    time: "Dạ, cửa hàng mở cửa làm việc từ 8:00 - 20:00 hàng ngày (kể cả thứ Bảy và Chủ Nhật). Địa chỉ cửa hàng tại: Ấp Nguyệt Lãng C, xã Bình Phú, tỉnh Vĩnh Long. Hotline hỗ trợ khẩn cấp: 0368 273 019. Rất hân hạnh được phục vụ anh/chị!"
};

// Handle quick reply clicks
if (chatQuickReplies) {
    chatQuickReplies.querySelectorAll('.btn-quick-reply').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.reply;
            const text = btn.textContent;
            
            // 1. User message prints
            appendMessage('user', text);
            
            // 2. Decide if Groq AI is active
            const apiKey = localStorage.getItem('vt_groq_api_key');
            if (apiKey) {
                appendBotReplyWithAi(text);
            } else {
                appendBotReply(botReplies[key]);
            }
        });
    });
}

function appendBotReply(replyText) {
    // Append typing loader
    const typing = document.createElement('div');
    typing.classList.add('chat-msg', 'bot-msg', 'typing-loader');
    typing.textContent = 'Trợ lý đang gõ...';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        // Remove loader
        typing.remove();
        // Print bot reply
        appendMessage('bot', replyText);
    }, 1200);
}

// Smart AI reply via Groq
async function appendBotReplyWithAi(userText) {
    // Append typing loader
    const typing = document.createElement('div');
    typing.classList.add('chat-msg', 'bot-msg', 'typing-loader');
    typing.textContent = 'Trợ lý đang nghĩ...';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Gather history context
    const chatHistory = [];
    const bubbles = document.querySelectorAll('#chat-messages .chat-msg');
    const contextBubbles = Array.from(bubbles).slice(-6); // last 6 messages
    
    contextBubbles.forEach(b => {
        chatHistory.push({
            role: b.classList.contains('user-msg') ? 'user' : 'assistant',
            content: b.textContent.replace('Trợ lý đang nghĩ...', '')
        });
    });

    const apiKey = localStorage.getItem('vt_groq_api_key');
    const quoteData = JSON.stringify(QUOTE_DB);

    const systemPrompt = `
        Bạn là "Trợ lý ảo thông minh" đại diện cho cửa hàng sửa chữa điện thoại "Văn Tài Mobile".
        Địa chỉ cửa hàng: Ấp Nguyệt Lãng C, xã Bình Phú, tỉnh Vĩnh Long.
        Hotline liên hệ: 0368 273 019.
        Thời gian hoạt động: 8:00 - 20:00 hàng ngày (kể cả thứ Bảy, Chủ Nhật).
        Các dịch vụ & Bảng giá trọn gói của cửa hàng (bao gồm linh kiện và tiền công): ${quoteData}
        Quy định bảo hành: Từ 6 đến 12 tháng (lỗi 1 đổi 1).

        Nhiệm vụ của bạn là tư vấn cho khách hàng đến sửa máy, trả lời lễ phép, chu đáo, xưng hô là "em" và gọi khách hàng là "anh/chị". Hãy đọc kỹ thông tin địa chỉ, số điện thoại, và bảng giá QUOTE_DB phía trên để trả lời chính xác dòng máy khách hỏi. Nếu khách hàng hỏi những lỗi hoặc dòng máy không có trong bảng giá, hãy lịch sự giải thích và khuyên khách hàng nhập SĐT đặt lịch hẹn để kỹ thuật viên kiểm tra trực tiếp hoặc gọi Hotline 0368 273 019. Hãy trả lời ngắn gọn, cô đọng để phù hợp hiển thị trong khung chat di động nhỏ.
    `;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...chatHistory
                ],
                temperature: 0.6
            })
        });

        if (!response.ok) throw new Error("API Connection failed");

        const data = await response.json();
        const replyText = data.choices[0].message.content;

        typing.remove();
        appendMessage('bot', replyText);
    } catch (err) {
        typing.remove();
        appendMessage('bot', "Dạ, kết nối với Trợ lý AI đang bận. Anh/chị vui lòng liên hệ Hotline 0368 273 019 để Văn Tài Mobile hỗ trợ trực tiếp nhanh nhất ạ!");
    }
}

// Handle user manual text message
if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatUserInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        chatUserInput.value = '';

        const apiKey = localStorage.getItem('vt_groq_api_key');
        if (apiKey) {
            // Smart AI
            appendBotReplyWithAi(text);
        } else {
            // Keyword matching fallback
            let reply = "Dạ, Văn Tài Mobile đã ghi nhận câu hỏi của anh/chị. Anh/chị vui lòng để lại Số Điện Thoại hoặc gọi trực tiếp Hotline 0368 273 019 để kỹ thuật viên Văn Tài hỗ trợ tư vấn chi tiết nhất ạ!\n*(Gợi ý: Cấu hình Groq API Key trong Trang Quản Trị để kích hoạt Trợ lý AI).*";
            const queryLower = text.toLowerCase();
            
            if (queryLower.includes('pin') || queryLower.includes('giá') || queryLower.includes('bao nhiêu')) {
                reply = "Dạ, để biết báo giá cụ thể thay pin, linh kiện màn hình dòng máy của mình, anh/chị có thể sử dụng bộ 'Báo Giá Tự Động' ở trên hoặc nhắn chính xác tên máy (ví dụ: iPhone 13) để em check giá kho nha!\n*(Gợi ý: Cấu hình Groq API Key trong Trang Quản Trị để kích hoạt Trợ lý AI).*";
            } else if (queryLower.includes('địa chỉ') || queryLower.includes('ở đâu') || queryLower.includes('giờ làm')) {
                reply = "Dạ, cửa hàng làm việc từ 8:00 - 20:00 hàng ngày. Địa chỉ ở: Ấp Nguyệt Lãng C, xã Bình Phú, tỉnh Vĩnh Long. Hotline: 0368 273 019.";
            } else if (queryLower.includes('bảo hành') || queryLower.includes('bảo trì')) {
                reply = "Dạ, linh kiện thay thế tại Văn Tài Mobile được bảo hành 6 - 12 tháng lỗi 1 đổi 1. Anh/chị có thể kiểm tra hạn bảo hành ở tab 'Kiểm Tra Bảo Hành' phía trên ạ.";
            }

            appendBotReply(reply);
        }
    });
}


