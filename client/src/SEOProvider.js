import React, { createContext, useContext } from "react";

// Tạo Context
const SEOContext = createContext();


export const SEOProvider = ({ children }) => {
  const setSEO = (title, description) => {

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
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9 -]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const useSEO = () => useContext(SEOContext);
