import React, { createContext, useContext } from "react";

// Tạo Context
const SEOContext = createContext();

// Tạo Provider để quản lý SEO động
export const SEOProvider = ({ children }) => {
  const setSEO = (title, description) => {
    // Cập nhật tiêu đề
    document.title = title || "BHM-Store";

    // Cập nhật meta description
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute("content", description || "");
    } else {
      const metaTag = document.createElement("meta");
      metaTag.name = "description";
      metaTag.content = description || "";
      document.head.appendChild(metaTag);
    }
  };

  return (
    <SEOContext.Provider value={{ setSEO }}>
      {children}
    </SEOContext.Provider>
  );
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // Chuyển ký tự Unicode có dấu thành không dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9 -]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, "-") // Chuyển khoảng trắng thành dấu gạch ngang
    .replace(/-+/g, "-"); // Xóa các dấu gạch ngang thừa
};

// Hook để sử dụng Context
export const useSEO = () => useContext(SEOContext);
