const SidebarLogo = ({ src, alt = "Logo", className = "", style = {} }) => (
  <div className="h-16 flex items-center w-full">
    <img
      src={src}
      alt={alt}
      className={`mx-auto ${className}`}
      style={style}
    />
  </div>
);

export default SidebarLogo;
