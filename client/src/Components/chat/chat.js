import { useEffect } from "react";

const TawkWidget = () => {
  // Hàm cập nhật thông tin người dùng vào Tawk.to
  const updateUserInfo = (newUserData) => {
    var Tawk_API = window.Tawk_API || {};
    
    // Kiểm tra xem Tawk_API có sẵn chưa và hàm setAttributes có tồn tại không
    if (Tawk_API && typeof Tawk_API.setAttributes === "function") {
      Tawk_API.setAttributes(
        {
          name: newUserData.name,  // Tên người dùng
          email: newUserData.email, // Email người dùng
          user_id: newUserData.userId // ID người dùng (sử dụng để phân biệt giữa các người dùng)
        },
        function (error) {
          if (error) {
            console.error("Error updating attributes:", error);
          } else {
            console.log("User info updated successfully in Tawk.to");
          }
        }
      );
    } else {
      console.log("Tawk_API is not ready yet");
    }
  };

  const clearUserInfo = () => {
    var Tawk_API = window.Tawk_API || {};
    
    // Kiểm tra xem Tawk_API có sẵn chưa và hàm removeAttributes có tồn tại không
    if (Tawk_API && typeof Tawk_API.removeAttributes === "function") {
      Tawk_API.removeAttributes();  // Xóa thông tin người dùng khi đăng xuất
    } else {
      console.log("Tawk_API is not ready yet to clear user info");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage
    if (user) {
      var Tawk_API = window.Tawk_API || {};
      var Tawk_LoadStart = new Date();

      (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/6772c19f49e2fd8dfe007f77/1igc48m07'; // ID Tawk.to của bạn
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();

      // Khi Tawk.to đã tải xong, gọi updateUserInfo
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = function () {
        const parsedUser = JSON.parse(user); // Parse dữ liệu người dùng từ localStorage
        updateUserInfo(parsedUser);  // Gọi hàm updateUserInfo sau khi Tawk_API đã tải xong

        // Đổi vị trí widget sau khi tải
        var widget = document.querySelector("#tawk_1igc48m07"); // ID widget của bạn
        if (widget) {
          widget.style.position = "fixed";
          widget.style.bottom = "20px"; // Điều chỉnh khoảng cách dưới
          widget.style.right = "20px";  // Điều chỉnh khoảng cách bên phải
          widget.style.zIndex = "9999"; // Đảm bảo widget luôn ở trên cùng
        }
      };
    }
  }, []); // Chạy khi component được mount

  // Nếu thông tin người dùng thay đổi (ví dụ: cập nhật trong trang tài khoản), gọi updateUserInfo
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      updateUserInfo(user); // Cập nhật thông tin người dùng khi đăng nhập
    }
  }, [localStorage.getItem("user")]); // Kiểm tra khi thông tin người dùng thay đổi

  // Hàm gọi khi người dùng đăng xuất
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearUserInfo(); // Nếu không có token (người dùng đã đăng xuất), xóa thông tin người dùng khỏi Tawk.to
    }
  }, []); // Thực hiện mỗi khi component mount hoặc token thay đổi

  return null;
};

export default TawkWidget;
