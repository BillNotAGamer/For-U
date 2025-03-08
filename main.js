document.addEventListener("DOMContentLoaded", function () {

    const inputField = document.getElementById("input");

    // Xử lý xác minh ở identify.html
    if (inputField) {
        inputField.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                validateName();
            }
        });
    }

    function validateName() {
        const allowedNames = ["Đỗ Trần Bảo Ngọc", "Calley Đỗ", "Đỗ Ngọc"];
        const inputName = document.getElementById("input").value.trim();
        const popup = document.getElementById("popup");
    
        if (allowedNames.includes(inputName)) {
            popup.innerHTML = "🎉 Đúng ghệ tui òi! Đang chuyển hướng:>> 🎂";
            popup.style.backgroundColor = "#4CAF50"; 
            showPopup();
    
            localStorage.setItem("verified", "true"); 
            setTimeout(() => {
                window.location.href = "main.html"; 
            }, 2500);
        } else {
            popup.innerHTML = "⚠️ Hong phải ghệ tui, nhập lại đi! :((";
            popup.style.backgroundColor = "#FF5733"; 
            showPopup();
        }
    }
    
    function showPopup() {
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        popup.classList.remove("fade-out"); // Nếu có fade-out trước đó thì xóa đi
        popup.classList.add("fade-in"); // Thêm hiệu ứng hiện lên
    
        setTimeout(() => {
            popup.classList.remove("fade-in"); // Xóa hiệu ứng fade-in
            popup.classList.add("fade-out"); // Thêm hiệu ứng fade-out
            setTimeout(() => {
                popup.style.display = "none"; // Ẩn hoàn toàn popup
            }, 1000); // Thời gian trùng với animation fade-out
        }, 2000); // Hiển thị popup trong 2 giây trước khi biến mất
    }

    // Kiểm tra xem người dùng đã xác minh chưa
    if (window.location.pathname.includes("index.html")) {
        let isVerified = localStorage.getItem("verified");
        if (!isVerified) {
            window.location.href = "identify.html";
            return;
        }
    }  

    const images = [
        ["assets/img1.jpg", "assets/img2.jpg", "assets/img3.jpg"],
        ["assets/img4.jpg", "assets/img5.jpg", "assets/img6.jpg"],
        ["assets/img7.jpg", "assets/img8.jpg", "assets/img9.jpg"]
    ];
    const quotes = document.querySelectorAll(".quote"); // Lấy danh sách tất cả quote
    let currentIndex = 0;

    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
    const cardElement = document.getElementById("card");

    function showNext() {
        if (currentIndex < images.length) {
            // Đổi hình ảnh
            image1.src = images[currentIndex][0];
            image2.src = images[currentIndex][1];
            image3.src = images[currentIndex][2];
    
            image1.style.opacity = 1;
            image1.style.transform = "rotate(-5deg) scale(1)";
    
            image2.style.opacity = 1;
            image2.style.transform = "rotate(5deg) scale(1)";
    
            image3.style.opacity = 1;
            image3.style.transform = "rotate(-10deg) scale(1)";
    
            // Ẩn tất cả quote trước khi hiển thị cái mới
            quotes.forEach(quote => quote.classList.remove("active"));
    
            // Hiển thị quote tương ứng
            if (currentIndex < quotes.length) {
                quotes[currentIndex].classList.add("active");
            }
    
            // Ẩn ảnh và quote sau 3 giây
            setTimeout(() => {
                image1.style.opacity = 0;
                image1.style.transform = "scale(0.9)";
    
                image2.style.opacity = 0;
                image2.style.transform = "scale(0.9)";
    
                image3.style.opacity = 0;
                image3.style.transform = "scale(0.9)";
    
                if (currentIndex < quotes.length) {
                    quotes[currentIndex].classList.remove("active");
                }
    
                currentIndex++; // Chuyển sang bộ ảnh tiếp theo
                setTimeout(showNext, 3000);
            }, 5000);
        } else {
            // Hiện thiệp chúc mừng
            cardElement.style.display = "block";
        }
    }
    
    // Bắt đầu hiệu ứng
    showNext();

    var card = document.getElementById("card");

    // Hiện card sau 2 giây (có thể điều chỉnh thời gian)
    setTimeout(function () {
        card.classList.add("show");
    }, 24000);

    // Điều khiển nhạc nền (nếu có phần tử)
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener("click", function () {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.innerText = "🔇 Tắt nhạc";
            } else {
                bgMusic.pause();
                musicBtn.innerText = "🎵 Bật nhạc";
            }
        });
    }

    var audio = document.getElementById("bg-music");
    var musicBtn = document.getElementById("music-btn");
    var isPlaying = false;

    // Thử phát tự động khi tải trang
    audio.play().then(function () {
        isPlaying = true;
        musicBtn.textContent = "🎵 Tắt nhạc";
    }).catch(function (error) {
        console.log("Tự động phát bị chặn: ", error);
        musicBtn.textContent = "🎵 Bật nhạc";
    });

    // Xử lý nút bật/tắt
    musicBtn.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
            musicBtn.textContent = "🎵 Bật nhạc";
            isPlaying = false;
        } else {
            audio.play();
            musicBtn.textContent = "🎵 Tắt nhạc";
            isPlaying = true;
        }
    });
});


